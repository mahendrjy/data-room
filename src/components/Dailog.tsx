import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  children: React.ReactNode;
  buttonText: string;
  onClick: () => void;
  onCancel: () => void;
  fullWidth?: boolean;
}

function Dailog(props: Props) {
  const {
    open,
    setOpen,
    title,
    children,
    buttonText,
    onClick,
    onCancel,
    fullWidth = false,
  } = props;

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto lg:pl-72">
          <div
            className={`flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0 ${fullWidth ? "sm:h-full" : ""}`}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:w-full sm:my-8 sm:p-6 ${fullWidth ? "sm:mx-10 h-5/6 sm:mt-24" : "sm:max-w-lg"}`}
              >
                <div className="h-full mt-3 text-center sm:mt-0 sm:text-left">
                  <div className="flex items-center justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                    <button onClick={onCancel} className="text-gray-700">
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="h-full mt-2">{children}</div>
                </div>
                {!fullWidth && (
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-gray-600 rounded-md shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
                      onClick={onClick}
                    >
                      {buttonText}
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={onCancel}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Dailog;
