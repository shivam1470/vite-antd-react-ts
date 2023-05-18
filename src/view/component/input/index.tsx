import { Col, Input, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { SearchInputProps } from "../../../modal/interface";

/**
 * This is the component for the search input
 *
 * @param param0 SearchInputProps that is passed from src\view\component\table\index.tsx
 * @returns JSX.Element
 */
const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  // This is the function that is called when the input value is changed
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Row>
      <Col span={5}></Col>
      <Col span={17}>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Input
            addonBefore={<SearchOutlined />}
            style={{ maxWidth: "300px", margin: "40px 0" }}
            placeholder="Search by name"
            value={value}
            onChange={handleSearch}
          />
        </div>
      </Col>
    </Row>
  );
};

export default SearchInput;
