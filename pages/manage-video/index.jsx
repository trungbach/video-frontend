import Theme from "@/components/theme";
import VideoContainer from "@/components/video-container";
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

const ManageVideo = () => {
  return (
    <Theme title="Media" description="">
      <VideoContainer />
    </Theme>
  );
};

export default ManageVideo;
