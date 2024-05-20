import { useEffect, useState } from "react";
import content from "../mock-files/dummy.pdf";
import { FileItem, FolderItem } from "../interfaces";

const foldersData = [
  {
    id: 1,
    name: "A Folder",
    folderId: 0,
  },
  {
    id: 2,
    name: "B Folder",
    folderId: 0,
  },
  {
    id: 3,
    name: "D Folder",
    folderId: 1,
  },
  {
    id: 4,
    name: "E Folder",
    folderId: 1,
  },
  {
    id: 5,
    name: "F Folder",
    folderId: 2,
  },
  {
    id: 6,
    name: "G Folder",
    folderId: 2,
  },
];

const filesData = [
  {
    id: 7,
    name: "A File",
    content,
    folderId: 0,
  },
  {
    id: 8,
    name: "B File",
    content,
    folderId: 0,
  },
  {
    id: 9,
    name: "C File",
    content,
    folderId: 1,
  },
  {
    id: 10,
    name: "H File",
    content,
    folderId: 1,
  },
  {
    id: 11,
    name: "I File",
    content,
    folderId: 2,
  },
  {
    id: 12,
    name: "J File",
    content,
    folderId: 2,
  },
];

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [folders, setFolders] = useState(foldersData);
  const [files, setFiles] = useState(filesData);
  const [fetching, toggleFetching] = useState(true);

  useEffect(() => {
    toggleFetching(true);
  }, [folders, files]);

  const fetchFolders = (id: number | string) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve(folders.filter((folder) => folder.folderId === id));
      }, 200);
    });
  };

  const fetchFiles = (id: number | string) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve(files.filter((file) => file.folderId === id));
      }, 200);
    });
  };

  const addFolders = (data: FolderItem[]) => {
    setFolders((prev) => [...prev, ...data]);
    return true;
  };

  const addFiles = (data: FileItem[]) => {
    setFiles((prev) => [...prev, ...data]);
    return true;
  };

  const updateFolder = (data: FolderItem) => {
    setFolders((prev) =>
      prev.map((folder) => (folder.id === data.id ? data : folder)),
    );
    return true;
  };

  const updateFile = (data: FileItem) => {
    setFiles((prev) => prev.map((file) => (file.id === data.id ? data : file)));
    return true;
  };

  const deleteFolder = (id: number) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
    return true;
  };

  const deleteFile = (id: number) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
    return true;
  };

  return {
    loading,
    folders,
    fetchFolders,
    addFolders,
    files,
    fetchFiles,
    addFiles,
    updateFolder,
    updateFile,
    deleteFolder,
    deleteFile,
    fetching,
    toggleFetching,
  };
};

export default useApi;
