import mongoose from 'mongoose';

const passwordSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    resetToken: { type: String, unique: true },  // Field to store the reset token
    resetTokenExpiration: Date
});

export default mongoose.model('Password', passwordSchema); // Capitalize the model name conventionally
