import { HopsCategory } from "./domain/Hops";
import { RouterState } from "react-router-redux";

export enum ResourceStatus {
    Empty,
    Loading,
    Success,
    Error
}

export type Resource<T> = {
    status: ResourceStatus,
    data?: T[],
    errors?: string[]
};

const createEmptyResource = <T>(): Resource<T> => ({status: ResourceStatus.Empty});

export type ResourceState = {
    hopsCategories: Resource<HopsCategory>
};

export const initialResourceState: ResourceState = {
    hopsCategories: createEmptyResource<HopsCategory>()
};

export type ReduxState = {
    router: RouterState,
    resource: ResourceState
};
