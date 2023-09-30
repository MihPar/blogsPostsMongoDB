import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../utils";

const expectAuthHead = "admin:qwerty";
const encodeData = Buffer.from(expectAuthHead).toString("base64");

export const authMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401);
    const [authType, authPayLoad] = auth.split(" ");
    if (authType !== "Basic")
      return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401);
    if (authPayLoad !== encodeData)
      return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401);
    return next();
  } catch (err) {
	res.sendStatus(HTTP_STATUS.NOT_WORK_SERVER_500)
  }
};
