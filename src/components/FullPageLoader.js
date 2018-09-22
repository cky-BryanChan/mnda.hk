import React from "react";
import { Spin } from "antd";
import "./FullPageLoader.css";

const FullPageLoader = () => {
  return (
    <div className="fullpage-loader">
      <Spin size="large" tip="Loading..." />
    </div>
  );
};

export default FullPageLoader;
