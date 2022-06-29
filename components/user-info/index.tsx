import { useAppDispatch, useAppSelector } from "@/hooks/index";
import img_avatar from "@/image/img_avatar.svg";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import {
  accountSelector, getUser, logout
} from "../../features/account";
import styles from "./style.module.scss";
function UserInfo() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { pending, user } = useAppSelector(accountSelector);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      handleCancel();
    }
  }, [user]);

  const showModal = () => {
    if (user != undefined) {
      Modal.confirm({
        title: "Confirm",
        icon: <ExclamationCircleOutlined />,
        content: "Are you sure logout",
        okText: "Ok",
        cancelText: "Cancel",
        onOk: () => {
          dispatch(logout());
          router.push("/login");
        },
      });
    } else {
      router.push("/login");
    }
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const goToProfile = () => {
    user && router.push(`/detail-user/${user.id}`);
  };

  return (
    <>
      <div
        className={styles.login}

      >
        {user && (
          <div className={styles.user}>
            <Image onClick={goToProfile} src={img_avatar} alt="avatar" />
            <div>
              <span onClick={goToProfile}>{user?.name}</span>
              <div onClick={showModal} className={styles.logout}>Logout</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default memo(UserInfo);
