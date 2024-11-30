import { Router } from "express";
import v1 from "./version/v1/v1.js";

const Api = Router();

Api.use("/v1", v1);


export default Api;
