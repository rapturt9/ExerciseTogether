import React from "react";
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignOut,
} from "@aws-amplify/ui-react";
import useUserStatus from "./useUserStatus.js";
import Signin from "./Signin.js";
import Blog from "./blog/Blog";
import Dashboard from "./dashboard/Dashboard";
import { Route, useHistory, Redirect, Switch, useParams } from "react-router-dom";
import Video from "./Video";
import Solo from "./Solo";
import ChannelForm from "./components/ChannelForm";
import Call from "./components/Call";
import Youtube from "./components/Youtube";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as queries from './graphql/queries';
import awsmobile from './aws-exports';
// Simple query


//const allTodos = API.graphql(graphqlOperation(queries.listExerciseReals));
//console.log(allTodos);

// Query using a parameter

class App extends React.Component {
  state = { channel: "" };

  selectChannel = (channel) => {
    this.setState({ channel });
  };

  render() {
    if (this.state.channel) {
      console.log(this.state.channel);
      return <Redirect push to={`/video/${this.state.channel}`} />;
    }

    return (
      <div>
        <Route exact path="/">
          <Blog />
        </Route>
        <Helper selectChannel={this.selectChannel} channel={this.state.channel}/>
      </div>
    );
  }
}

function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();
  console.log("THEID", id);
  return (
    <Call channel={id} />
  );
}

const Helper = props => {
  const userStatus = useUserStatus();
  console.log(userStatus);
  if(userStatus){
    console.log(userStatus.attributes.email);
  }
  const isLoggedIn = null !== userStatus;
  let history = useHistory();
  if (isLoggedIn) {
    return <div>
      <Redirect from='/signin' to="/dashboard" />
      <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/youtube">
          <Youtube />
        </Route>
        <Route exact path="/solo">
          <Solo />
        </Route>
        <Switch>
          <Route exact path="/video">
          <ChannelForm selectChannel={props.selectChannel} />
          </Route>
          <Route
            path="/video/:id"
            children={<Child channel={props.channel} />}
          />
        </Switch>
    </div>
  } else {
    return (
    <div>
      <Redirect from='/dashboard' to="/" />
    <Route exact path="/signin">
    <Signin />
  </Route>
  </div>
    );
  }
};
export default App;
