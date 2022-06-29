import Theme from "@/components/theme";
import TopVideoContainer from "@/components/top-video-container";
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

const TopVideo = () => {
  return (
    <Theme title="Top Video" description="">
      <TopVideoContainer />
    </Theme>
  );
};

export default TopVideo;
