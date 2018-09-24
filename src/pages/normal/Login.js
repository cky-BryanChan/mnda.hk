import React, { Component } from "react";
import { Input, Button, Icon, Alert, Form } from "antd";
import "./Login.css";
import { withRouter } from "react-router";
import firebase from "firebase";
import logo from "../../asset/logo.jpg";

class Login extends Component {
  state = {
    token: null,
    email: "",
    password: "",
    loading: false
  };

  emitEmpty = () => {
    this.emailInput.focus();
    this.setState({ email: "" });
  };

  emitEmptyPassword = () => {
    this.passwordInput.focus();
    this.setState({ password: "" });
  };

  onChangeEmail = e => {
    this.setState({ email: e.target.value });
  };

  onChangePassword = e => {
    this.setState({ password: e.target.value });
  };

  onClose = () => {
    this.setState({ error: null });
  };

  renderError = () => {
    const { error } = this.state;
    if (!error) {
      return null;
    } else {
      var description = error;
    }

    return (
      <Alert
        message="Login Failed"
        description={description}
        type="error"
        closable
        onClose={this.onClose}
      />
    );
  };

  handleLogin = e => {
    e && e.preventDefault();
    const { email, password } = this.state;
    this.setState({ loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.history.push("/admin");
      })
      .catch(e => {
        this.setState({ error: e.message, loading: false });
      });
  };

  render() {
    const { email, password, loading } = this.state;
    const suffix = email ? (
      <Icon type="close-circle" onClick={this.emitEmpty} />
    ) : null;

    const suffix_ = password ? (
      <Icon type="close-circle" onClick={this.emitEmptyPassword} />
    ) : null;

    return (
      <div className="login-container">
        <img src={logo} className="login-logo" alt="logo" />
        <div className="login-text-input-wrapper">
          {this.renderError()}
          <Form onSubmit={this.handleLogin}>
            <Input
              placeholder="Enter your email"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              suffix={suffix}
              value={email}
              onChange={this.onChangeEmail}
              ref={node => (this.emailInput = node)}
              style={{ marginTop: "20px" }}
            />

            <Input
              placeholder="Enter your password"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              suffix={suffix_}
              value={password}
              onChange={this.onChangePassword}
              ref={node => (this.passwordInput = node)}
              type="password"
              style={{ marginTop: "20px" }}
            />

            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "20px", width: '100%' }}
              onClick={this.handleLogin}
              loading={loading}
              className="login-form-button"
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
