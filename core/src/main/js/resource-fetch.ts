// This module is intended to contain all actions and reducers to generically fetch resources
import { Dispatch } from "redux";
import { ActionType, ReduxAction } from "./actions";
import { Resource, ResourceStatus } from "./state";

// Generic helpers for resource fetching
export enum ResourceFetchStatusAction {
    Fetch,
    Success,
    Error
}

export type ResourceFetchAction<DataType> = {
    type: ActionType,
    status: ResourceFetchStatusAction
    data?: DataType[],
    errors?: string[]
};

type GenericRequestActionCreators<DataType> = {
    fetchAction: () => ResourceFetchAction<DataType>,
    successAction: (data: DataType[]) => ResourceFetchAction<DataType>,
    errorAction: (data: string[]) => ResourceFetchAction<DataType>
};

const genericRequestActionGenerator = <DataType>(type: ActionType): GenericRequestActionCreators<DataType> => {
    const fetchAction = (): ResourceFetchAction<DataType> =>
        ({type, status: ResourceFetchStatusAction.Fetch});
    const successAction = (data: DataType[]): ResourceFetchAction<DataType> =>
        ({type, data, status: ResourceFetchStatusAction.Success});
    const errorAction = (errors: string[]): ResourceFetchAction<DataType> =>
        ({type, errors, status: ResourceFetchStatusAction.Error});
    return {
        errorAction, fetchAction, successAction
    };
};

export const genericResourceReducer = <DataType>(resource: Resource<DataType>, action: ResourceFetchAction<DataType>) => {
    switch (action.status) {
        case ResourceFetchStatusAction.Fetch:
            return {
                ...resource,
                status: ResourceStatus.Loading
            };
        case ResourceFetchStatusAction.Success:
            return {
                data: action.data,
                status: ResourceStatus.Success
            };
        case ResourceFetchStatusAction.Error:
            return {
                errors: action.errors,
                status: ResourceStatus.Error
            };
        default:
            throw new Error("Status Not Implemented for resource fetching");
    }
};

export const genericLoadResourceAction = <DataType>(type: ActionType, url: string, dataTransformer: (a: any) => DataType[]) => {

    const {fetchAction, successAction } = genericRequestActionGenerator<DataType>(type);

    return (dispatch: Dispatch<ReduxAction>) => {
        dispatch(fetchAction());
        fetch(url)
            .then(res => res.json())
            .then(res => dispatch(successAction(dataTransformer(res))));
    };
};