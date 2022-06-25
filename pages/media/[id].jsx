import MediaComtainer from "@/components/media-container";
import Theme from "@/components/theme";
import React from "react";

import { getTokenFromServer } from "@/utils/index";
export const getServerSideProps = async ({ locale, req, res }) => {
  const token = getTokenFromServer(req);
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

const MediaDetail = () => {
  return (
    <Theme title="Media" description="">
      <MediaComtainer />
    </Theme>
  );
};

export default MediaDetail;
