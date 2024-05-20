/* eslint-disable no-case-declarations */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { FileItem, FolderItem } from "../interfaces";
import Dailog from "./Dailog";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  dailogType: string;
  dailogTitle: string;
  buttonText: string;
  currentFile: FileItem | object;
  currentFolderId: number | null;
  value: string;
  setValue: (value: string) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addFolders: (data: FolderItem[]) => boolean;
  updateFolder: (data: FolderItem) => boolean;
  deleteFolder: (id: number) => void;
  updateFile: (file: FileItem) => void;
  deleteFile: (id: number) => void;
}

const DashboardDailogs = (props: Props) => {
  const {
    open,
    setOpen,
    dailogType,
    dailogTitle,
    buttonText,
    currentFile,
    currentFolderId,
    value,
    setValue,
    onChange,
    addFolders,
    updateFolder,
    deleteFolder,
    updateFile,
    deleteFile,
  } = props;

  const handleDailogOnClick = async () => {
    switch (dailogType) {
      case "file-rename":
        updateFile({ ...currentFile, name: value });
        setValue("");
        break;

      case "file-delete":
        deleteFile(currentFile.id);
        break;

      case "folder-rename":
        await updateFolder({ ...currentFile, name: value });
        setValue("");
        break;

      case "folder-delete":
        await deleteFolder(currentFile.id);
        break;

      case "new-folder":
        const folderName = value;
        const folder = {
          id: Date.now(),
          name: folderName,
          folderId: currentFolderId,
        };
        const folders = [folder];
        addFolders(folders);
        setValue("");
        break;
      default:
        break;
    }

    setValue("");
    setOpen(false);
  };

  const onCancel = () => setOpen(false);

  return (
    <Dailog
      open={open}
      setOpen={setOpen}
      title={dailogTitle}
      buttonText={buttonText}
      onClick={handleDailogOnClick}
      onCancel={onCancel}
      fullWidth={dailogType === "file-view"}
    >
      {(dailogType === "file-rename" || dailogType === "folder-rename") && (
        <input
          type="text"
          name={dailogTitle}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
          placeholder={dailogTitle}
          value={value}
          onChange={onChange}
        />
      )}

      {(dailogType === "file-delete" || dailogType === "folder-delete") && (
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this file?
        </p>
      )}

      {dailogType === "file-view" && (
        <div className="w-full h-full pb-6">
          <iframe
            src={currentFile.content}
            className="w-full h-full rounded-lg"
            title="File Preview"
          ></iframe>
        </div>
      )}

      {dailogType === "new-folder" && (
        <input
          type="text"
          name={dailogTitle}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
          placeholder={dailogTitle}
          value={value}
          onChange={onChange}
        />
      )}
    </Dailog>
  );
};

export default DashboardDailogs;
