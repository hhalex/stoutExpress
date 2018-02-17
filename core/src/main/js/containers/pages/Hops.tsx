import { loadHopsAction, ReduxAction } from "../../actions";
import { Header } from "../../components/Header";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { ReduxState, Resource, ResourceStatus } from "../../state";
import styled from "styled-components";
import { HopsCategory } from "./domain/Hops";
import { WholeContainer, Body } from "../../components/Layout";

type DispatchProps = {
    fetchHopsCategories: () => void;
};

type TransferedState = {
    hopsCategories: Resource<HopsCategory>;
};

type Props = DispatchProps & TransferedState;

type State = {};

export class Hops extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        props.fetchHopsCategories();
    }

    public render() {
        const {hopsCategories} = this.props;
        return (
            <WholeContainer>
                <Header />
                <Body>
                    {hopsCategories.status === ResourceStatus.Success 
                        ? <ul>{
                            hopsCategories.data.map((c, i) => <li key={i}>{c.name}</li>)
                        }</ul>
                        : <div>No categories found</div>
                    }
                </Body>
            </WholeContainer>
        );
    }
}

export default connect((state: ReduxState): TransferedState => ({
    hopsCategories: state.resource.hopsCategories
}), (dispatch: Dispatch<ReduxAction>): DispatchProps => ({
    fetchHopsCategories: () => loadHopsAction(dispatch)
}))(Hops);
