import { HttpClient } from "@microsoft/sp-http";

export interface IWorldNewsProps {
  description: string;
  apiURL: string;
  noOfNews: number;
  myhttpclient: HttpClient;
}
