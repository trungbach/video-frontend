import React, { useEffect } from "react";
import { Input, Rate, Button, message, Divider } from "antd";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { feedbackVideo, updateFeedbackVideo } from "@/features/video";
import { accountSelector } from "@/features/account";
const { TextArea } = Input;
export default function Feedback({ detailVideo, isFeedback }) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(accountSelector);
  const [rate, setRate] = React.useState(1);
  const [comment, setComment] = React.useState("");
  const [feedbackId, setFeedbackId] = React.useState();
  const [myFeedback, setMyFeedback] = React.useState();

  useEffect(() => {
    if (isFeedback && user) {
      const myFeedback = detailVideo.feedbacks.find((item) => item.ownerId === user.id);
      setComment(myFeedback.comment);
      setFeedbackId(myFeedback.id);
      setMyFeedback(myFeedback);
    }
  }, [isFeedback, user]);

  const handleSubmit = () => {
    if (comment.trim() === "") {
      message.warn("Comment cannot empty!");
    } else {
      if (isFeedback) {
        dispatch(
          updateFeedbackVideo({
            id: feedbackId,
            videoId: detailVideo.id,
            rate,
            comment,
          })
        );
        setMyFeedback({
          id: feedbackId,
          videoId: detailVideo.id,
          rate,
          comment,
        });
      } else {
        dispatch(
          feedbackVideo({
            videoId: detailVideo.id,
            rate,
            comment,
          })
        );
      }
    }
  };

  const renderFeedback =
    detailVideo.feedbacks.length > 0 &&
    detailVideo.feedbacks.map((item, index) => {
      console.log("item", item);
      console.log("user", user);
      return (
        <>
          <div className="my-2" key={index}>
            <Rate value={item.rate} readonly />
            <div className="my-3">
              <span className="me-3">
                {item.ownerId === user?.id ? user?.name : item.user?.name}:
              </span>
              {item.comment}
            </div>
          </div>
          <Divider style={{ borderTop: "1px solid rgb(255 255 255 / 6%)" }} />
        </>
      );
    });

  return (
    <div className="mt-5">
      <h3>Feedbacks: </h3>

      {/* List feedback */}
      <div className="my-3">{renderFeedback}</div>

      <h3>Your feedback</h3>
      <Rate
        defaultValue={myFeedback && myFeedback.rate}
        value={rate}
        onChange={(value) => setRate(value)}
      />
      <div className="my-3">
        <TextArea
          value={comment}
          placeholder="Type your comment..."
          rows={4}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div style={{ textAlign: "right" }}>
        <Button onClick={handleSubmit}>{isFeedback ? "Update" : "Send"}</Button>
      </div>
    </div>
  );
}
