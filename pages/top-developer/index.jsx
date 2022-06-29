import Theme from "@/components/theme";
import TopUserContainer from "@/components/top-user-container";
import { getTokenFromServer } from "@/utils/index";
import React from "react";

export const getServerSideProps = async ({ locale, req, res }) => {
  const token = getTokenFromServer(req);
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

const TopDeveloper = () => {
  return (
    <Theme title="Top Developer" description="">
      <TopUserContainer />
    </Theme>
  );
};

export default TopDeveloper;
