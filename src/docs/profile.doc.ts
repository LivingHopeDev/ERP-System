export const viewProfile = `
/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Retrieve the user's profile information
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "johndoe@example.com"
 *                     role:
 *                       type: string
 *                       example: "Manager"
 *                     employee:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "67890"
 *                         name:
 *                           type: string
 *                           example: "John Doe"
 *                         department:
 *                           type: string
 *                           example: "Finance"
 *                         salary:
 *                           type: number
 *                           example: 70000
 *                         joiningDate:
 *                           type: string
 *                           format: date
 *                           example: "2023-01-15"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Some server error
 */
`;
export const updateProfile = `
/**
 * @swagger
 * /profile:
 *   patch:
 *     summary: Update the user's profile information
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
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
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@newemail.com"
 *               department:
 *                 type: string
 *                 example: "HR"
 *               joiningDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-01-15"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile updated"
 *       404:
 *         description: User not found
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
