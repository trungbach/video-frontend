/* eslint-disable @next/next/no-img-element */
import { ROLE_ADMIN, ROLE_STAFF } from "@/config/constant";
import { accountSelector, deleteUser, followUser, unfollowUser } from "@/features/account";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { Modal, Pagination } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from "./style.module.scss";

const PAGE_SIZE = 20;
const { confirm } = Modal;

export default function TableUsers({ pageIndex, setPageIndex }) {
  const { totalRecord, users, user } = useAppSelector(accountSelector);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleFollow = (devId, isFollow) => {
    if (isFollow) {
      dispatch(unfollowUser({ partnerId: devId }));
    } else {
      dispatch(followUser({ partnerId: devId }));
    }
  };

  const renderUsers =
    users &&
    users
      .filter((i) => i.deleted !== true)
      .map((item, index) => {
        return (
          <tr className="row text-center" key={index}>
            <td className="col-1">{item.id}</td>
            <td className="col-2">{item.name}</td>
            <td className="col-2">{item.email}</td>
            <td className="col-1">
              {item.role === ROLE_ADMIN ? "Admin" : item.role === ROLE_STAFF ? "Developer" : "User"}
            </td>
            <td className="col-1">{item.totalFollower}</td>
            <td className="col-2">{item.phone}</td>
            <td className="col-1">{moment(item.createdAt).format("YYYY-MM-DD")}</td>
            <td className="col-2">
              <img
                onClick={() => handleFollow(item.id, item.follow)}
                style={{ cursor: "pointer" }}
                width={30}
                src={item.follow ? "/assets/image/ic_unfollow.png" : "/assets/image/ic_follow.png"}
                alt=""
              />
            </td>
          </tr>
        );
      });

  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr className="text-center">
            <th className="col-1">ID</th>
            <th className="col-2">Name</th>
            <th className="col-2">Email</th>
            <th className="col-1">Role</th>
            <th className="col-1">Followers</th>
            <th className="col-2">Phone</th>
            <th className="col-1">Created At</th>
            <th className="col-2">Action</th>
          </tr>
        </thead>
        <tbody>{renderUsers}</tbody>
      </table>

      <div className={styles.pagination}>
        <Pagination
          onChange={(page) => setPageIndex(page)}
          defaultCurrent={pageIndex}
          total={totalRecord}
          pageSize={PAGE_SIZE}
        />
      </div>
    </div>
  );
}
