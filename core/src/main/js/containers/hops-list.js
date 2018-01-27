// @flow

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectUser } from "../actions/index";

import _ from "lodash";

type Props = {
  selectUser: (a: any) => void,
  users: any[]
};

type State = {};

class UserList extends Component<Props, State> {
  props: Props;
  renderList() {
    const { users } = this.props;
    return _.map(users, user => (
      <li key={user.id} onClick={() => this.props.selectUser(user)}>
        {user.first} {user.last}
      </li>
    ));
  }

  render() {
    return <ul>{this.renderList()}</ul>;
  }
}

// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
  return {
    users: state.users
  };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ selectUser: selectUser }, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(UserList);
