import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

type Props = {
  users: any[]
};

type State = {};

class HopsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { users} = this.props;
    return (
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.first} {user.last}
          </li>
        ))}
      </ul>;
  }
}

export default HopsList;
