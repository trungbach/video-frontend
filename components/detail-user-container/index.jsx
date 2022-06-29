/* eslint-disable @next/next/no-img-element */
import { accountSelector, getDetailUser, updateUser } from "@/features/account";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { useUploadImage } from "@/hooks/useUploadImage";
import { Button, DatePicker, Form, Input, Radio } from "antd";
import React, { useEffect, useState } from "react";
import LoadingComponent from "../LoadingComponent";
import moment from "moment";
import styles from "./style.module.scss";
import { DATE_FORMAT, ROLE_STAFF, ROLE_USER } from "@/config/constant";
import Link from "next/link";
import { getVideos, videoSelector } from "@/features/video";
import { formatTime } from "@/utils/index";

function DetailUserContainer({ id }) {
  const dispatch = useAppDispatch();
  const { detailUser, pending, user } = useAppSelector(accountSelector);
  const { listVideos } = useAppSelector(videoSelector);
  console.log("listVideos", listVideos);

  useEffect(() => {
    dispatch(getDetailUser({ userId: id }));
    dispatch(getVideos({ ownerId: id, page: 0 }));
  }, [id]);

  if (pending || !detailUser) {
    return <LoadingComponent />;
  }

  const renderVideos =
    listVideos &&
    listVideos.map((item, index) => {
      return (
        <Link passHref href={`/media/${item.id}`} key={index}>
          <div className={`col-3 p-4 ${styles.hoverBorder}`}>
            <div style={{ border: "2px solid transparent" }}>
              <div style={{ position: "relative" }}>
                <video style={{ width: "100%" }} src={item.video.originUrl} />
                <div
                  style={{
                    position: "absolute",
                    right: 7,
                    bottom: 7,
                    background: "#160d0d",
                    padding: 4,
                    borderRadius: 7,
                  }}
                >
                  {formatTime(item.time)}
                </div>
              </div>
              <div className="p-2">
                <div className="d-flex">
                  <div>
                    <h3 style={{ color: "#fff", fontSize: 17 }}>{item.title}</h3>
                    <p style={{ color: "#ccc", marginTop: 8 }}>{item.author}</p>
                    <div className="d-flex">
                      <p style={{ color: "#ccc", fontSize: 13 }} className="me-3">
                        {item.numberView} views
                      </p>
                      <p style={{ color: "#ccc", fontSize: 13 }}>
                        {moment(item.createdAt).fromNow()}
                      </p>
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
    <div className={styles.content}>
      <div className="d-flex">
        <Link href="/home">
          <a className={styles.primaryBtn}>Back</a>
        </Link>
        {user?.id === Number(id) && (
          <Link href={`/edit-user/${id}`}>
            <a className={styles.primaryBtn}>Update Profile</a>
          </Link>
        )}
      </div>

      <h2 className="mt-5">Profile</h2>
      <div className={styles.info}>
        <div className="row">
          <div className="col-6">Avatar</div>
          <div className="col-6">
            {detailUser.avatar ? (
              <img width={150} src={detailUser?.avatar.originUrl} alt="" />
            ) : (
              <img width={150} src="/public/assets/image/img_teacher_large.png" alt="" />
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-6">Name</div>
          <div className="col-6">{detailUser.name}</div>
        </div>

        <div className="row">
          <div className="col-6">Followers</div>
          <div className="col-6">{detailUser.totalFollower}</div>
        </div>
      </div>

      {detailUser?.role === ROLE_STAFF && (
        <div className="mt-5">
          <h2>List Video</h2>
          <div className="row">{renderVideos}</div>
        </div>
      )}
    </div>
  );
}

export default DetailUserContainer;
