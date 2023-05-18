import { PlusOutlined } from "@ant-design/icons";
import { Typography, Button } from "antd";

/**
 * This is the component for the header section
 * 
 * @returns JSX.Element
 */
const HeaderSection = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "12px",
      }}
    >
      <Typography.Title level={3}>File Manager</Typography.Title>
      <Button type="primary" icon={<PlusOutlined />}>
        Upload
      </Button>
    </div>
  );
};

export default HeaderSection;
