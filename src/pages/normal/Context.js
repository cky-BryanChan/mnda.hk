import React from "react";
import PropTypes from "prop-types";

import "./Context.css";

const Context = props => {
  const { data } = props;
  if (!data) {
    var rows = <h2>暫無資料</h2>;
  } else {
    rows = data.map((obj, index) => {
      const { title, txt, imageUrl, docLinkTxt, pdfUrl, link, linkTxt } = obj;
      return (
        <div style={{ width: "100%" }} key={title + index}>
          {title && <h1 style={{ marginTop: "20px" }}>{title}</h1>}
          {imageUrl ? (
            <div className="context-txt-image-container">
              {txt && <p>{txt}</p>}
              {imageUrl && (
                <div className="context-image">
                  <img src={imageUrl} alt={imageUrl} />
                </div>
              )}
            </div>
          ) : (
            txt && <p>{txt}</p>
          )}
          {docLinkTxt && (
            <a href={pdfUrl} target="_blank">
              {docLinkTxt}
            </a>
          )}
          {linkTxt && (
            <a href={link} target="_blank">
              {linkTxt}
            </a>
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
