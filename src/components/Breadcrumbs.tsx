import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import { useDrop } from "react-dnd";
import { Fragment } from "react/jsx-runtime";
import { DragTypes } from "./FolderItem";
import { FileItem, FolderItem, FolderStackItem } from "../interfaces";

interface BreadcrumbsProps {
  folderStack: FolderStackItem[];
  setFolderStack: (item: FolderStackItem[]) => void;
  handleDrop: (type: string, data: FileItem) => Promise<void>;
}

function Breadcrumbs(props: BreadcrumbsProps) {
  const { folderStack, setFolderStack, handleDrop } = props;
  const handleFolderChange = (folderId: number) => {
    const newFolderStack = [];

    for (const folder of folderStack) {
      newFolderStack.push(folder);
      if (folder.id === folderId) break;
    }

    setFolderStack(newFolderStack);
  };

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2">
        {folderStack.map((folder, index) => (
          <Fragment key={index}>
            <BreadcrumbItem
              folder={folder}
              index={index}
              handleFolderChange={handleFolderChange}
              folderStack={folderStack}
              handleDrop={handleDrop}
            />
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}

interface BreadcrumbItemProps {
  folder: FolderStackItem;
  index: number;
  folderStack: FolderStackItem[];
  handleDrop: (type: string, data: FileItem) => Promise<void>;
  handleFolderChange: (id: number) => void;
}

function BreadcrumbItem(props: BreadcrumbItemProps) {
  const { folder, index, handleFolderChange, folderStack, handleDrop } = props;

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: DragTypes.FILE,
      drop: (args: { type: string; file: FolderItem }) =>
        handleDrop(args.type, {
          ...args.file,
          folderId: folder.id,
        }),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [],
  );

  return (
    <>
      {index === 0 && (
        <li ref={drop}>
          <div className="flex items-center">
            <button
              onClick={() => handleFolderChange(folderStack[0].id)}
              className={`text-gray-400 hover:text-gray-500 border-2 p-2 ${isOver ? "bg-blue-100 border-2 border-blue-600 rounded" : "border-white"}`}
            >
              <HomeIcon className="flex-shrink-0 w-5 h-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </button>
          </div>
        </li>
      )}
      {index > 0 && (
        <li ref={drop}>
          <div className="flex items-center">
            <ChevronRightIcon
              className="flex-shrink-0 w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={() => handleFolderChange(folder.id)}
              className={`ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 p-2 ${isOver ? "bg-blue-100 border-2 border-blue-600 rounded" : "border-white"}`}
            >
              {folder.name}
            </button>
          </div>
        </li>
      )}
    </>
  );
}

export default Breadcrumbs;
