import { route } from "rwsdk/router";
import { Listings } from "./Listings";

export const routes = [
  route("/", Listings),
];
