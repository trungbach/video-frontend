/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import { accountSelector, getUsers } from "@/features/account";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import LoadingComponent from "../LoadingComponent";
import styles from "./style.module.scss";
import { Input, Select } from "antd";

import TableUsers from "./TableUsers";

const { Option } = Select;

export default function UserContainer() {
  const dispatch = useAppDispatch();
  const { users, pending } = useAppSelector(accountSelector);
  const [pageIndex, setPageIndex] = React.useState(1);
  const [name, setName] = React.useState("");

  useEffect(() => {
    dispatch(getUsers({ page: pageIndex - 1, name }));
  }, [dispatch, pageIndex, name]);

  // if (pending) {
  //   return <LoadingComponent />;
  // }

  if (users === undefined) {
    return "";
  }

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
          <h1 className="mt-5 mb-4 ">Manage Users</h1>
          {/* <div className="d-flex align-items-center me-5">
            <span style={{ marginRight: 10, fontSize: 15 }}>Sort by: </span>
            <Select value={type} onChange={(value) => setType(value)}>
              <Option value={"rate"}>Rate</Option>
            </Select>
          </div> */}
          <Link href="/add-user">
            <a className={styles.addUser}>Add User</a>
          </Link>
        </div>
        <TableUsers pageIndex={pageIndex} setPageIndex={setPageIndex} />
      </div>
    </div>
  );
}
