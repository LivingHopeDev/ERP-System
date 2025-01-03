"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileSchema = void 0;
const zod_1 = require("zod");
exports.ProfileSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string(),
    department: zod_1.z.string(),
    joiningDate: zod_1.z.string(),
});
