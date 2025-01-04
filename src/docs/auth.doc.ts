export const registerUser = `
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "example@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "SecurePassword123"
 *     responses:
 *       201:
 *         description: The user was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "User Created Successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1a2b3c4d5e"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "example@example.com"
 *       409:
 *         description: Conflict - User already exists
 *       400:
 *         description: Bad request, invalid input data
 *       500:
 *         description: Some server error
 */
`;

export const loginUser = `
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate a user and return an access token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Password123"
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Login Successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     user:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           format: email
 *                           example: "user@example.com"
 *                         role:
 *                           type: string
 *                           example: "user"
 *       404:
 *         description: Authentication failed, user not found or incorrect credentials
 *       400:
 *         description: Bad request, invalid input data
 *       500:
 *         description: Some server error
 */
`;

export const logoutUser = `
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: [] # Token required
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout successful"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Some server error
 */
`;
