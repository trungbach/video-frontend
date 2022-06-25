import AddUserContainer from "@/components/add-user-container";
import Theme from "@/components/theme";
import React from "react";
import { getTokenFromServer } from "@/utils/index";
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
const AddUser = () => {
  return (
    <Theme title="Add User" description="">
      <AddUserContainer />
    </Theme>
  );
};

export default AddUser;
