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

const categoryType = {
  computer_science: 0,
  general_education: 1,
  painting: 2,
  economics: 3,
  language: 4,
  literacy: 5,
  math: 6,
  algebra: 7,
  calculus: 8,
  geometry: 9,
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
            {Object.keys(categoryType).map((item, index) => {
              return (
                <Option key={index} value={categoryType[item]}>
                  {item}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        {/* <DynamicField /> */}
        <Form.Item>
          <Button className={styles.button} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
