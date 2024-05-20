/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Sidebar from "./Sidebar";
import Header from "./Header";
import DashboardDailogs from "./DashboardDailogs";
import DashboardContent from "./DashboardContent";
import useDashboard from "../hooks/useDashboard";
import useDashboardDailogs from "../hooks/useDashboardDailogs";
import useUpload from "../hooks/useUpload";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FileItem, FolderItem } from "../interfaces";

function Dashboard() {
  const {
    loading,
    folders,
    files,
    folderStack,
    addFolders,
    addFiles,
    setFolderStack,
    sidebarOpen,
    setSidebarOpen,
    updateFile,
    updateFolder,
    currentFolderId,
    deleteFolder,
    deleteFile,
  } = useDashboard();

  const {
    open,
    setOpen,
    dailogType,
    dailogTitle,
    buttonText,
    currentFile,
    value,
    setValue,
    onChange,
    handleDailog,
  } = useDashboardDailogs();

  const { handleFileChange, handleFolderChange } = useUpload({
    folderStack,
    addFolders,
    addFiles,
  });

  const handleDrop = async (type: string, data: FileItem | FolderItem) => {
    switch (type) {
      case "folder":
        await updateFolder(data);
        break;

      case "file":
        await updateFile(data);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setFolderStack={setFolderStack}
        handleDialog={handleDailog}
        handleFileChange={handleFileChange}
        handleFolderChange={handleFolderChange}
      />
      <main className="lg:pl-72">
        <DndProvider backend={HTML5Backend}>
          <Header
            folderStack={folderStack}
            setFolderStack={setFolderStack}
            setSidebarOpen={setSidebarOpen}
            handleDrop={handleDrop}
          />
          <DashboardContent
            loading={loading}
            folders={folders}
            files={files}
            handleFileChange={handleFileChange}
            setFolderStack={setFolderStack}
            handleDailog={handleDailog}
            handleDrop={handleDrop}
          />
        </DndProvider>
        <DashboardDailogs
          open={open}
          setOpen={setOpen}
          dailogType={dailogType}
          dailogTitle={dailogTitle}
          buttonText={buttonText}
          currentFile={currentFile}
          currentFolderId={currentFolderId}
          value={value}
          setValue={setValue}
          onChange={onChange}
          addFolders={addFolders}
          updateFolder={updateFolder}
          deleteFolder={deleteFolder}
          updateFile={updateFile}
          deleteFile={deleteFile}
        />
      </main>
    </>
  );
}

export default Dashboard;
