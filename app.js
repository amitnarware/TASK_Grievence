// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { authenticateJWT } = require('./auth/authMiddleware');
const { swaggerSpec, swaggerUi } = require('./swagger');
const cors = require('cors');
//const userRoutes = require('./routes/userRoutes');
//const grievanceRoutes = require('./routes/grievanceRoutes');
//const chatRouter = require('./routes/chatRoutes');

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());


// Database Connection
const {connection} = require('./model/dbconfig');
  // user route
const {User_router} = require('./routes/userRoutes');
app.use('/api',User_router)
  //  Grievances route
  const {grievance_router} = require('./routes/grievanceRoutes');
  app.use('/api',grievance_router)
    // Chat route
const {chatRouter} = require('./routes/chatRoutes');
    app.use('/api',chatRouter) 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
