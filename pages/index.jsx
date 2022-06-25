import WelcomeContainer from "@/components/welcome-container";
import React from "react";
import styles from "../styles/Welcome.module.scss";
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
  return {};
};

const Welcome = () => {
  return (
    <div className={styles.welcome}>
      <WelcomeContainer />
    </div>
  );
};

export default Welcome;
