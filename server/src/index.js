"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const consoleLogTerminal_1 = require("./common/consoleLogTerminal");
const AuthRoutes_1 = require("./routes/auth/AuthRoutes");
const UserRoutes_1 = require("./routes/users/UserRoutes");
const EventRoutes_1 = require("./routes/events/EventRoutes");
const TrailRoutes_1 = require("./routes/trails/TrailRoutes");
const consoleLogEndpoints_1 = require("./common/consoleLogEndpoints");
const APP = (0, express_1.default)();
const DEFAULT_PORT = 4201;
dotenv_1.default.config();
APP.use(express_1.default.json());
APP.use(express_1.default.urlencoded({ extended: false }));
APP.use((0, cors_1.default)());
// Server log middleware
APP.use((req, res, next) => {
    (0, consoleLogEndpoints_1.consoleLogEndpoints)(req.body, req.originalUrl, req.method);
    next();
});
APP.use('/auth', AuthRoutes_1.ROUTER);
APP.use('/users', UserRoutes_1.ROUTER);
APP.use('/events', EventRoutes_1.ROUTER);
APP.use('/trails', TrailRoutes_1.ROUTER);
APP.get('/', (req, res) => {
    res.status(200).json({
        response: 'You have found my API!'
    });
});
/*
  ::: 404 on any bad routes
*/
APP.get('/*', (req, res) => {
    res.status(404).json({ error: 'page not found' });
});
/*
  ::: Connect to database
*/
mongoose_1.default
    .connect(process.env.DATABASE_ACCESS || '')
    .then(() => {
    console.log('Database connection established');
})
    .catch((err) => {
    (0, consoleLogTerminal_1.returnErrorOnTerminal)(err.message);
});
/*
  ::: Run server
    - Default to port 4200
*/
APP.listen(process.env.PORT || DEFAULT_PORT, function () {
    const activePort = this.address().port;
    console.log(`Server is live on port ${activePort}`);
    if (activePort === DEFAULT_PORT) {
        (0, consoleLogTerminal_1.returnErrorOnTerminal)('Default port in use... check settings');
    }
});
