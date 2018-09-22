import React from "react";
import PropTypes from "prop-types";
import { Login, Admin } from "../index";

import "./Context.css";

const Context = props => {
  const { data, type } = props;
  if (type === "admin") return <Admin />;
  if (type === "login") return <Login />;
  if (!data) {
    var rows = <h2>暫無資料</h2>;
  } else {
    rows = data.map((obj, index) => {
      const { title, txt } = obj;
      return (
        <div style={{ width: "100%" }} key={title + index}>
          {title && <h1>{title}</h1>}
          {txt && <p>{txt}</p>}
        </div>
      );
    });
  }

  return <div className="context-container">{rows}</div>;
};

Context.propTypes = {
  data: PropTypes.array
};

export default Context;
