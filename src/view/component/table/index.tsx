import { Table, Space, Button, Popconfirm, Avatar, Form } from "antd";
import {
  FormOutlined,
  DeleteFilled,
  CloseCircleFilled,
  CheckCircleFilled,
} from "@ant-design/icons";
import { useState } from "react";
import { FileTableProps, IFile } from "../../../modal/interface";
import moment from "moment";
import NatureImage from "../../assets/images.jpg";
import { EditableCell } from "../edit";

/**
 * This is the component for the table section
 *
 * @param param0 FileTableProps that is passed from src\view\index.tsx
 * @returns JSX.Element
 */

const FileTable: React.FC<FileTableProps> = ({
  files,
  onDelete,
  onEdit,
  searchValue,
  onSave,
  isEditing,
  form,
}) => {
  // State to store the selected row keys
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  // Row selection config
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys as string[]);
    },
  };

  //  Filter the files based on the search value
  const filteredFiles = searchValue
    ? files.filter((file) =>
        file.Name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : files;

  //  Columns for the table
  const columns: any[] = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      render: (text: string) => (
        <>
          <Avatar src={NatureImage} alt="user" size={30} shape="square" />
          <span style={{ marginLeft: "10px" }}>{text}</span>
        </>
      ),
      editable: true,
    },
    {
      title: "Owner",
      dataIndex: "Owner",
      key: "Owner",
      render: (text: string) => (
        <Avatar src={text} alt="user" size={30} shape="circle" />
      ),
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "Type",
      editable: true,
    },
    {
      title: "Modified At",
      dataIndex: "ModifietAt",
      key: "ModifietAt",
      render: (text: string) => moment(text).format("Do MMM 'YY"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_text: string, record: IFile) => {
        const editable = isEditing(record);

        return (
          <Space>
            {editable ? (
              <Button
                style={{ border: "none" }}
                icon={<CheckCircleFilled />}
                onClick={() => onSave(record.id)}
              />
            ) : (
              <Button
                style={{ border: "none" }}
                icon={<FormOutlined />}
                onClick={() => onEdit(record)}
              />
            )}
            <Popconfirm
              title="Are you sure"
              onConfirm={() => onDelete(record.id)}
              cancelText={
                <span className="custom-popconfirm-cancel">
                  <CloseCircleFilled />
                </span>
              }
              okText={
                <span className="custom-popconfirm-ok">
                  <CheckCircleFilled />
                </span>
              }
              icon={null}
            >
              <Button style={{ border: "none" }} icon={<DeleteFilled />} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  //  Add the onCell property to the columns to make the cells editable
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IFile) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        rowClassName="editable-row"
        dataSource={filteredFiles}
        columns={mergedColumns}
        rowSelection={rowSelection}
        pagination={false}
      />
    </Form>
  );
};

export default FileTable;
