import { updateVideo } from "@/features/video";
import { useAppDispatch } from "@/hooks/index";
import { Button, Form, Input, Select } from "antd";
import "antd/dist/antd.css";
import React from "react";
import DynamicField from "./DynamicField";
import styles from "./style.module.scss";

const { Option } = Select;
const defaultFormItemLayout = {
  labelCol: {
    xs: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 12 },
  },
};

export default function FormQuestion({ detailVideo, videoId }) {
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  function handleSubmit(values) {
    const payload = {
      ...values,
      id: Number(videoId),
    };
    console.log("payload", payload);

    dispatch(updateVideo(payload));
  }
  return (
    <div className={styles.form}>
      <Form
        initialValues={{ videoQuestions: detailVideo.videoQuestions }}
        form={form}
        {...defaultFormItemLayout}
        onFinish={handleSubmit}
      >
        <Form.Item
          initialValue={detailVideo.content}
          name="content"
          label="Content Name"
          rules={[{ required: true }]}
        >
          <Input
            style={{
              borderColor: "#ccc",
              borderRadius: "10px",
              width: 500,
            }}
          />
        </Form.Item>
        <Form.Item
          initialValue={detailVideo.title}
          name="title"
          label="Title"
          rules={[{ required: true }]}
        >
          <Input
            style={{
              borderColor: "#ccc",
              borderRadius: "10px",
              width: 500,
            }}
          />
        </Form.Item>
        <Form.Item
          initialValue={detailVideo.category}
          name="category"
          label="Category"
          rules={[{ required: true }]}
        >
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
