import { Id } from "./CommonTypes";

export type Page = {
    pageId: Id;
    pageNumber: number;
    width?: number;
    height?: number;
};
