import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input, Button, Icon, Upload, message, notification } from "antd";

import "./Template.css";

const errorNotification = message => {
  notification.error({
    message: "錯誤",
    description: message
  });
};

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("請上傳 size < 2MB 的圖片");
  }
  return isLt2M;
}

class Template extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: props.editMode ? "edit" : "view",
      txt: props.txt || "",
      title: props.title || "",
      imageUrl: props.imageUrl || "",
      imageLoading: false,
      imageFile: null,
      docName: props.docName || "",
      docFile: null,
      docLinkTxt: props.docLinkTxt || "",
      wrongFormat: false,
      link: props.link || "",
      linkTxt: props.linkTxt || ""
    };
  }

  emptyTitle = () => {
    this.titleInput.focus();
    this.setState({ title: "" });
  };

  emptyDocLinkTxt = () => {
    this.docLinkTxtInput.focus();
    this.setState({ docLinkTxt: "" });
  };

  emptyLinkTxt = () => {
    this.linkTxtInput.focus();
    this.setState({ linktxt: "" });
  };

  emptyLink = () => {
    this.linkInput.focus();
    this.setState({ link: "" });
  };

  renderTitle = () => {
    const { mode, title } = this.state;
    if (mode === "view") {
      return (
        <div className="template-title">
          <label>標題</label>
          <h1>{title || <i>無</i>}</h1>
        </div>
      );
    }

    const suffix = title ? (
      <Icon type="close-circle" onClick={this.emptyTitle} />
    ) : null;

    return (
      <div className="template-title">
        <label>標題</label>
        <Input
          placeholder="請輸入標題"
          suffix={suffix}
          value={title}
          onChange={e => this.setState({ title: e.target.value })}
          ref={node => (this.titleInput = node)}
          style={{ width: "250px" }}
        />
      </div>
    );
  };

  renderContent = () => {
    const { mode, txt } = this.state;
    const { TextArea } = Input;

    if (mode === "view") {
      return (
        <div className="template-txt">
          <label>內容</label>
          <p>{txt || <i>無</i>}</p>
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

  handleImageUpload = info => {
    if (info.file.status === "uploading") {
      this.setState({ imageLoading: true });
      return;
    }
    if (info.file.status === "done" || info.file.status === "error") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          imageLoading: false,
          imageFile: info.file.originFileObj
        })
      );
    }
  };

  handleRemoveImg = () => {
    this.setState({ imageFile: null, imageUrl: null });
  };

  renderPhoto = () => {
    var { imageUrl, mode } = this.state;
    if (mode === "view") {
      return (
        <div className="template-img">
          <label>圖片</label>
          {imageUrl ? (
            <img src={imageUrl} alt={imageUrl} />
          ) : (
            <h1>
              <i>無</i>
            </h1>
          )}
        </div>
      );
    } else {
      return (
        <div className="template-img">
          <label>圖片</label>
          {imageUrl ? (
            <img src={imageUrl} alt={imageUrl} />
          ) : (
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={this.handleImageUpload}
            >
              <div>
                <Icon type={this.state.imageLoading ? "loading" : "upload"} />
                <div className="ant-upload-text">Upload</div>
              </div>
            </Upload>
          )}
          {imageUrl && (
            <Button
              type="danger"
              onClick={this.handleRemoveImg}
              style={{ marginTop: "20px" }}
            >
              移除圖片 <Icon type="delete" theme="outlined" />
            </Button>
          )}
        </div>
      );
    }
  };

  handleRemovePDF = () => {
    this.setState({ docFile: null, docName: "", docLinkTxt: "" });
  };

  beforeUploadPDF = file => {
    const isPDF = file.type === "application/pdf";
    if (!isPDF) {
      message.error("請上傳 PDF 文檔!");
      this.setState({ wrongFormat: true });
    } else {
      this.setState({ wrongFormat: false });
    }
    return isPDF;
  };

  handleUploadPDF = info => {
    if (info.file.status === "uploading") {
      this.setState({ pdfLoading: true });
      return;
    }
    if (info.file.status === "done" || info.file.status === "error") {
      if (!this.state.wrongFormat) {
        this.setState({
          docFile: info.file.originFileObj,
          pdfLoading: false,
          docName: info.file.name,
          wrongFormat: false
        });
      }
    }
  };

  renderDocument = () => {
    var { docName, mode, docLinkTxt, pdfLoading } = this.state;
    const suffix = docLinkTxt ? (
      <Icon type="close-circle" onClick={this.emptyDocLinkTxt} />
    ) : null;

    if (mode === "view") {
      return (
        <div className="template-img">
          <label>PDF 文件</label>
          {docName ? (
            <div>
              <p>{docLinkTxt || <i>無</i>}</p>
              <div className="template-filename">
                <Icon type="paper-clip" theme="outlined" />
                {docName}
              </div>
            </div>
          ) : (
            <h1>
              <i>無</i>
            </h1>
          )}
        </div>
      );
    } else {
      return (
        <div className="template-img">
          <label>PDF 文件</label>
          {docName ? (
            <div>
              <Input
                placeholder="請輸入連結文字"
                suffix={suffix}
                value={docLinkTxt}
                onChange={e => this.setState({ docLinkTxt: e.target.value })}
                ref={node => (this.docLinkTxtInput = node)}
                style={{ width: "250px" }}
              />
              <div className="template-filename">
                <Icon type="paper-clip" theme="outlined" />
                {docName}
              </div>
            </div>
          ) : (
            <Upload
              name="file"
              showUploadList={false}
              beforeUpload={this.beforeUploadPDF}
              onChange={this.handleUploadPDF}
            >
              <Button>
                <Icon type={pdfLoading ? "loading" : "upload"} /> 上載PDF
              </Button>
            </Upload>
          )}
          {docName && (
            <Button
              type="danger"
              onClick={this.handleRemovePDF}
              style={{ marginTop: "20px" }}
            >
              移除PDF <Icon type={"delete"} theme="outlined" />
            </Button>
          )}
        </div>
      );
    }
  };

  renderLink = () => {
    const { mode, link, linkTxt } = this.state;
    if (mode === "view") {
      return (
        <div className="template-link">
          <label>Link</label>
          <p>{linkTxt || <i>無</i>}</p>
          <p>{link || <i>無</i>}</p>
        </div>
      );
    }

    const suffix = linkTxt ? (
      <Icon type="close-circle" onClick={this.emptyLinkTxt} />
    ) : null;

    const suffix_ = link ? (
      <Icon type="close-circle" onClick={this.emptyLink} />
    ) : null;

    return (
      <div className="template-link">
        <label>Link</label>
        <Input
          placeholder="請輸入文字"
          suffix={suffix}
          value={linkTxt}
          onChange={e => this.setState({ linkTxt: e.target.value })}
          ref={node => (this.linkTxtInput = node)}
          style={{ width: "250px" }}
        />
        <br />
        <Input
          placeholder="請輸入網址"
          suffix={suffix_}
          value={link}
          onChange={e => this.setState({ link: e.target.value })}
          ref={node => (this.linkInput = node)}
          style={{ width: "250px", marginTop: "20px" }}
        />
      </div>
    );
  };

  handleSave = () => {
    const { onSave = () => {} } = this.props;
    const {
      txt,
      title,
      imageUrl,
      imageFile,
      docName,
      docFile,
      docLinkTxt,
      link,
      linkTxt
    } = this.state;
    if (docFile && !docLinkTxt) {
      errorNotification("請輸入 PDF 連結文字");
      return;
    }
    onSave({
      txt,
      title,
      imageUrl,
      imageFile,
      docName,
      docFile,
      docLinkTxt,
      link,
      linkTxt
    });
    this.setState({ mode: "view" });
  };

  renderToggleBtn = () => {
    const {
      txt,
      title,
      imageUrl,
      editMode,
      onRemove,
      saving,
      docName,
      docLinkTxt
    } = this.props;
    const {
      mode,
      txt: newTxt,
      title: newTitle,
      imageUrl: newImageUrl,
      docName: newDocName,
      docLinkTxt: newDocLinkTxt
    } = this.state;
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
          title: isView ? newTitle : title,
          imageUrl: isView ? newImageUrl : imageUrl,
          docName: isView ? newDocName : docName,
          docLinkTxt: isView ? newDocLinkTxt : docLinkTxt
        });
    }

    //right btn
    const type2 = !isView ? "primary" : "danger";
    const btnTxt2 = !isView ? "保存" : "移除";
    const btnFunc2 = !isView ? this.handleSave : () => onRemove();

    const loading = !isView ? saving : false;

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
          loading={loading}
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
        {this.renderPhoto()}
        {this.renderDocument()}
        {this.renderLink()}
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
