import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

type Props = {
  selectUser: (a: any) => void,
  users: any[]
};

type State = {};

class HopsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { users, selectUser } = this.props;
    return (
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => selectUser(user)}>
            {user.first} {user.last}
          </li>
        ))}
      </ul>;
  }
}

// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
const mapStateToProps = (state) => ({
    users: state.users
});

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
const matchDispatchToProps = (dispatch) =>
  bindActionCreators({ selectUser }, dispatch);

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(HopsList);
