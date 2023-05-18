import { InputNumber, Input, Form } from "antd";
import { EditableCellProps } from "../../../modal/interface";

/**
 * This is a component that is used to edit the table cell.
 * 
 * @param param0 EditableCellProps that is passed from src\view\component\table\index.tsx
 * @returns 
 */
export const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
