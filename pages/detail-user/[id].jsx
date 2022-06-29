import DetailUserContainer from "@/components/detail-user-container";
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

const DetailUser = () => {
  const router = useRouter();

  return (
    <Theme title="Detail User" description="">
      <DetailUserContainer id={router.query.id} />
    </Theme>
  );
};

export default DetailUser;
