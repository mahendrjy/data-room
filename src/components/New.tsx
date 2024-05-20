import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  DocumentArrowDownIcon,
  FolderArrowDownIcon,
  FolderPlusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { FileItem } from "../interfaces";

interface Props {
  handleDialog: (data: { type: string; file: FileItem }) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFolderChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function New(props: Props) {
  const { handleDialog, handleFileChange, handleFolderChange } = props;

  return (
    <Popover className="relative">
      <Popover.Button
        type="button"
        className="flex items-center gap-2 px-8 py-6 text-white bg-gray-600 shadow-sm outline-none cursor-pointer rounded-2xl hover:bg-gray-500"
      >
        <label htmlFor="dropzone-file" className="flex items-center gap-2">
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            multiple
            onChange={handleFileChange}
          />
          <PlusIcon className="w-5 h-5" aria-hidden="true" />
          New
        </label>
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 flex w-screen px-4 mt-5 -translate-x-1/2 left-1/2 max-w-min">
          <div className="w-56 p-4 -ml-8 text-sm font-semibold leading-6 text-gray-900 bg-white shadow-lg shrink rounded-xl ring-1 ring-gray-900/5">
            <button
              onClick={() => handleDialog({ type: "new-folder" })}
              className="flex items-center gap-2 p-2 hover:text-gray-600"
            >
              <FolderPlusIcon className="w-5 h-5" aria-hidden="true" />
              New Folder
            </button>
            <label
              htmlFor="file-upload"
              className="flex items-center gap-2 p-2 cursor-pointer hover:text-gray-600"
            >
              <input
                id="file-upload"
                type="file"
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
              <DocumentArrowDownIcon className="w-5 h-5" aria-hidden="true" />
              File Upload
            </label>
            <label
              htmlFor="folder-upload"
              className="flex items-center gap-2 p-2 cursor-pointer hover:text-gray-600"
            >
              <input
                id="folder-upload"
                type="file"
                webkitdirectory="true"
                mozdirectory="true"
                directory="true"
                className="hidden"
                onChange={handleFolderChange}
              />
              <FolderArrowDownIcon className="w-5 h-5" aria-hidden="true" />
              Folder Upload
            </label>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default New;
