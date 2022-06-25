import LoginContainer from "@/components/login-container";
import React from "react";
import styles from "./style.module.scss";
import { getTokenFromServer } from "@/utils/index";
export const getServerSideProps = async ({ locale, req, res }) => {
  const token = getTokenFromServer(req);
  if (token) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

const Login = () => {
  return (
    <div className={styles.login}>
      <LoginContainer />
    </div>
  );
};

export default Login;
