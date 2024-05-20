import { DocumentIcon } from "@heroicons/react/24/outline";
import { useDrag } from "react-dnd";
import { DragTypes } from "./FolderItem";
import { FileItem as FileItemInterface, FolderItem } from "../interfaces";

interface Props {
  file: FileItemInterface;
  handleDailog: (data: {
    type: string;
    file: FileItemInterface | FolderItem;
  }) => void;
}

const FileItem = (props: Props) => {
  const { file, handleDailog } = props;
  const handleView = () => handleDailog({ type: "file-view", file });
  const handleRename = () => handleDailog({ type: "file-rename", file });
  const handleDelete = () => handleDailog({ type: "file-delete", file });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.FILE,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: {
      type: "file",
      file,
    },
  }));

  return (
    <div
      ref={drag}
      className={`flex items-center justify-between pr-2 mt-2 border rounded cursor-pointer select-none hover:bg-gray-50 ${isDragging ? "opacity-30 cursor-grab bg-blue-100 border-2 border-blue-600" : ""}`}
    >
      <div
        className="flex items-center w-full h-full gap-2 p-2"
        onClick={handleView}
      >
        <DocumentIcon className="w-5 h-5" />
        <span> {file.name}</span>
      </div>
      <div className="flex">
        <button
          onClick={handleRename}
          className="px-2 py-1 mr-2 text-white bg-gray-500 rounded"
        >
          Rename
        </button>
        <button
          onClick={handleDelete}
          className="px-2 py-1 text-white bg-gray-500 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FileItem;
