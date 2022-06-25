import { Divider, Form, Input, Select } from "antd";
import React from "react";

const TypeQuestion = {
  MULTIPLE_CHOICE: 0,
  EXPLAIN: 1,
};

function DynamicField(props) {
  return (
    <Form.List name="videoQuestions">
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => {
              return (
                <div key={field.key}>
                  <Divider style={{ color: "#ccc" }}>Question {index + 1}</Divider>
                  <Form.Item
                    name={[index, "questionContent"]}
                    label="Question"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="" />
                  </Form.Item>
                  <Form.Item
                    initialValue={TypeQuestion.MULTIPLE_CHOICE}
                    label="Type"
                    name={[index, "type"]}
                    rules={[{ required: true }]}
                  >
                    <Select>
                      <Select.Option value={TypeQuestion.MULTIPLE_CHOICE}>
                        Multiple Choice
                      </Select.Option>
                      <Select.Option value={TypeQuestion.EXPLAIN}>Explain</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name={[index, "questionData"]} label="List Answer">
                    <Input placeholder="List answer" />
                  </Form.Item>
                  <Form.Item name={[index, "answer"]} label="Answer">
                    <Input placeholder="Answer" />
                  </Form.Item>
                  <Form.Item
                    name={[index, "duration"]}
                    label="Duration"
                    rules={[{ required: true }]}
                  >
                    <Input type="number" />
                  </Form.Item>
                </div>
              );
            })}
            <Divider />
          </div>
        );
      }}
    </Form.List>
  );
}

export default DynamicField;
