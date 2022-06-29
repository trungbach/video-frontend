import { Form, Input, Select } from "antd";
import React from "react";
const TypeQuestion = {
  MULTIPLE_CHOICE: 0,
  EXPLAIN: 1,
  ONE_ANSWER: 2,
};

export default function InputItem({ index }) {
  const [type, setType] = React.useState(TypeQuestion.MULTIPLE_CHOICE);
  return (
    <>
      <Form.Item
        initialValue={type}
        value={type}
        label="Type"
        name={[index, "type"]}
        rules={[{ required: true }]}
      >
        <Select onChange={(value) => setType(value)}>
          <Select.Option value={TypeQuestion.MULTIPLE_CHOICE}>Multiple Choice</Select.Option>
          <Select.Option value={TypeQuestion.EXPLAIN}>Explain</Select.Option>
          <Select.Option value={TypeQuestion.ONE_ANSWER}>One Answer</Select.Option>
        </Select>
      </Form.Item>
      {type === TypeQuestion.MULTIPLE_CHOICE || type === TypeQuestion.ONE_ANSWER ? (
        <>
          <Form.Item name={[index, "questionData"]} label="List Answer">
            <Input placeholder="List answer" />
          </Form.Item>
          <Form.Item name={[index, "answer"]} label="Answer">
            <Input placeholder="Answer" />
          </Form.Item>
        </>
      ) : (
        <Form.Item name={[index, "questionData"]} label="Note">
          <Input placeholder="Note" />
        </Form.Item>
      )}
    </>
  );
}
