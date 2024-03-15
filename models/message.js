const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
