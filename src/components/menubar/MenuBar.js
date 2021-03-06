import React, { Component } from "react";
import "./MenuBar.css";
import { withRouter } from "react-router";
import { Menu } from "antd";
import HamburgerBtn from "../HamburgerBtn";
import headerImg from './header.jpg';

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
    txt: "調解／談判資訊"
  },
  {
    key: "lesson",
    txt: "培訓課程／講座"
  },
  {
    key: "news",
    txt: "最新消息"
  },
  {
    key: "contact",
    txt: "聯絡我們"
  }
];

class MenuBar extends Component {
  state = {
    expanded: false
  };

  handleClick = obj => {
    const { key } = obj;
    this.props.history.push(`/${key}`);
  };

  toggle = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  renderHambergerBtn = () => {
    const { expanded } = this.state;
    return (
      <HamburgerBtn
        expanded={expanded}
        onClick={this.toggle}
        onOutsideClick={() => this.setState({ expanded: false })}
      />
    );
  };

  renderMenu = mode => {
    const urlArray = window.location.href.split("/");
    const selected = urlArray[urlArray.length - 1] || options[0].key;
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[selected]}
        mode={mode}
        style={{
          padding: mode === "vertical" ? "0" : "0 10%",
          fontSize: mode === "vertical" ? "13px" : "18px"
        }}
        onOpenChange={this.toggle}
      >
        {options.map(obj => {
          return <Menu.Item key={obj.key}>{obj.txt}</Menu.Item>;
        })}
      </Menu>
    );
  };

  renderDropDown = () => {
    const urlArray = window.location.href.split("/");
    const selected = urlArray[urlArray.length - 1] || options[0].key;
    const { expanded } = this.state;
    return (
      <div className={`menubar-dropDownMenu ${expanded ? "expanded" : ""}`}>
        {options.map(obj => {
          const { txt, key } = obj;
          var cls = key === selected ? "selected" : "";
          return (
            <p key={key} className={cls} onClick={() => this.handleClick(obj)}>
              {txt}
            </p>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div className="menubar-container">
        <div className="menubar-bg-image">
          <img src={headerImg} alt="bg"/>
        </div>
        <div className="menu">{this.renderMenu("horizontal")}</div>
        <div className="menu-mobile">
          {this.renderHambergerBtn()}
          {this.renderDropDown()}
        </div>
      </div>
    );
  }
}

MenuBar.propTypes = {};

export default withRouter(MenuBar);
