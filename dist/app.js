"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const method_override_1 = __importDefault(require("method-override"));
const dotenv_1 = require("dotenv");
const connection_1 = __importDefault(require("./config/connection"));
const index_1 = __importDefault(require("./routes/index"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
// log only 4xx and 5xx responses to console
app.use((0, morgan_1.default)("dev", {
    skip: function (req, res) {
        return res.statusCode < 400;
    },
}));
// log all requests to access.log
app.use((0, morgan_1.default)("common", {
    stream: fs_1.default.createWriteStream(path_1.default.join(__dirname, "access.log"), {
        flags: "a",
    }),
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, method_override_1.default)("X-HTTP-Method-Override"));
//DATABASE CONNECTION
app.use(connection_1.default);
app.use("/public", express_1.default.static("./public"));
//View Engine
app.set("views", path_1.default.join(__dirname, "/views"));
app.set("view engine", "ejs");
//ROUTES
app.use("/", index_1.default);
app.get("/", (req, res) => {
    res.send("Hello From Loan Application!");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    return console.info(`Server is listening at http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map