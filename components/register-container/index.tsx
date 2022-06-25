import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useEffect } from "react";
import { accountSelector, register } from "../../features/account";
import styles from "./style.module.scss";
function RegisterContainer() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { pending, registerResponse } = useAppSelector(accountSelector);

  useEffect(() => {
    if (registerResponse) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerResponse]);

  const onFinish = (values: any) => {
    dispatch(register(values));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={styles.registerContainer}>
      <h1 className={styles.title}>Create account</h1>
      <Form
        name="basic"
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
          ]}
        >
          <Input placeholder="Please input your email!" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="name"
          rules={[
            { required: true, message: "Please input your username!" },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Please input your phone!" },
          ]}
        >
          <Input placeholder="Phone" />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            className={styles.activeBtn}
            htmlType="submit"
            loading={pending}
          >
            Create account
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.registerCta}>
        <Link href="/login">
          <a>Already have an account?</a>
        </Link>
      </div>
    </div>
  );
}
export default memo(RegisterContainer);
