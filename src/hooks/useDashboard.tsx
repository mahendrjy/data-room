import { useEffect, useState } from "react";
import useApi from "./useApi";
import { FileItem, FolderItem } from "../interfaces";

const useDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    loading,
    fetchFolders,
    addFolders,
    fetchFiles,
    addFiles,
    updateFolder,
    updateFile,
    deleteFolder,
    deleteFile,
    fetching,
    toggleFetching,
  } = useApi();
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);

  const [folderStack, setFolderStack] = useState([
    { name: "Root Folder", id: 0 },
  ]);

  const [currentFolderId, setCurrentFolderId] = useState<null | number>(null);

  useEffect(() => {
    setCurrentFolderId(folderStack[folderStack.length - 1].id);
  }, [folderStack]);

  useEffect(() => {
    if (currentFolderId === null) return;

    const getFolders = async () => {
      const data = await fetchFolders(currentFolderId);
      setFolders(data as FolderItem[]);
    };

    const getFiles = async () => {
      const data = await fetchFiles(currentFolderId);
      setFiles(data as FileItem[]);
    };

    getFolders();
    getFiles();
    toggleFetching(false);
  }, [currentFolderId, fetching]);

  return {
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
    deleteFolder,
    deleteFile,
    currentFolderId,
  };
};

export default useDashboard;
