export interface FolderItem {
  id: number;
  name: string;
  folderId: number;
}

export interface FileItem {
  id: number;
  name: string;
  folderId: number;
  content?: string;
}

export interface FolderStackItem {
  id: number;
  name: string;
}
