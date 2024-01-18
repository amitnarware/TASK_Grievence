// routes/grievanceRoutes.js
const express = require('express');
const grievance_router = express.Router();
const{postGrievance,getGrievances,putGrievanceStatus}  = require('../controller/grievanceController');

grievance_router.post('/create',postGrievance );
grievance_router.get('/view', getGrievances);
grievance_router.put('/updateStatus',putGrievanceStatus);

module.exports = {grievance_router};
