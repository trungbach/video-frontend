/* eslint-disable @next/next/no-img-element */
import { accountSelector, getDetailUser, updateUser } from "@/features/account";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { useUploadImage } from "@/hooks/useUploadImage";
import { Button, DatePicker, Form, Input, Radio } from "antd";
import React, { useEffect, useState } from "react";
import LoadingComponent from "../LoadingComponent";
import moment from "moment";
import styles from "./style.module.scss";
import { DATE_FORMAT } from "@/config/constant";
import Link from "next/link";
import { Router, useRouter } from "next/router";

function EditUserContainer({ id }) {
  const dispatch = useAppDispatch();
  const { detailUser, pending } = useAppSelector(accountSelector);
  const [form] = Form.useForm();
  const router = useRouter();
  console.log("detailUser", detailUser);

  useEffect(() => {
    dispatch(getDetailUser({ userId: id }));
  }, [id]);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

  const [file, setFile] = useState();
  const [avatar] = useUploadImage(file);

  useEffect(() => {
    avatar && form.setFieldsValue({ avatarId: avatar.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  const disabledFuture = (current) => {
    return current && current.valueOf() > Date.now();
  };

  const handleSubmit = (values) => {
    values.id = Number(id);
    // values.birthday = values["birthday"] ? values["birthday"].format(DATE_FORMAT) : "";

    values.name = values["name"].trim();
    values.phone = values["phone"].trim();
    values.address = values["address"] ? values["address"].trim() : "";
    values.email = values["email"].trim();
    dispatch(updateUser(values));
  };

  if (pending || !detailUser) {
    return <LoadingComponent />;
  }

  return (
    <div className={styles.content}>
      <div className={styles.primaryBtn} onClick={() => router.back()}>
        {" "}
        Back
      </div>
      <div className={styles.form}>
        <Form
          initialValues={detailUser}
          form={form}
          {...formItemLayout}
          onFinish={handleSubmit}
          scrollToFirstError
        >
          <Form.Item
            label="Username"
            rules={[
              { required: true },
              {
                max: 40,
              },
            ]}
            name="name"
            whitespace={true}
          >
            <Input className={styles.textInputLight} />
          </Form.Item>

          <Form.Item
            label="Phone"
            rules={[
              { required: true },
              {
                len: 10,
              },
              {
                pattern: new RegExp(/^\d*[1-9]\d*$/), // only number
              },
            ]}
            name="phone"
            whitespace
          >
            <Input className={styles.textInputLight} />
          </Form.Item>

          {/* <Form.Item label="Birthday" name="birthday">
            <DatePicker
              initialValue={detailUser.birthday && moment(detailUser.createdAt)}
              className={styles.datePicker}
              disabledDate={disabledFuture}
            />
          </Form.Item> */}

          <Form.Item label="Gender" rules={[{ required: true }]} name="gender" initialValue={0}>
            <Radio.Group defaultValue={0}>
              <Radio value={0}>Male</Radio>
              <Radio value={1}>Female</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item rules={[{ max: 100 }]} label="Address" name="address" whitespace>
            <Input className={styles.textInputLight} />
          </Form.Item>

          <Form.Item
            label="Email"
            whitespace
            rules={[{ required: true }, { type: "email" }]}
            name="email"
          >
            <Input type="email" className={styles.textInputLight} />
          </Form.Item>

          <Form.Item label="Avatar" name="avatarId">
            {(avatar || detailUser.avatar) && (
              <img
                style={{
                  width: 150,
                  height: 150,
                  objectFit: "cover",
                  display: "block",
                }}
                width={150}
                src={avatar ? avatar.originUrl : detailUser.avatar.originUrl}
                alt="avatar"
              />
            )}
            <label htmlFor="avatar" className={styles.labelLogo}>
              Upload
            </label>
            <input
              id="avatar"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className={styles.textInputLight}
              accept="image/png, image/gif, image/jpeg"
            />
          </Form.Item>

          <Button
            style={{ marginLeft: "auto", display: "block" }}
            htmlType="submit"
            className={styles.primaryBtn}
          >
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default EditUserContainer;
