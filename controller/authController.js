// controllers/authController.js
const {connection} = require('../model/dbconfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = '1223'; 

exports.authenticateUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user with the given username exists
        const user = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);

        if (user.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user[0].password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // Generate a JWT token for authentication
        const token = jwt.sign({ id: user[0].id, username: user[0].username, role: user[0].role }, secretKey, { expiresIn: '1h' });

        res.json({ message: 'Authentication successful.', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.authorizeUser = (req, res) => {
    // Example of a route that requires authentication
    res.json({ message: 'Authorized user endpoint' });
};
