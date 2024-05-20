import { FileItem, FolderItem, FolderStackItem } from "../interfaces";

const useUpload = ({
  folderStack,
  addFolders,
  addFiles,
}: {
  folderStack: FolderStackItem[];
  addFolders: (folders: FolderItem[]) => void;
  addFiles: (files: FileItem[]) => void;
}) => {
  const handleFolderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesArray = Array.from(event.target.files as FileList);

    if (filesArray.length > 0) {
      const firstFilePath =
        filesArray[0].webkitRelativePath || filesArray[0].name;
      const folderPath = firstFilePath.substring(
        0,
        firstFilePath.lastIndexOf("/"),
      );
      const folderName = folderPath.split("/")[0];

      const folder: FolderItem = {
        id: Date.now(),
        name: folderName,
        folderId: folderStack[folderStack.length - 1].id,
      };

      const folders: FolderItem[] = [folder];

      const files: FileItem[] = filesArray.map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        content: URL.createObjectURL(file),
        folderId: folder.id,
      }));

      addFolders(folders);
      addFiles(files);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileItem[] = Array.from(event.target.files as FileList).map(
      (file, index) => ({
        id: Date.now() + index,
        name: file.name,
        content: URL.createObjectURL(file),
        folderId: folderStack[folderStack.length - 1].id,
      }),
    );
    addFiles(files);
  };

  return { handleFolderChange, handleFileChange };
};

export default useUpload;
