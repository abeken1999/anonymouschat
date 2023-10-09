import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserNameInputPage from "./pages/UserNameInputPage";
import ChatPage from "./pages/ChatPage";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={UserNameInputPage} />
        <Route path="/chat" component={ChatPage} />
      </Switch>
    </Router>
  );
};

export default App;
