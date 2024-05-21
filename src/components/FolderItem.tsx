import { FolderIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FolderItem as FolderItemInterface } from "../interfaces";

export const DragTypes = {
  FILE: "file",
};

interface Props {
  folder: FolderItemInterface;
  handleDrop: (type: string, folder: FolderItemInterface) => void;
  openFolder: (folder: FolderItemInterface) => void;
  handleDailog: (data: { type: string; file: FolderItemInterface }) => void;
}

const FolderItem = (props: Props) => {
  const { handleDrop, folder, openFolder, handleDailog } = props;
  const handleRename = () =>
    handleDailog({ type: "folder-rename", file: folder });
  const handleDelete = () =>
    handleDailog({ type: "folder-delete", file: folder });

  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.FILE,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: {
      type: "folder",
      file: folder,
    },
  }));

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: DragTypes.FILE,
      drop: (args: { type: string; file: FolderItemInterface }) => {
        if (args.file.id === folder.id) return;
        return handleDrop(args.type, {
          ...args.file,
          folderId: folder.id,
        });
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [],
  );

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`flex items-center justify-between pr-2 mt-2 border rounded cursor-pointer select-none hover:bg-gray-50 ${isOver ? "bg-blue-100 border-2 border-blue-600" : ""} ${isDragging ? "opacity-20 cursor-grab" : ""}`}
    >
      <div
        className="flex items-center w-full h-full gap-2 p-2"
        onClick={() => openFolder(folder)}
      >
        <FolderIcon className="w-5 h-5" />
        <span>{folder.name}</span>
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

export default FolderItem;
