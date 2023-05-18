import { SettingOutlined } from "@ant-design/icons";
import { Typography, Checkbox } from "antd";
import { ICatergoryComponent } from "../../../modal/interface";

/**
 * This is the component for the catagory section
 * 
 * @param catagory This is the catagory fetched from the api 
 * @returns 
 */
const CategoryComponent = ({ catagory }: ICatergoryComponent) => {
  return (
    <div
      style={{
        width: "120px",
        justifyContent: "start",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Typography.Title
          style={{
            margin: 0,
          }}
          level={5}
        >
          CATEGORIES
        </Typography.Title>
        <SettingOutlined />
      </div>
      {catagory.map((item) => (
        <div
          key={item?.id}
          style={{
            marginTop: "20px",
          }}
        >
          <Typography.Title style={{ textAlign: "left" }} level={5}>
            {item.Name}
          </Typography.Title>
          <Checkbox.Group
            className="checkbox-group"
            options={item.Labels.map((label) => ({
              label: label.Name,
              value: label.id,
            }))}
          />
        </div>
      ))}
    </div>
  );
};

export default CategoryComponent;
