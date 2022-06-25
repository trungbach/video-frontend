import HomeContainer from "@/components/home-container";
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

const Home = () => {
  return (
    <Theme title="Home" description="">
      <HomeContainer />
    </Theme>
  );
};

export default Home;
