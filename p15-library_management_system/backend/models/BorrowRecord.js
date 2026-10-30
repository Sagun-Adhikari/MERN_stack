const mongoose = require("mongoose");

const borrowRecordSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true
    },
    borrowDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ["borrowed", "returned"],
        default: "borrowed"
    }
}, { timestamps: true });

const BorrowRecord = mongoose.model("BorrowRecord", borrowRecordSchema);

module.exports = BorrowRecord;