"use strict";
// import fs from "fs";
// import path from "path";
Object.defineProperty(exports, "__esModule", { value: true });
// const logging = {};
// logging.log = (methodName, errMsg) => {
//   const date = new Date().toString();
//   const data = "\n=> Error in " + methodName + " >>> " + errMsg + " at " + date;
//   const milliseconds =
//     new Date().getDate() +
//     "-" +
//     parseInt(new Date().getMonth() + 1) +
//     "-" +
//     new Date().getFullYear();
//   const jsonPath = path.join(__dirname, "logs/");
//   fs.appendFile(jsonPath + milliseconds.toString(), data, function (err) {
//     // if (err) throw err;
//     console.log("Updated!");
//   });
// };
// module.exports = logging;
const winston_1 = require("winston");
const logger = (0, winston_1.createLogger)({
    transports: [
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.printf(({ timestamp, level, message, metadata }) => {
                return `[${timestamp}] ${level}: ${message}. ${JSON.stringify(metadata)}`;
            })),
        }),
        new winston_1.transports.File({
            dirname: "logs",
            filename: "files_app.log",
            format: winston_1.format.combine(winston_1.format.json()),
        }),
    ],
    format: winston_1.format.combine(winston_1.format.metadata(), winston_1.format.timestamp()),
});
exports.default = logger;
//# sourceMappingURL=logger.js.map