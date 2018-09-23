import React, { Component } from "react";
import firebase from "firebase";
import { withRouter } from "react-router";
import { Menu, Spin, Icon, Button, Modal } from "antd";
import "./Admin.css";

/**
 * Components
 */
import { Template } from "./index";
import { isArray } from "util";

/**
 * Firebase functions
 */
import { getAll, setRecord } from "../../firebaseFuncs";

const options = [
  {
    key: "about",
    txt: "關於我們"
  },
  {
    key: "member",
    txt: "會員"
  },
  {
    key: "adjust",
    txt: "有關調解"
  },
  {
    key: "lesson",
    txt: "培訓課程/講座"
  },
  {
    key: "news",
    txt: "最新消息"
  },
  {
    key: "contact",
    txt: "聯絡我們"
  },
  {
    key: "logout",
    txt: "登出"
  }
];

class Admin extends Component {
  state = {
    selected: options[0].key,
    data: null,
    loading: true,
    newTemplates: [],
    showModal: false,
    removeIndex: null,
    removing: false,
    saving: false
  };

  componentDidMount() {
    var user = firebase.auth().currentUser;
    if (!user) {
      this.props.history.push("/login");
    } else {
      getAll().then(res => {
        this.setState({ data: res.val(), loading: false });
      });
    }
  }

  handleClick = obj => {
    const { key } = obj;
    if (key === "logout") {
      firebase.auth().signOut();
      this.props.history.push("/");
    } else {
      this.setState({ selected: obj.key });
    }
  };

  renderMenu = mode => {
    const { selected } = this.state;
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: "100%", height: "100%", paddingTop: "10%" }}
        defaultSelectedKeys={[options[0].key]}
        selectedKeys={[selected]}
        mode={mode}
      >
        {options.map(obj => {
          const { key, txt } = obj;
          return (
            <Menu.Item
              key={key}
              style={key === "logout" && { color: "#ed5565" }}
            >
              {txt}
            </Menu.Item>
          );
        })}
      </Menu>
    );
  };

  firebaseSet = newData => {
    const { selected } = this.state;
    setRecord(selected, newData)
      .then(() => getAll())
      .then(spapShot =>
        this.setState({
          data: spapShot.val(),
          newTemplates: [],
          removeIndex: null,
          showModal: false,
          removing: false,
          saving: false
        })
      )
      .catch(e => console.log(e.message));
  };

  handleAddNew(obj) {
    this.setState({ saving: true });
    const { selected, data } = this.state;
    const currentData = data && data[selected];
    const newData = currentData ? currentData.concat([obj]) : [obj];
    this.firebaseSet(newData);
  }

  handleRemoveNew(index) {
    const { newTemplates } = this.state;
    const updatedTemplates = newTemplates.slice(1, index);
    this.setState({ newTemplates: updatedTemplates });
  }

  handleSave(index, obj) {
    this.setState({ saving: true });
    const { selected, data } = this.state;
    const currentData = data && data[selected];
    if (currentData) {
      var newData = JSON.parse(JSON.stringify(currentData));
      newData.splice(index, 1, obj);
    } else {
      newData = [obj];
    }
    this.firebaseSet(newData);
  }

  handleRemove = () => {
    this.setState({ removing: true });
    const { selected, data, removeIndex } = this.state;
    const currentData = data && data[selected];
    if (currentData) {
      var newData = JSON.parse(JSON.stringify(currentData));
      newData.splice(removeIndex, 1);
    } else {
      newData = [];
    }
    this.firebaseSet(newData);
  };

  addTemplate = () => {
    const { newTemplates, saving } = this.state;
    const length = newTemplates.length;
    const index = length ? length - 1 : 0;
    newTemplates.push(
      <Template
        key={index + "new"}
        editMode
        onSave={obj => this.handleAddNew(obj)}
        onRemove={() => this.handleRemoveNew(index)}
        saving={saving}
      />
    );
    this.setState({ newTemplates });
  };

  renderTemplates = () => {
    const { selected, data, newTemplates, saving } = this.state;
    const dateset = data && data[selected];
    if (isArray(dateset)) {
      var rows = dateset.map((obj, index) => {
        const { title, txt } = obj;
        return (
          <Template
            key={title + index}
            title={title}
            txt={txt}
            onSave={obj => this.handleSave(index, obj)}
            onRemove={() =>
              this.setState({ showModal: true, removeIndex: index })
            }
            saving={saving}
          />
        );
      });
    } else {
      rows = [];
    }
    rows = rows.concat(newTemplates);
    return (
      <div className="admin-templates-wrapper">
        <div className="admin-template-addBtn">
          <Button type="default" onClick={this.addTemplate}>
            新增
            <Icon type="plus" theme="outlined" />
          </Button>
        </div>
        {rows}
      </div>
    );
  };

  handleModalCancel = () => {
    this.setState({ showModal: false, removeIndex: null });
  };

  render() {
    const { loading, showModal, removing } = this.state;
    return (
      <div className="admin-container">
        <div className="admin-menu">{this.renderMenu("inline")}</div>
        <div className="admin-pannel">
          {loading ? (
            <div className="admin-spinner">
              <Spin size="large" tip="Loading..." />
            </div>
          ) : (
            this.renderTemplates()
          )}
        </div>
        <Modal
          visible={showModal}
          onOk={this.handleRemove}
          onCancel={this.handleModalCancel}
          footer={[
            <Button key="back" onClick={this.handleModalCancel}>
              取消
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={removing}
              onClick={this.handleRemove}
            >
              確認
            </Button>
          ]}
        >
          <p>確認移除？</p>
        </Modal>
      </div>
    );
  }
}

export default withRouter(Admin);
