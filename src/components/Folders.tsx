import { FolderItem as FolderItemInterface } from "../interfaces";
import FolderItem from "./FolderItem";

interface Props {
  folders: FolderItemInterface[];
  handleDrop: (dropType: string, dropResult: FolderItemInterface) => void;
  openFolder: (folder: FolderItemInterface) => void;
  handleDailog: (data: { type: string; file: FolderItemInterface }) => void;
}

function Folders(props: Props) {
  const { handleDrop, folders, openFolder, handleDailog } = props;
  return (
    <>
      {folders.map((folder) => (
        <FolderItem
          key={folder.id}
          handleDrop={handleDrop}
          folder={folder}
          openFolder={openFolder}
          handleDailog={handleDailog}
        />
      ))}
    </>
  );
}

export default Folders;
