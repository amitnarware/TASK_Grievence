// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Grievance System API',
            version: '1.0.0',
            description: 'API documentation for Grievance System',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Update with your server URL
                description: 'Development Server',
            },
        ],
    },
    apis: ["./swagger.js"]
    
};
//  http://localhost:3000/api-docs/#/

const swaggerSpec = swaggerJSDoc(options);
                        //   USERS SWAGGER DOCUMENTATION
/**
 * @swagger
 * components:
 *   schemas:
 *     grievance_system:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         status:
 *           type: string
 *           enum: ['employee', 'HR']
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Used to update new users information
 *     description: This API is used to insert data into the MySQL database (users table)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/grievance_system'
 *     responses:
 *       200:
 *         description: Added successfully
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Used to login existing users
 *     description: This API is used to log in to the MySQL database (users table)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/grievance_system'
 *     responses:
 *       200:
 *         description: Login successful
 */
    
                             //   GRIVANCE SYSTEM DOCUMENTATION
/**
 * @swagger
 * components:
 *   schemas:
 *     grievance_system:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         employee_id:
 *           type: integer
 *         description:
 *           type: text
 *         status:
 *           type: string
 *           enum: ['open', 'in-progress', 'resolved']
 *         timestamp:
 *           type: timestamp
 *         resolution_deadline:
 *           type: timestamp
 */

/**
 * @swagger
 * /api/create:
 *   post:
 *     summary: Used to create grievance on portal
 *     description: This API is used to insert data into the MySQL database (grievance table)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/grievance_system'
 *     responses:
 *       200:
 *         description: Added successfully
 */

/**
 * @swagger
 * /api/view:
 *   get:
 *     summary: Retrieve information about grievance from the database
 *     description: This API is used to retrieve all the information about grievances.
 *     responses:
 *       200:
 *         description: To test GET method
 */

/**
 * @swagger
 * /api/updatestatus/{id}:
 *   put:
 *     summary: Update status about grievance with the help of ID
 *     description: This API is used to update data in the MySQL database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID is required
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/grievance_system'
 *     responses:
 *       200:
 *         description: Updated successfully
 */

                      //  Chat Messages

/**
 * @swagger
 * components:
 *   schemas:
 *     chat_message:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         grievance_id:
 *           type: integer
 *         sender_id:
 *           type: integer
 *         message:
 *           type: text
 */

/**
 * @swagger
 * /api/sendMessage:
 *   post:
 *     summary: Send a message for a grievance
 *     description: This API is used to send a message related to a grievance
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/grievance_system'
 *     responses:
 *       200:
 *         description: Message sent successfully
 */

/**
 * @swagger
 * /api/retrieveMessages:
 *   get:
 *     summary: Retrieve messages for a grievance
 *     description: This API is used to retrieve all messages related to a grievance
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
 */

module.exports = { swaggerSpec, swaggerUi };

