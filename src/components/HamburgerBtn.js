import React, { Component } from "react";
import PropTypes from "prop-types";
import "./HamburgerBtn.css";

class HamburgerBtn extends Component {
  componentDidMount() {
    document.addEventListener("click", this.handleOutSideClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutSideClick);
  }

  handleOutSideClick = e => {
    if (this.hamburger && !this.hamburger.contains(e.target)) {
      this.props.onOutsideClick();
    }
  };

  render() {
    const { expanded = false, onClick = () => {} } = this.props;
    return (
      <div
        className={expanded ? "hamberger active" : "hamberger"}
        onClick={onClick}
        ref={node => (this.hamburger = node)}
      >
        <span />
        <span />
        <span />
        <span />
      </div>
    );
  }
}

HamburgerBtn.propTypes = {
  expanded: PropTypes.bool,
  onClick: PropTypes.func,
  onOutsideClick: PropTypes.func,
};

export default HamburgerBtn;
