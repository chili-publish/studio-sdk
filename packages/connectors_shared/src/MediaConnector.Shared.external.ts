import { MediaT } from "../../connectors/src/MediaConnector";

export type MediaConnectorCapabilities = {
  query: boolean;
  detail: boolean;
  filtering: boolean;
};

export enum MediaType {
  file = 0,
  collection = 1,
}

export type Media = MediaT<MediaType>;

export interface MediaDetail extends Media {
  width?: number;
  height?: number;
}

export enum MediaDownloadIntent {
  web = "web",
  print = "print",
  animation = "animation",
}

export enum MediaDownloadType {
  thumbnail = "thumbnail",
  mediumres = "mediumres",
  fullres = "fullres",
  highres = "highres",
  original = "original",
}
