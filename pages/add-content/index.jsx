import AddContentContainer from "@/components/add-content-container";
import Theme from "@/components/theme";
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

const AddContent = () => {
  return (
    <Theme title="Add Content" description="">
      <AddContentContainer />
    </Theme>
  );
};

export default AddContent;
