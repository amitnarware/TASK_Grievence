// controllers/chatController.js
const {connection} = require('../model/dbconfig');

exports.sendMessage = async (req, res) => {
    try {
        const { grievance_id, sender_id, message } = req.body;

        // Insert the new message into the chat_messages table
        await connection.query('INSERT INTO chat_messages (grievance_id, sender_id, message) VALUES (?, ?, ?)', [grievance_id, sender_id, message]);

        res.json({ message: 'Message sent successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.retrieveMessages = async (req, res) => {
    try {
        const { grievance_id } = req.query;

        // Retrieve all messages for the specified grievance
        const messages = await connection.query('SELECT * FROM chat_messages WHERE grievance_id = ?', [grievance_id]);

        // Check if messages[0] exists before calling map
        if (messages[0]) {
            // Convert the circular structure to a plain JavaScript object
            const plainMessages = messages[0].map(message => message.toJSON());

            res.json({ messages: plainMessages });
        } else {
            res.json({ messages: [] }); // Return an empty array if no messages are found
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

