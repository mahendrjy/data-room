import { FileItem as FileItemInterface, FolderItem } from "../interfaces";
import FileItem from "./FileItem";

interface Props {
  files: FileItemInterface[];
  handleDailog: (data: {
    type: string;
    file: FileItemInterface | FolderItem;
  }) => void;
}

function Files(props: Props) {
  const { files, handleDailog } = props;
  return (
    <>
      {files.map((file) => (
        <FileItem key={file.id} file={file} handleDailog={handleDailog} />
      ))}
    </>
  );
}

export default Files;
