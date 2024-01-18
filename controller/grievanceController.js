// controllers/grievanceController.js
const {connection} = require('../model/dbconfig');

let postGrievance = async (req, res) => {
    try {
        const { employee_id, description } = req.body;

        // Insert the new grievance into the database
        await connection.query('INSERT INTO grievances (employee_id, description) VALUES (?, ?)', [employee_id, description]);

        res.json({ message: 'Grievance created successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

let getGrievances = async (req, res) => {
    try {
        // Retrieve all grievances from the database
        const grievances = await connection.query('SELECT * FROM grievances');

        // Check if grievances is an array before using map
        const grievanceData = Array.isArray(grievances) ? grievances.map(grievance => ({ id: grievance.id, employee_id: grievance.employee_id, description: grievance.description, status: grievance.status })) : [];

        res.json({ grievances: grievanceData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



let putGrievanceStatus = async (req, res) => {
    try {
        const { grievance_id, status } = req.body;

        // Update the status of the specified grievance
        await connection.query('UPDATE grievances SET status = ? WHERE id = ?', [status, grievance_id]);

        res.json({ message: 'Grievance status updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
module.exports = {postGrievance,getGrievances,putGrievanceStatus}
