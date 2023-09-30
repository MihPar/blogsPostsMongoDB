"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const utils_1 = require("../utils");
const expectAuthHead = "admin:qwerty";
const encodeData = Buffer.from(expectAuthHead).toString("base64");
const authMiddleware = function (req, res, next) {
    try {
        const auth = req.headers.authorization;
        if (!auth)
            return res.sendStatus(utils_1.HTTP_STATUS.NOT_AUTHORIZATION_401);
        const [authType, authPayLoad] = auth.split(" ");
        if (authType !== "Basic")
            return res.sendStatus(utils_1.HTTP_STATUS.NOT_AUTHORIZATION_401);
        if (authPayLoad !== encodeData)
            return res.sendStatus(utils_1.HTTP_STATUS.NOT_AUTHORIZATION_401);
        return next();
    }
    catch (err) {
        res.sendStatus(utils_1.HTTP_STATUS.NOT_WORK_SERVER_500);
    }
};
exports.authMiddleware = authMiddleware;
