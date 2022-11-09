import apiUrl from "../api-url";
import queryAsset from "../queryAsset";
import { query2DSubjects } from "./queries";

export const getMateriasExternas = async () => {
  return queryAsset(query2DSubjects(), apiUrl.ComponenteExterno.get);
};
