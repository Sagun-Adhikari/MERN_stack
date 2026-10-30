const BorrowRecord = require("../models/BorrowRecord");
const Book = require("../models/Book");
const Member = require("../models/Member");

// BORROW BOOK
async function borrowBook(req, res) {
    const { bookId, memberId } = req.body;

    // Find book
    const book = await Book.findById(bookId);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    // Find member
    const member = await Member.findById(memberId);

    if (!member) {
        return res.status(404).json({
            message: "Member not found"
        });
    }

    // Check availability
    if (book.availableCopies <= 0) {
        return res.status(400).json({
            message: "Book is not available"
        });
    }

    // Create borrow record
    const record = await BorrowRecord.create({
        book: bookId,
        member: memberId
    });

    // Decrease available copies
    book.availableCopies -= 1;
    await book.save();

    res.status(201).json({
        message: "Book borrowed successfully",
        record
    });
}


// GET ALL BORROW RECORDS
async function getAllBorrowRecords(req, res) {
    const records = await BorrowRecord.find()
        .populate("book")
        .populate("member");

    res.status(200).json(records);
}


// GET SINGLE BORROW RECORD
async function getBorrowRecordById(req, res) {
    const record = await BorrowRecord.findById(req.params.id)
        .populate("book")
        .populate("member");

    if (!record) {
        return res.status(404).json({
            message: "Borrow record not found"
        });
    }

    res.status(200).json(record);
}


// RETURN BOOK
async function returnBook(req, res) {
    const record = await BorrowRecord.findById(req.params.id);

    if (!record) {
        return res.status(404).json({
            message: "Borrow record not found"
        });
    }

    if (record.status === "returned") {
        return res.status(400).json({
            message: "Book has already been returned"
        });
    }

    const book = await Book.findById(record.book);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    // Update borrow record
    record.status = "returned";
    record.returnDate = new Date();

    await record.save();

    // Increase available copies
    book.availableCopies += 1;
    await book.save();

    res.status(200).json({
        message: "Book returned successfully",
        record
    });
}


// DELETE BORROW RECORD
async function deleteBorrowRecord(req, res) {
    const record = await BorrowRecord.findById(req.params.id);

    if (!record) {
        return res.status(404).json({
            message: "Borrow record not found"
        });
    }

    if (record.status === "borrowed") {
        return res.status(400).json({
            message: "Return the book before deleting this record"
        });
    }

    await BorrowRecord.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message: "Borrow record deleted successfully"
    });
}


module.exports = {
    borrowBook,
    getAllBorrowRecords,
    getBorrowRecordById,
    returnBook,
    deleteBorrowRecord
};