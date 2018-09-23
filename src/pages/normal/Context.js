import React from "react";
import PropTypes from "prop-types";

import "./Context.css";

const Context = props => {
  const { data } = props;
  if (!data) {
    var rows = <h2>暫無資料</h2>;
  } else {
    rows = data.map((obj, index) => {
      const { title, txt, imageUrl } = obj;
      return (
        <div style={{ width: "100%" }} key={title + index}>
          {title && <h1>{title}</h1>}
          {imageUrl ? (
            <div className="context-txt-image">
              {txt && <p>{txt}</p>}
              {imageUrl && <img src={imageUrl} alt={imageUrl} />}
            </div>
          ) : (
            txt && <p>{txt}</p>
          )}
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
