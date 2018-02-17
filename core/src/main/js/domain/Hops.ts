export enum HopsKind {
    Bitter,
    Flavourish,
    Both
}

export type HopsCategory = {
    name: string,
    alpha: [number, number],
    kind: HopsKind
};
