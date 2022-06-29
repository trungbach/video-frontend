import { Divider, Form, Input, Select, Button, Rate } from "antd";
import React, { useEffect, useRef } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/hooks/index";
import { videoSelector } from "@/features/video";
import InputItem from "./Input";
import { accountSelector } from "@/features/account";

function DynamicField({ videoRef, form }) {
  const { detailVideo } = useAppSelector(videoSelector);
  const { user } = useAppSelector(accountSelector);

  return (
    <div className="row mt-5">
      <div className="col-5">
        <video ref={videoRef} width="100%" src={detailVideo.video.originUrl} controls></video>
        <h3 className="mt-3">List Feedbacks:</h3>
        <div className="mt-4">
          {detailVideo.feedbacks.map((item, index) => {
            return (
              <>
                <div className="my-2" key={index}>
                  <Rate value={item.rate} readonly />
                  <div className="my-3" style={{ color: "#ccc" }}>
                    <span className="me-3">
                      {item.ownerId === user?.name ? user?.name : item.user?.name}:
                    </span>
                    {item.comment}
                  </div>
                </div>
                <Divider style={{ borderTop: "1px solid rgb(255 255 255 / 6%)" }} />
              </>
            );
          })}
        </div>
      </div>
      <div className="col-7">
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
                      <InputItem index={index} />
                      <div className="d-flex justify-content-around">
                        {fields.length > 1 ? (
                          <Button
                            style={{ display: "flex", alignItems: "center", marginRight: 40 }}
                            type="danger"
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                            icon={<MinusCircleOutlined />}
                          >
                            Remove Above Question
                          </Button>
                        ) : null}
                        <Button onClick={() => form.submit()}>Insert</Button>
                      </div>
                    </div>
                  );
                })}
                <Divider />
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} style={{ width: "60%" }}>
                    <PlusOutlined /> Add Question
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </div>
    </div>
  );
}

export default DynamicField;
