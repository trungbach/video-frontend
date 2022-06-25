import UserInfo from "@/components/user-info";
import { Layout } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { ThemeProviderProps } from "../../types/theme";
import Sidebar from "../Sidebar";
import styles from "./style.module.scss";

const { Content } = Layout;

const Theme = (props: ThemeProviderProps) => {
  const router = useRouter();

  return (
    <div style={props.styles}>
      <Head>
        <title>{props.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={props.description} />
        <meta property="og:type" content="website" />
        <meta name="og:title" property="og:title" content={props.title} />
        <meta
          name="og:description"
          property="og:description"
          content={props.description}
        />
        <meta property="og:site_name" content={props.title} />
        <meta property="og:url" content={router.pathname} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={props.title} />
        <meta name="twitter:description" content={props.description} />
        <meta name="twitter:site" content={router.pathname} />
        <meta name="twitter:creator" content="" />
        <link rel="apple-touch-icon" href="/static/images/favicon.ico" />
        <meta property="og:image" content={props.image} />
        <meta name="twitter:image" content={props.image} />
      </Head>
      <Layout className="full-height">
        <Sidebar />
        <Content>
          <div className={styles.login}>
            <UserInfo />
          </div>
          {props.children}
        </Content>
      </Layout>
    </div>
  );
};

export default Theme;
