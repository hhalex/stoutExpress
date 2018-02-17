import { HopsCategory } from "./domain/Hops";
import { genericLoadResourceAction } from "./resource-fetch";

export enum ActionType {
    FetchHops
}

type FetchHopsAction = {
    type: ActionType.FetchHops
};

export const loadHopsAction = genericLoadResourceAction<HopsCategory>(
    ActionType.FetchHops, "/api/hops/categories", x => x);

export type ReduxAction = FetchHopsAction;

