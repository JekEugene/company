"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
app.use(express_1.default.static(__dirname));
app.use(express_1.default.json());
const PORT = process.env.PORT || 4000;
app.use(`/`, (req, res) => { res.redirect(303, `/videos`); });
async function start() {
    app.listen(PORT, () => {
        console.log(`server work`);
    });
}
start();
