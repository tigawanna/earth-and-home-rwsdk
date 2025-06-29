import { route } from "rwsdk/router";
import { PropertyDetails } from "./PropertyDetails";

export const routes = [
  route("/:id", PropertyDetails),
];
