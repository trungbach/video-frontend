import EditContentContainer from "@/components/edit-content-container";
import Theme from "@/components/theme";
import { getTokenFromServer } from "@/utils/index";
import { useRouter } from "next/router";
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

const EditContent = () => {
  const router = useRouter();

  return (
    <Theme title="Add Content" description="">
      <EditContentContainer id={router.query.id} />
    </Theme>
  );
};

export default EditContent;
