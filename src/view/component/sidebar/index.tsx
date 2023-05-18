import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar, Divider, Menu, Typography } from "antd";
import Logo from "../../assets/download.png";

/**
 * This is the component for the sidebar section
 *
 * @returns JSX.Element
 */

const SideBar = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "16px 0",
        }}
      >
        <Avatar size={32} src={Logo} />
        <Typography.Title
          level={2}
          style={{
            margin: "0 0 0 8px",
            display: "inline-block",
          }}
        >
          Stealth
        </Typography.Title>
      </div>
      <Divider
        style={{
          margin: "8px 0",
        }}
      />
      <Menu mode="inline" defaultSelectedKeys={["fileManager"]}>
        <Menu.Item key="fileManager" icon={<AntDesignOutlined />}>
          File Manager
        </Menu.Item>
      </Menu>
    </>
  );
};

export default SideBar;
