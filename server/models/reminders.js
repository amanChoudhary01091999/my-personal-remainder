import mongoose from 'mongoose';

const remainderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    priority: { type: String, required: true },
    content: { type: String, required: true },
    startDate: { type: Number, required: true },
    endDate: { type: Number, required: true },
    isActive: { type: Boolean, required: true },
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Changed 'User' to lowercase for consistency
});

export default mongoose.model('Remainder', remainderSchema);  // Capitalized the model name for convention
