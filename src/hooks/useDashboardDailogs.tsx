import { useState } from "react";
import useInput from "./useInput";
import { FileItem } from "../interfaces";

const useDashboardDailogs = () => {
  const { value, onChange, setValue } = useInput("");
  const [open, setOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState({});
  const [dailogType, setDailogType] = useState("");
  const [dailogTitle, setDailogTitle] = useState("");
  const [buttonText, setButtonText] = useState("Close");

  const updateCurrentFileAndValue = (file: FileItem) => {
    setCurrentFile(file);
    setValue(file.name);
  };

  const fileDelete = ({ type, file }: { type: string; file: FileItem }) => {
    updateCurrentFileAndValue(file);
    setDailogTitle(`Delete ${file.name}`);
    setButtonText("Delete");
    setDailogType(type);
  };

  const fileRename = ({ type, file }: { type: string; file: FileItem }) => {
    updateCurrentFileAndValue(file);
    setDailogTitle("Rename");
    setButtonText("Rename");
    setDailogType(type);
  };

  const fileView = ({ type, file }: { type: string; file: FileItem }) => {
    updateCurrentFileAndValue(file);
    setDailogTitle(file.name);
    setDailogType(type);
  };

  const newFolder = ({ type }: { type: string }) => {
    setValue("");
    setDailogTitle("Create Folder");
    setButtonText("Create");
    setDailogType(type);
  };

  const handleDailog = ({ type, file }: { type: string; file: FileItem }) => {
    switch (type) {
      case "file-delete":
        fileDelete({ type, file });
        break;
      case "file-rename":
        fileRename({ type, file });
        break;
      case "file-view":
        fileView({ type, file });
        break;
      case "folder-delete":
        fileDelete({ type, file });
        break;
      case "folder-rename":
        fileRename({ type, file });
        break;
      case "new-folder":
        newFolder({ type });
        break;
      default:
        break;
    }

    setOpen(true);
  };

  return {
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
  };
};

export default useDashboardDailogs;
