import { Bars3Icon } from "@heroicons/react/24/outline";
import Breadcrumbs from "./Breadcrumbs";
import { FileItem, FolderStackItem } from "../interfaces";

interface Props {
  setSidebarOpen: (open: boolean) => void;
  folderStack: FolderStackItem[];
  setFolderStack: (folderStack: FolderStackItem[]) => void;
  handleDrop: (type: string, data: FileItem) => Promise<void>;
}

const Header = (props: Props) => {
  const { setSidebarOpen, folderStack, setFolderStack, handleDrop } = props;
  return (
    <div className="sticky top-0 z-40 flex items-center h-16 px-4 bg-white border-b border-gray-200 shadow-sm shrink-0 gap-x-4 sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="w-6 h-6" aria-hidden="true" />
      </button>

      <Breadcrumbs
        folderStack={folderStack}
        setFolderStack={setFolderStack}
        handleDrop={handleDrop}
      />
    </div>
  );
};

export default Header;
