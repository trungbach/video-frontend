import EditUserContainer from "@/components/edit-user-container";
import Theme from "@/components/theme";
import { useRouter } from "next/router";
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

const EditUser = () => {
  const router = useRouter();

  return (
    <Theme title="Edit User" description="">
      <EditUserContainer id={router.query.id} />
    </Theme>
  );
};

export default EditUser;
