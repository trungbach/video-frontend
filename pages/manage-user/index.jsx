import Theme from "@/components/theme";
import UserContainer from "@/components/user-container";
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

const ManageVideo = () => {
  return (
    <Theme title="Manage User" description="">
      <UserContainer />
    </Theme>
  );
};

export default ManageVideo;
