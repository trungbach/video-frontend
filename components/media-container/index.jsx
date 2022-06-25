/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import Link from "next/link";
import React, { useEffect } from "react";
import styles from "./style.module.scss";
import "node_modules/video-react/dist/video-react.css"; // import css
import { message, Radio, Input } from "antd";
import VideoEvents from "./video-events";
import { getDetailVideo, videoSelector, viewVideo } from "@/features/video";
import { useRouter } from "next/router";
import LoadingComponent from "../LoadingComponent";
import { accountSelector, followUser, getUser, unfollowUser } from "@/features/account";
import Feedback from "./Feedback";
const TypeQuestion = {
  MULTIPLE_CHOICE: 0,
  EXPLAIN: 1,
};
export default function MediaContainer() {
  const dispatch = useAppDispatch();
  const { detailVideo, pending } = useAppSelector(videoSelector);

  const { user } = useAppSelector(accountSelector);

  const router = useRouter();

  const [answer, setAnswer] = React.useState();
  const [currentQuestion, setCurrentQuestion] = React.useState();
  const [isFollow, setIsFollow] = React.useState(false);

  useEffect(() => {
    const { id } = router.query;
    dispatch(getDetailVideo({ videoId: id }));
    dispatch(viewVideo({ id }));
  }, [dispatch, router]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (detailVideo) {
      if (detailVideo.user.follow) {
        setIsFollow(true);
      }
    }
  }, [detailVideo]);

  useEffect(() => {
    if (currentQuestion && answer) {
      if (currentQuestion.answer === answer) {
        message.success("Correct answer!");
      }
    }
  }, [answer, currentQuestion, detailVideo]);

  const onChange = (e) => {
    setAnswer(e.target.value);
  };

  const Multichoice = ({ data }) => {
    return (
      <div>
        <h4 className="mb-4">{data.questionContent}</h4>
        <div className="d-flex">
          <Radio.Group onChange={onChange} value={answer}>
            {data.questionData.split(",").map((item, index) => (
              <Radio key={index} value={item}>
                {item}
              </Radio>
            ))}
          </Radio.Group>
        </div>
      </div>
    );
  };

  const Explain = ({ data }) => {
    return (
      <div>
        <h4 className="my-4">{data.questionContent}</h4>
      </div>
    );
  };

  if (pending) {
    return <LoadingComponent />;
  }

  if (!detailVideo) {
    return "";
  }

  const onTimeUpdate = (e) => {
    if (detailVideo) {
      const { videoQuestions } = detailVideo;
      const { currentTime } = e.target;
      videoQuestions.forEach((item) => {
        if (item.duration <= currentTime + 0.5) {
          setCurrentQuestion(item);
        }
      });
    }
  };

  const handleFollow = () => {
    dispatch(followUser({ partnerId: detailVideo.user.id }));
    setIsFollow(true);
  };

  const handleUnFollow = () => {
    dispatch(unfollowUser({ partnerId: detailVideo.user.id }));
    setIsFollow(false);
  };

  const renderQuestion =
    currentQuestion &&
    (currentQuestion.type === TypeQuestion.EXPLAIN ? (
      <Explain data={currentQuestion} />
    ) : (
      <Multichoice data={currentQuestion} />
    ));

  return (
    <div className={styles.homeContainer}>
      <div className="row">
        <Link href="/home">
          <a className={styles.button}>Back</a>
        </Link>
      </div>
      <div className="d-flex">
        <div style={{ width: "75%", margin: "40px 0" }}>
          <h2 style={{ color: "#ccc" }} className="mb-4">
            {detailVideo.title}
          </h2>
          <div>
            <video
              onTimeUpdate={onTimeUpdate}
              controls
              style={{ width: "100%" }}
              src={detailVideo.video.originUrl}
            ></video>
          </div>

          <div className="my-4 d-flex justify-content-between">
            <h2>Question or Explain:</h2>
            <div>
              <span>Author: {detailVideo.user.name}</span>
              {isFollow ? (
                <img
                  onClick={handleUnFollow}
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                  width={30}
                  src="/assets/image/ic_unfollow.png"
                  alt="unfollow"
                />
              ) : (
                <img
                  onClick={handleFollow}
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                  width={30}
                  src="/assets/image/ic_follow.png"
                  alt="follow"
                />
              )}
            </div>
          </div>
          <div className={styles.listQuestions}>{renderQuestion}</div>

          <Feedback detailVideo={detailVideo} />
        </div>
        <div style={{ width: "25%" }}>
          <VideoEvents detailVideo={detailVideo} />
        </div>
      </div>
    </div>
  );
}
