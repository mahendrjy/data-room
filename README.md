# React + TypeScript + Vite

```js
rootFolder = {
  id: f1,
  name: '',
  folderId: root
}

newFolder = {
  id: Date.now(),
  name: 'Folder name',
  folderId: current folder location
}

folders = [
  {
    id: Date.now(),
    name: 'Folder name',
    folderId: 1
  },
  {
    id: Date.now(),
    name: 'Folder name',
    folderId: 2
  },
]
```

```js
newFile = {
  id: Date.now(),
  name: "File name",
  content: "pdf | img",
  folderId: "rootFolder",
};

files = [
  {
    id: Date.now(),
    name: "File name",
    content: "pdf | img",
    folderId: "rootFolder",
  },
  {
    id: Date.now(),
    name: "File name",
    content: "pdf | img",
    folderId: "rootFolder",
  },
];
```

```js
Component Mount

1. Fetch Root Folder - update folders
2. Fetch all the files which have folderId - update files
3. Render rootFolders + rootFiles
```

```js
Click on a folder

1. Fetch all the folders which have folderId - update folders
2. Fetch all the files which have filesId - update files
```

```js
Drag and Drop

react-dnd

1. Move folder/file to another folder
2. Update the folderId of the folder/file
```
