import React from "react";
import { Form, Button, Input, Select } from "antd";
import DynamicField from "./DynamicField";
import "antd/dist/antd.css";
import styles from "./style.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { createVideo } from "@/features/video";
import { KEY_USER_DATA } from "@/config/constant";

const { Option } = Select;
const defaultFormItemLayout = {
  labelCol: {
    xs: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 12 },
  },
};

export default function FormQuestion({ videoResponse }) {
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  function handleSubmit(values) {
    const user = localStorage.getItem(KEY_USER_DATA);
    var vid = document.getElementById("video");
    const payload = {
      ...values,
      ownerId: JSON.parse(user).id,
      time: vid?.duration,
      fileId: videoResponse.id,
    };
    console.log("payload", payload);

    dispatch(createVideo(payload));
  }
  return (
    <div className={styles.form}>
      <h1 className="my-3 mt-5">Add Question</h1>
      <Form form={form} {...defaultFormItemLayout} onFinish={handleSubmit}>
        <Form.Item name="content" label="Content Name" rules={[{ required: true }]}>
          <Input
            style={{
              borderColor: "#ccc",
              borderRadius: "10px",
              width: 500,
            }}
          />
        </Form.Item>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input
            style={{
              borderColor: "#ccc",
              borderRadius: "10px",
              width: 500,
            }}
          />
        </Form.Item>
        <Form.Item initialValue={1} name="category" label="Category" rules={[{ required: true }]}>
          <Select>
            <Option value={1}>Study</Option>
            <Option value={2}>Football</Option>
          </Select>
        </Form.Item>
        <DynamicField />
        <Form.Item>
          <Button className={styles.button} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
