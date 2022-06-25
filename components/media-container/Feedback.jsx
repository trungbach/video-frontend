import React from "react";
import { Input, Rate, Button, message, Divider } from "antd";
import { useAppDispatch } from "@/hooks/index";
import { feedbackVideo } from "@/features/video";
const { TextArea } = Input;
export default function Feedback({ detailVideo }) {
  const dispatch = useAppDispatch();
  const [rate, setRate] = React.useState(1);
  const [comment, setComment] = React.useState("");

  const handleSubmit = () => {
    if (comment.trim() === "") {
      message.warn("Comment cannot empty!");
    } else {
      dispatch(
        feedbackVideo({
          videoId: detailVideo.id,
          rate,
          comment,
        })
      );
    }
  };

  const renderFeedback =
    detailVideo.feedbacks.length > 0 &&
    detailVideo.feedbacks.map((item, index) => {
      return (
        <>
          <div className="my-2" key={index}>
            <Rate value={item.rate} readonly />
            <div className="my-3">
              {item.comment}
              {/* <Input style={{ background: "transparent", border }} readOnly rows={4} value={item.comment} /> */}
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
      <Rate value={rate} onChange={(value) => setRate(value)} />
      <div className="my-3">
        <TextArea
          placeholder="Type your comment..."
          rows={4}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div style={{ textAlign: "right" }}>
        <Button onClick={handleSubmit}>Send</Button>
      </div>
    </div>
  );
}
