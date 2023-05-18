import { Card, Col, Form, Layout, Row } from "antd";
import Sider from "antd/es/layout/Sider";
import { Header, Content } from "antd/es/layout/layout";
import { useAppDispatch, useAppSelector } from "../../modal/hooks";
import { fetchFiles } from "../../controller/file";
import { fetachCatagoryList } from "../../controller/catagory";
import { useEffect, useState } from "react";
import FileTable from "../component/table";
import { IFile } from "../../modal/interface";
import SearchInput from "../component/input";
import SideBar from "../component/sidebar";
import HeaderSection from "../component/header";
import CategoryComponent from "../component/catagory";

// Style for the layout
const headerStyle: React.CSSProperties = {
  textAlign: "center",
  backgroundColor: "#fff",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  height: "100%",
  lineHeight: "120px",
  backgroundColor: " #eef3fa",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  backgroundColor: "#fff",
  boxShadow: "4px 0 4px rgba(0, 0, 0, 0.08)",
  height: "100vh",
};

/**
 * This is the main page of the application
 *
 * @returns JSX.Element
 */
const FileManager = () => {
  // This is the redux hook that is used to dispatch actions
  const dispatch = useAppDispatch();
  // all the states that are used in this component
  const {
    files: {
      fileLoading,
      filesData: { files },
      fileError,
    },
    catagory: {
      catagoryLoading,
      catagoryData: { catagory },
      catagoryError,
    },
  } = useAppSelector((state) => state);
  const [searchValue, setSearchValue] = useState<string>("");
  const [fileList, setFileList] = useState<IFile[]>([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record: IFile) => record.id === editingKey;

  // Fetch the files and catagory list from the server
  useEffect(() => {
    dispatch(fetchFiles());
    dispatch(fetachCatagoryList());
  }, [dispatch]);

  // Set the fileList state when the files state changes
  useEffect(() => {
    setFileList(files);
  }, [files]);

  // Handle the search input change
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  // Handle the delete action
  const handleDelete = (id: string) => {
    const newFileList = fileList.filter((file) => file.id !== id);
    setFileList(newFileList);
  };

  // Handle the edit action
  const handleEdit = (record: Partial<IFile> & { id: React.Key }) => {
    form.setFieldsValue({ Name: "", ModifietAt: "", Type: "", ...record });
    setEditingKey(record.id);
  };

  // handle column change when editing is finished
  const handleSave = async (id: React.Key) => {
    try {
      const row = (await form.validateFields()) as IFile;

      const newData = [...files];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setFileList(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setFileList(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  // If the files or catagory is loading then show loading
  if (fileLoading || catagoryLoading) return <div>Loading...</div>;
  // If there is an error while fetching the files or catagory then show error
  if (fileError || catagoryError) return <div>Error...</div>;

  return (
    <Layout>
      <Sider style={siderStyle}>
        <SideBar />
      </Sider>
      <Layout>
        <Header style={headerStyle}>
          <HeaderSection />
        </Header>
        <Content style={contentStyle}>
          <SearchInput value={searchValue} onChange={handleSearchChange} />
          <Row>
            <Col span={5}>
              <CategoryComponent catagory={catagory} />
            </Col>
            <Col span={17}>
              <Card>
                <FileTable
                  files={fileList}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  searchValue={searchValue}
                  isEditing={isEditing}
                  onSave={handleSave}
                  form={form}
                />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default FileManager;
