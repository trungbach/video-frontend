/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import { accountSelector, followUser, getUsers, unfollowUser } from "@/features/account";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import LoadingComponent from "../LoadingComponent";
import styles from "./style.module.scss";
import { Input, Select, Button } from "antd";
import TableUsers from "./TableUsers";

export default function TopUserContainer() {
  const dispatch = useAppDispatch();
  const { users, pending, toggleFollow } = useAppSelector(accountSelector);
  const [pageIndex, setPageIndex] = React.useState(1);
  const [name, setName] = React.useState("");

  useEffect(() => {
    dispatch(getUsers({ page: pageIndex - 1, name, type: "follow", role: "ROLE_STAFF" }));
  }, [dispatch, pageIndex, name, toggleFollow]);

  if (users === undefined) {
    return "";
  }

  const handleFollow = (devId, isFollow) => {
    if (isFollow) {
      dispatch(unfollowUser({ partnerId: devId }));
    } else {
      dispatch(followUser({ partnerId: devId }));
    }
  };

  const renderHotUser = users.map((item, index) => {
    return (
      <Link passHref href={`/detail-user/${item.id}`} key={index}>
        <div className={`col-3 p-4 ${styles.hoverBorder}`}>
          <div style={{ border: "2px solid transparent" }}>
            <div style={{ position: "relative" }}>
              <img
                width={"100%"}
                src={
                  item.avatar ? item.avatar.originUrl : "/public/assets/image/img_teacher_large.png"
                }
                alt=""
              />
            </div>
            <div className="p-2">
              <div className="d-flex">
                <div className="mt-3">
                  <h3 style={{ color: "#fff", fontSize: 17 }}>{item.name}</h3>
                  <p style={{ color: "#ccc", marginTop: 8 }}>{item.author}</p>
                  <div className="d-flex align-items-center">
                    <p style={{ color: "#ccc", fontSize: 13 }} className="me-3">
                      {item.totalFollower} followers
                    </p>
                    <Button
                      className={styles.primaryBtn}
                      onClick={(e) => {
                        e.preventDefault();
                        handleFollow(item.id, item.follow);
                      }}
                    >
                      {item.follow ? "Unfollow" : "Follow"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  });
  return (
    <div className={styles.homeContainer}>
      <div className="row">
        <Link href="/home">
          <a className={styles.button}>Back</a>
        </Link>
        <Input
          style={{
            borderColor: "#ccc",
            color: "#ccc",
            backgroundColor: "transparent",
            borderRadius: "10px",
            width: 500,
            margin: "0 20px",
          }}
          placeholder="Search user by name..."
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="mt-5 mb-4 ">Top Developer</h1>
        </div>
        <div className="row">{renderHotUser}</div>
        {/* <TableUsers pageIndex={pageIndex} setPageIndex={setPageIndex} /> */}
      </div>
    </div>
  );
}
