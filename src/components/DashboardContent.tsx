import FileUpload from "./FileUpload";
import Folders from "./Folders";
import Files from "./Files";
import { FileItem, FolderItem } from "../interfaces";

interface Props {
  loading: boolean;
  folders: FolderItem[];
  files: FileItem[];
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDailog: (data: { type: string; file: FileItem | FolderItem }) => void;
  setFolderStack: (item: any) => void;
  handleDrop: (type: string, folder: FolderItem) => Promise<void>;
}

const DashboardContent = (props: Props) => {
  const {
    loading,
    folders,
    files,
    handleFileChange,
    handleDailog,
    setFolderStack,
    handleDrop,
  } = props;

  const openFolder = (folder: FolderItem) => {
    const openedFolder = {
      id: folder.id,
      name: folder.name,
    };
    setFolderStack((prev) => [...prev, openedFolder]);
  };

  return (
    <div className="px-4 pt-1 mt-6 sm:px-6 lg:px-8">
      {loading && <div>Loading...</div>}
      {!loading && (
        <div>
          <FileUpload
            folders={folders}
            files={files}
            handleFileChange={handleFileChange}
          />
          <Folders
            handleDrop={handleDrop}
            folders={folders}
            openFolder={openFolder}
            handleDailog={handleDailog}
          />
          <Files files={files} handleDailog={handleDailog} />
        </div>
      )}
    </div>
  );
};

export default DashboardContent;
