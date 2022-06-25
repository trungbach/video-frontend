import RegisterContainer from "@/components/register-container";
import type { NextPage } from "next";
import React from "react";
import styles from "./style.module.scss";

const Register: NextPage = () => {
  return (
    <div className={styles.register}>
      <RegisterContainer />
    </div>
  );
};

export default Register;
