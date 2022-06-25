import React from "react";
import { Spin } from "antd";

export default function LoadingComponent() {
  return (
    <div
      style={{ backgroundColor: "#2f3136" }}
      className="d-flex justify-content-center align-items-center h-100"
    >
      <Spin size="large" />
    </div>
  );
}
