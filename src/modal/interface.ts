/**
 * @file interface.ts
 * @description This file contains the interfaces for the application
 */

import { FormInstance } from "antd";

export interface IFile {
  Name: string;
  file: string;
  Owner: string;
  Type: string;
  ModifietAt: string;
  id: string;
}

export interface IFileList {
  files: IFile[];
}

export interface ILabel {
  Name: string;
  id: string;
}

export interface ICatagory {
  Name: string;
  id: string;
  Labels: ILabel[];
}

export interface ICatagoryList {
  catagory: ICatagory[];
}

export interface ICatagoryIntialState {
  catagoryLoading: boolean;
  catagoryData: ICatagoryList;
  catagoryError: string;
}

export interface IFileIntialState {
  fileLoading: boolean;
  filesData: IFileList;
  fileError: string;
}

export interface IFileTable {
  files: IFile[];
  onDelete: (id: string) => void;
  onEdit: (file: IFile) => void;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: IFile[];
  index: number;
  children: React.ReactNode;
}

export interface ICatergoryComponent {
  catagory: ICatagory[];
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export interface FileTableProps {
  files: IFile[];
  onDelete: (id: string) => void;
  onEdit: (file: IFile) => void;
  searchValue: string;
  onSave: (id: React.Key) => void;
  isEditing: (record: IFile) => boolean;
  form: FormInstance<any>;
}
