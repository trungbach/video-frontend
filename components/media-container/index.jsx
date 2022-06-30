/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import { accountSelector, followUser, getUser, unfollowUser } from "@/features/account";
import { getDetailVideo, videoSelector, viewVideo } from "@/features/video";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { message, Radio, Checkbox, Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import "node_modules/video-react/dist/video-react.css"; // import css
import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import LoadingComponent from "../LoadingComponent";
import Feedback from "./Feedback";
import styles from "./style.module.scss";
import VideoJS from "./Video";
import VideoEvents from "./video-events";

const TypeQuestion = {
  MULTIPLE_CHOICE: 0,
  EXPLAIN: 1,
  ONE_ANSWER: 2,
};
export default function MediaContainer() {
  const dispatch = useAppDispatch();
  const { detailVideo, pending } = useAppSelector(videoSelector);

  const { user } = useAppSelector(accountSelector);
  const playerRef = React.useRef(null);

  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] = React.useState();
  const [isFollow, setIsFollow] = React.useState(false);
  const [isFeedback, setIsFeedback] = React.useState(false);
  const [checkedValues, setCheckedValues] = React.useState([]);
  const [trueAnswer, setTrueAnswer] = React.useState(undefined);

  useEffect(() => {
    const { id } = router.query;
    dispatch(getDetailVideo({ videoId: id }));
    dispatch(viewVideo({ id }));
  }, [dispatch, router]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // check is followed and is feedbacked.
  useEffect(() => {
    if (detailVideo) {
      if (detailVideo.user.follow) {
        setIsFollow(true);
      }
      if (user && detailVideo.feedbacks.find((item) => item.ownerId === user.id)) {
        setIsFeedback(true);
      }
    }
  }, [detailVideo, user]);

  const onChangeMultichoice = (checkedValues) => {
    setCheckedValues(checkedValues);
  };

  const onChangeOneAnswer = (e) => {
    setCheckedValues([e.target.value]);
  };

  const videoJsOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: detailVideo?.video.originUrl,
        type: "video/mp4",
      },
    ],
  };
  const handleSubmitAnwser = () => {
    let isWrongAnwser = false;
    const answer = currentQuestion.answer.split(",");
    if (checkedValues.length !== answer.length) {
      isWrongAnwser = true;
    } else {
      for (let i = 0; i < checkedValues.length; i++) {
        if (!answer.includes(checkedValues[i])) {
          isWrongAnwser = true;
          break;
        }
      }
    }
    if (!isWrongAnwser) {
      message.success("Correct answer!");
    } else {
      message.error("Wrong answer!");
    }
    setTimeout(() => {
      setCurrentQuestion(undefined);
    }, [2000]);

    setTrueAnswer(currentQuestion.answer);
    setTimeout(() => {
      setTrueAnswer(undefined);
    }, [2000]);
    setCheckedValues([]);
    document.querySelector(".vjs-play-control").removeAttribute("disabled");
  };

  const Multichoice = ({ data }) => {
    return (
      <div>
        <h4 className="mb-4">{data.questionContent}</h4>
        <Checkbox.Group value={checkedValues} onChange={onChangeMultichoice}>
          {data.questionData.split(",").map((item, index) => (
            <>
              <Checkbox key={index} value={item}>
                {item}
              </Checkbox>
              <br />
            </>
          ))}
        </Checkbox.Group>
        <div className="mt-4">
          <Button onClick={handleSubmitAnwser} className={styles.primaryButton}>
            Submit
          </Button>
        </div>
      </div>
    );
  };
  console.log("isFeeb", isFeedback);

  const OneAnswer = ({ data }) => {
    return (
      <div>
        <h4 className="mb-4">{data.questionContent}</h4>
        <Radio.Group value={checkedValues[0]} onChange={onChangeOneAnswer}>
          {data.questionData.split(",").map((item, index) => (
            <>
              <Radio key={index} value={item}>
                {item}
              </Radio>
              <br />
            </>
          ))}
        </Radio.Group>
        <div className="mt-4">
          <Button onClick={handleSubmitAnwser} className={styles.primaryButton}>
            Submit
          </Button>
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

  useEffect(() => {
    if (currentQuestion?.type === TypeQuestion.EXPLAIN) {
      setTimeout(() => {
        document.querySelector(".vjs-play-control").removeAttribute("disabled");
        setCurrentQuestion(undefined);
      }, 5000);
    }
  }, [currentQuestion]);

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
        if (item.duration - currentTime <= 0.1 && item.duration - currentTime >= -0.1) {
          console.log(item.duration);
          setCurrentQuestion(item);
          playerRef.current.pause();
          document.querySelector(".vjs-play-control").setAttribute("disabled", "true");
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
    ) : currentQuestion.type === TypeQuestion.ONE_ANSWER ? (
      <OneAnswer data={currentQuestion} />
    ) : (
      <Multichoice data={currentQuestion} />
    ));
  const handlePlayerReady = (player) => {
    player.controlBar.progressControl.disable();
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

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
          <VideoJS
            options={videoJsOptions}
            onReady={handlePlayerReady}
            onTimeUpdate={onTimeUpdate}
          />

          <div className="my-4 d-flex justify-content-between">
            <h2>Question or Explain:</h2>
            <div>
              <span>Author: {detailVideo.user.name}</span>
              {isFollow ? (
                <img
                  onClick={handleUnFollow}
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                  width={50}
                  src="/assets/image/ic_unfollow.png"
                  alt="unfollow"
                />
              ) : (
                <img
                  onClick={handleFollow}
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                  width={50}
                  src="/assets/image/ic_follow.png"
                  alt="follow"
                />
              )}
            </div>
          </div>
          <div className={styles.listQuestions}>{renderQuestion}</div>
          {trueAnswer && <div className="mt-3">Answer: {trueAnswer}</div>}
          <Feedback detailVideo={detailVideo} isFeedback={isFeedback} />
        </div>
        <div style={{ width: "25%" }}>
          <VideoEvents detailVideo={detailVideo} />
        </div>
      </div>
    </div>
  );
}
