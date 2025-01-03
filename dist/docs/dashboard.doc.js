"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countEmployees = void 0;
exports.countEmployees = `
/**
 * @swagger
 * /dashboard/employees/count:
 *   get:
 *     summary: Get the total number of employees and the breakdown by department
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Employee count and department breakdown retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalEmployees:
 *                       type: number
 *                       example: 120
 *                     employeesPerDepartment:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           department:
 *                             type: string
 *                             example: "HR"
 *                           count:
 *                             type: number
 *                             example: 25
 *       500:
 *         description: Some server error
 */
`;
