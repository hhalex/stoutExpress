import { ActionType, ReduxAction } from "./actions";
import { initialResourceState, ResourceState } from "./state";
import { genericResourceReducer } from "./resource-fetch";
import { HopsCategory } from "./domain/Hops";

export const resourceReducer = (state: ResourceState = initialResourceState, action: ReduxAction): ResourceState => {
    switch (action.type) {
        case ActionType.FetchHops:
            const updatedResource = genericResourceReducer<HopsCategory>(state.hopsCategories, action);
            return {
                ...state,
                hopsCategories: updatedResource
            }
        default:
            return {...state};
    }
};
