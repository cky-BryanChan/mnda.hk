import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input, Button, Icon } from "antd";

import "./Template.css";

class Template extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: props.editMode ? "edit" : "view",
      txt: props.txt || "",
      imageUrl: props.imageUrl || "",
      title: props.title || ""
    };
  }

  emptyTitle = () => {
    this.titleInput.focus();
    this.setState({ title: "" });
  };

  renderTitle = () => {
    const { mode, title } = this.state;
    if (mode === "view") {
      return (
        <div className="template-title">
          <label>標題</label>
          <h1>{title || "無"}</h1>
        </div>
      );
    }

    const suffix = title ? (
      <Icon type="close-circle" onClick={this.emptyTitle} />
    ) : null;

    return (
      <div className="template-title">
        <label>標題</label>
        <br />
        <Input
          placeholder="請輸入標題"
          suffix={suffix}
          value={title}
          onChange={e => this.setState({ title: e.target.value })}
          ref={node => (this.titleInput = node)}
          style={{ marginTop: "10px", width: "250px" }}
        />
      </div>
    );
  };

  renderContent = () => {
    const { mode, txt } = this.state;
    const { TextArea } = Input;

    // prevent js injection
    const parsed_txt = txt.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    if (mode === "view") {
      return (
        <div className="template-txt">
          <label>內容</label>
          <p>{parsed_txt || "無"}</p>
        </div>
      );
    } else {
      return (
        <div className="template-txt">
          <label>內容</label>
          <TextArea
            placeholder="請輸入內容"
            autosize
            value={txt}
            onChange={e => this.setState({ txt: e.target.value })}
          />
        </div>
      );
    }
  };

  renderToggleBtn = () => {
    const { txt, title, onSave = () => {}, editMode, onRemove } = this.props;
    const { mode, txt: newTxt, title: newTitle } = this.state;
    const isView = mode === "view";

    //left btn
    const type = !isView ? "dashed" : "default";
    const btnTxt = !isView ? "取消" : "編輯";
    if (editMode && !isView) {
      var btnFunc = onRemove;
    } else {
      btnFunc = () =>
        this.setState({
          mode: isView ? "edit" : "view",
          txt: isView ? newTxt : txt,
          title: isView ? newTitle : title
        });
    }

    //right btn
    const type2 = !isView ? "primary" : "danger";
    const btnTxt2 = !isView ? "保存" : "移除";
    const btnFunc2 = !isView
      ? () => {
          onSave({ txt: newTxt, title: newTitle });
          this.setState({ mode: "view" });
        }
      : () => onRemove();

    return (
      <div className="template-editBtn">
        <Button type={type} onClick={btnFunc}>
          {btnTxt}
        </Button>
        <Button
          ghost={isView ? true : undefined}
          type={type2}
          onClick={btnFunc2}
          style={{ marginLeft: "10px" }}
        >
          {btnTxt2}
        </Button>
      </div>
    );
  };

  render() {
    return (
      <div className="template-container">
        {this.renderTitle()}
        {this.renderContent()}
        {this.renderToggleBtn()}
      </div>
    );
  }
}

Template.propTypes = {
  title: PropTypes.string,
  txt: PropTypes.string,
  imageUrl: PropTypes.string,
  onSave: PropTypes.func
};

export default Template;
