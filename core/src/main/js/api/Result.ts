export enum ResultStatus {
    Success,
    Error
}

export type Result<T> = {
    status: ResultStatus,
    payload?: T
};
