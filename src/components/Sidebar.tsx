import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HomeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import New from "./New";
import { FileItem, FolderStackItem } from "../interfaces";

const navigation = [{ name: "Dashboard", icon: HomeIcon, current: true }];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  handleDialog: (data: { type: string; file: FileItem }) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFolderChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFolderStack: (value: FolderStackItem[]) => void;
}

const Sidebar = (props: Props) => {
  const {
    sidebarOpen,
    setSidebarOpen,
    handleDialog,
    handleFileChange,
    handleFolderChange,
    setFolderStack,
  } = props;

  const goToDashboard = () => {
    setFolderStack([
      {
        id: 0,
        name: "Root Folder",
      },
    ]);
  };

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex flex-1 w-full max-w-xs mr-16">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 flex justify-center w-16 pt-5 left-full">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="w-6 h-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-col px-6 pb-4 overflow-y-auto bg-white grow gap-y-5">
                  <div className="flex items-center h-16 text-xl font-semibold text-gray-600 shrink-0">
                    Data Room
                  </div>
                  <nav className="flex flex-col flex-1">
                    <ul role="list" className="flex flex-col flex-1 gap-y-7">
                      <li className="mb-8">
                        <New
                          handleDialog={handleDialog}
                          handleFileChange={handleFileChange}
                          handleFolderChange={handleFolderChange}
                        />
                      </li>
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <button
                                onClick={goToDashboard}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-50 text-gray-600"
                                    : "text-gray-700 hover:text-gray-600 hover:bg-gray-50",
                                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full",
                                )}
                              >
                                <item.icon
                                  className={classNames(
                                    item.current
                                      ? "text-gray-600"
                                      : "text-gray-400 group-hover:text-gray-600",
                                    "h-6 w-6 shrink-0",
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col px-6 pb-4 overflow-y-auto bg-white border-r border-gray-200 grow gap-y-5">
          <div className="flex items-center h-16 text-2xl font-semibold text-gray-600 shrink-0">
            Data Room
          </div>
          <nav className="flex flex-col flex-1">
            <ul role="list" className="-mx-2 space-y-1">
              <li className="mb-8">
                <New
                  handleDialog={handleDialog}
                  handleFileChange={handleFileChange}
                  handleFolderChange={handleFolderChange}
                />
              </li>
              {navigation.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={goToDashboard}
                    className={classNames(
                      item.current
                        ? "bg-gray-100 text-gray-600"
                        : "text-gray-700 hover:text-gray-600 hover:bg-gray-50",
                      "group flex gap-x-3 rounded-2xl py-2 px-6 text-sm leading-6 font-semibold w-full",
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-600"
                          : "text-gray-400 group-hover:text-gray-600",
                        "h-6 w-6 shrink-0",
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
