/* eslint-disable @next/next/no-img-element */
import { LanguageContext } from "@/context/language";
import ic_logo from "@/image/ic_logo.svg";
import { Layout, Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { TranslateProps } from "types/theme";
import styles from "./style.module.scss";

const { Sider } = Layout;

export default function Sidebar() {
  const router = useRouter();
  const { currentLocale } = useContext(LanguageContext);
  return (
    <Sider width={138} className={styles.sider}>
      <Menu
        className={styles.siderMenu}
        mode="vertical"
        theme="dark"
        selectedKeys={[router.pathname]}
      >
        <div
          className={
            router.pathname === "/room/[id]"
              ? `${styles.logo} ${styles.disabled}`
              : styles.logo
          }
        >
          <Link href="/" locale={currentLocale}>
            <a>
              <Image src={ic_logo} alt="logo" width={51} height={59} />
            </a>
          </Link>
        </div>
        <Menu.Item key="/home" disabled={router.pathname === "/room/[id]"}>
          <Link href="/home" locale={currentLocale}>
            <a>
              <img
                width={30}
                height={20}
                src="/assets/image/ic_room.svg"
                alt="home"
              />
              <div>Home</div>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item
          key="/activities"
          disabled={router.pathname === "/room/[id]"}
        >
          <Link href="/manage-video" locale={currentLocale}>
            <a>
              <img
                width={30}
                height={20}
                src="/assets/image/ic_room.svg"
                alt="home"
              />
              <div>Manage video</div>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/exercise" disabled={router.pathname === "/room/[id]"}>
          <Link href="/manage-user" locale={currentLocale}>
            <a>
              <img
                width={30}
                height={20}
                src="/assets/image/ic_exercise_tab.svg"
                alt="home"
              />
              <div>Manage user</div>
            </a>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
