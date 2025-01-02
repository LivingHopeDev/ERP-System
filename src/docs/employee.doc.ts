export const addEmployee = `
/**
 * @swagger
 * /employee:
 *   post:
 *     summary: Add a new employee to the system
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               role:
 *                 type: string
 *                 example: "Manager"
 *               salary:
 *                 type: number
 *                 example: 60000
 *               department:
 *                 type: string
 *                 example: "Human Resources"
 *               joiningDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-01-15"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *     responses:
 *       201:
 *         description: Employee successfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Employee added successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     employee:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "12345"
 *                         name:
 *                           type: string
 *                           example: "John Doe"
 *                         salary:
 *                           type: number
 *                           example: 60000
 *                         department:
 *                           type: string
 *                           example: "Human Resources"
 *                         joiningDate:
 *                           type: string
 *                           format: date
 *                           example: "2023-01-15"
 *                         email:
 *                           type: string
 *                           format: email
 *                           example: "johndoe@example.com"
 *                     user:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           format: email
 *                           example: "johndoe@example.com"
 *                         role:
 *                           type: string
 *                           example: "Manager"
 *       409:
 *         description: Conflict - Email already exists
 *       400:
 *         description: Bad request, invalid input data
 *       500:
 *         description: Some server error
 */
`;

export const getAllEmployees = `
/**
 * @swagger
 * /employee:
 *   get:
 *     summary: Retrieve all employees with pagination
 *     tags: [Employee]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number to retrieve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The number of records per page
 *     responses:
 *       200:
 *         description: List of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Employee records"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "12345"
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       salary:
 *                         type: number
 *                         example: 60000
 *                       department:
 *                         type: string
 *                         example: "Human Resources"
 *                       joiningDate:
 *                         type: string
 *                         format: date
 *                         example: "2023-01-15"
 *                       email:
 *                         type: string
 *                         format: email
 *                         example: "johndoe@example.com"
 *                       user:
 *                         type: object
 *                         properties:
 *                           email:
 *                             type: string
 *                             format: email
 *                             example: "johndoe@example.com"
 *                           role:
 *                             type: string
 *                             example: "Manager"
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *       404:
 *         description: No employees found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No employee has been added"
 *                 data:
 *                   type: array
 *                   items: {}
 *                 totalPages:
 *                   type: integer
 *                   example: 0
 *       400:
 *         description: Bad request, invalid query parameters
 *       500:
 *         description: Some server error
 */
`;

export const updateEmployee = `
/**
 * @swagger
 * /employee/{id}:
 *   patch:
 *     summary: Update an existing employee's details
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "12345"
 *         description: The ID of the employee to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               salary:
 *                 type: number
 *                 example: 70000
 *               department:
 *                 type: string
 *                 example: "Finance"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               role:
 *                 type: string
 *                 example: "Manager"
 *     responses:
 *       200:
 *         description: Employee record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Record updated"
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       400:
 *         description: Bad request, invalid input data
 *       500:
 *         description: Some server error
 */
`;
export const deleteEmployee = `
/**
 * @swagger
 * /employee/{id}:
 *   delete:
 *     summary: Delete an employee record
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "12345"
 *         description: The ID of the employee to delete
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Employee deleted successfully"
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       400:
 *         description: Bad request, invalid input data
 *       500:
 *         description: Some server error
 */
`;
