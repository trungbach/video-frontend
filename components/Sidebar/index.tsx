/* eslint-disable @next/next/no-img-element */
import { ROLE_ADMIN, ROLE_USER } from "@/config/constant";
import { LanguageContext } from "@/context/language";
import { accountSelector } from "@/features/account";
import { useAppSelector } from "@/hooks/index";
import ic_logo from "@/image/ic_logo.svg";
import { Layout, Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import styles from "./style.module.scss";

const { Sider } = Layout;

export default function Sidebar() {
  const router = useRouter();

  const { user } = useAppSelector(accountSelector)
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
            styles.logo
          }
        >
          <Link href="/" >
            <a>
              <Image src={ic_logo} alt="logo" width={51} height={59} />
            </a>
          </Link>
        </div>
        <Menu.Item key="/home" >
          <Link href="/home" >
            <a>
              <img
                width={30}
                height={20}
                src="/assets/image/ic_home.png"
                alt="home"
              />
              <div>Home</div>
            </a>
          </Link>
        </Menu.Item>
        {user?.role !== ROLE_USER &&
          <Menu.Item
            key="/activities"
          >
            <Link href="/manage-video" >
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
        }

        {user?.role === ROLE_ADMIN &&
          <Menu.Item key="/exercise" >
            <Link href="/manage-user" >
              <a>
                <img
                  width={30}
                  height={20}
                  src="/assets/image/ic_user.png"
                  alt="home"
                />
                <div>Manage user</div>
              </a>
            </Link>
          </Menu.Item>
        }
        {user?.role === ROLE_USER &&
          <>
            <Menu.Item
              key="/top-video"
            >
              <Link href="/top-video">
                <a>
                  <img
                    width={30}
                    height={20}
                    src="/assets/image/ic_room.svg"
                    alt="home"
                  />
                  <div>Top Video</div>
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item
              key="/top-developer"
            >
              <Link href="/top-developer">
                <a>
                  <img
                    width={30}
                    height={20}
                    src="/assets/image/ic_user.png"
                    alt="home"
                  />
                  <div>Top Developer</div>
                </a>
              </Link>
            </Menu.Item>
          </>

        }
      </Menu>


    </Sider>
  );
}
