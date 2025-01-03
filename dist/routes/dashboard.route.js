"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const dashboardRouter = (0, express_1.Router)();
exports.dashboardRouter = dashboardRouter;
dashboardRouter.get("/employees/count", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, dashboard_controller_1.countEmployees);
