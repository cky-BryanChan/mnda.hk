import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Context, Admin, Login } from "./pages";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import { MenuBar } from "./components";
import "../node_modules/antd/dist/antd.css";
import firebase from "firebase";

import { getAll } from "./firebaseFuncs";

/**
 * Components
 */
import { FullPageLoader, FullPageMessage } from "./components";

//keys
const firebase_api_key = process.env.REACT_APP_FIREBASE_API_KEY;
const firebase_auth_domain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const firebase_base_url = process.env.REACT_APP_FIREBASE_BASE_URL;
const firebase_project_id = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const firebase_storage_bucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
const firebase_messaging_sender_id =
  process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;

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
  }
];

const RenderPages = (component, type) => {
  return (
    <div>
      {!type && <MenuBar />}
      {component}
    </div>
  );
};

class App extends Component {
  state = {
    data: null,
    loading: true
  };

  componentWillMount() {
    var config = {
      apiKey: firebase_api_key,
      authDomain: firebase_auth_domain,
      databaseURL: firebase_base_url,
      projectId: firebase_project_id,
      storageBucket: firebase_storage_bucket,
      messagingSenderId: firebase_messaging_sender_id
    };
    firebase.initializeApp(config);
  }

  componentDidMount() {
    getAll()
      .then(snapShot => {
        this.setState({ data: snapShot.val(), loading: false });
      })
      .catch(e => {
        console.log(e.message);
      });
  }

  render() {
    const { loading, data } = this.state;
    if (loading) return <FullPageLoader />;
    if (!data) {
      return <FullPageMessage msg="伺服器錯誤，請嘗試 Refresh 網頁" />;
    }

    return (
      <div className="App">
        <Switch>
          <Route
            path="/about"
            render={() => RenderPages(<Context data={data[options[0].key]} />)}
          />
          <Route
            path="/member"
            render={() => RenderPages(<Context data={data[options[1].key]} />)}
          />
          <Route
            path="/adjust"
            render={() => RenderPages(<Context data={data[options[2].key]} />)}
          />
          <Route
            path="/lesson"
            render={() => RenderPages(<Context data={data[options[3].key]} />)}
          />
          <Route
            path="/news"
            render={() => RenderPages(<Context data={data[options[4].key]} />)}
          />
          <Route
            path="/contact"
            render={() => RenderPages(<Context data={data[options[5].key]} />)}
          />
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
          <Route
            path="/"
            render={() => RenderPages(<Context data={data[options[0].key]} />)}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
