import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { FileItem, FolderItem } from "../interfaces";

interface Props {
  folders: FolderItem[];
  files: FileItem[];
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload = (props: Props) => {
  const { folders, files, handleFileChange } = props;
  if (files.length !== 0 || folders.length !== 0) return;

  return (
    <label
      htmlFor="upload-files"
      className="relative flex items-center justify-center w-full h-full gap-2 py-64 cursor-pointer"
    >
      <input
        id="upload-files"
        type="file"
        className="absolute inset-0 opacity-0 cursor-pointer"
        multiple
        onChange={handleFileChange}
      />
      <div className="flex flex-col items-center gap-3 text-center pointer-events-none">
        <DocumentArrowDownIcon className="w-40 h-40 text-gray-500" />
        <div>
          <div className="text-xl text-gray-700">Choose files here</div>
          <div className="text-gray-500">or use the "New" button.</div>
        </div>
      </div>
    </label>
  );
};

export default FileUpload;
