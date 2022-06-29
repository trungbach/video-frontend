import { updateVideo } from "@/features/video";
import { useAppDispatch } from "@/hooks/index";
import { Button, Form, Input, Select } from "antd";
import "antd/dist/antd.css";
import React, { useRef, useEffect } from "react";
import DynamicField from "./DynamicField";
import styles from "./style.module.scss";
import { useForm } from "antd/lib/form/Form";

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
  const [form] = useForm();
  const videoRef = useRef(null);

  const dispatch = useAppDispatch();

  function handleSubmit(values) {
    const payload = {
      ...values,
      id: Number(videoId),
    };
    payload.videoQuestions.forEach((q, index) => {
      console.log("q", q);
      if (q.duration === undefined) {
        console.log("detailVideo.videoQuestions[index]", detailVideo.videoQuestions[index]);
        q.duration = detailVideo.videoQuestions[index]
          ? detailVideo.videoQuestions[index].duration
          : Math.floor(videoRef.current.currentTime);
      }
      // if (!q.answer) {
      //   q.answer = "";
      // }
    });

    console.log("payload", payload);
    console.log("videoRef", videoRef.current.currentTime);

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
            {Object.keys(categoryType).map((item, index) => {
              return (
                <Option key={index} value={categoryType[item]}>
                  {item}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <DynamicField videoRef={videoRef} form={form} />
        <div
          className={`d-flex justify-content-right ${styles.submit}`}
          style={{ marginRight: 100 }}
        >
          <Form.Item>
            <Button
              style={{ display: "flex", justifyContent: "right" }}
              className={styles.submitButton}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
