// controllers/userController.js
const {connection} = require('../model/dbconfig');
const authenticateUser = require("./authController")
const authenticateJWT = require("../auth/authMiddleware")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const secretKey = '1223'; // Change this to a strong and secure secret key

let postregister = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Check if the user with the given username already exists
        const existingUser = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
        

        if (existingUser && existingUser.length > 0) {
            return res.status(400).json({ message: 'User with this username already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert the new user into the database
        await connection.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role]);

        res.json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

let postlogin = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Validate request body
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
      }
  
      // Check if the user with the given username exists
      const rows = [await connection.query('SELECT * FROM users WHERE username = ?', [username])];
  
      if (!rows || rows[0].length === 0) {
        return res.status(401).json({ message: 'Invalid username or password.' });
      }
  
      // Extract the user object from the array
      const user = rows[0][0];
  
      // Check if the user has a password before comparing
      if (!user || !user.password) {
        return res.status(401).json({ message: 'Invalid username or password.' });
      }
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password.' });
      }
  
      // Generate a JWT token for authentication
      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, secretKey, { expiresIn: '3h' });
  
      res.json({ message: 'Login successful.', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };



  module.exports = {postregister,postlogin}
/*  register: Handles user registration. Checks if the username already exists, hashes the password, and inserts the new user into the database.

login: Handles user login. Validates the username, compares the provided password with the hashed password in the database, and generates a JWT token for authentication.*/