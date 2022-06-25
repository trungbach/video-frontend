import { accountSelector, login } from "@/features/account";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useEffect } from "react";
import styles from "./style.module.scss";

function LoginContainer() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { pending, user } = useAppSelector(accountSelector);

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user]);

  const onFinish = (values: any) => {
    dispatch(login(values));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.title}>Login</h1>
      <h3 className={styles.desc}>Nice to see you again</h3>
      <Form
        name="basic"
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Please input your email!" },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            className={styles.activeBtn}
            htmlType="submit"
            loading={pending}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.registerCta}>
        <p>Dont have account yet?&nbsp;</p>
        <Link href="/register">
          <a>Register</a>
        </Link>
      </div>
    </div>
  );
}
export default memo(LoginContainer);
