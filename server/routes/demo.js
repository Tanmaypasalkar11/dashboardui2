import { demoResponse } from "../../shared/api.js";

export const handleDemo = (_req, res) => {
  res.status(200).json(demoResponse);
};
