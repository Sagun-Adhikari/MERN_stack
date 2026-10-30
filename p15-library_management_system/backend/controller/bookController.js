const Book = require("../models/Book");

// CREATE BOOK
async function createBook(req, res) {
    const { title, author, category, totalCopies } = req.body;

    const book = await Book.create({
        title,
        author,
        category,
        totalCopies,
        availableCopies: totalCopies
    });

    res.status(201).json({
        message: "Book created successfully",
        book
    });
}


// GET ALL BOOKS
async function getAllBooks(req, res) {
    const books = await Book.find();

    res.status(200).json(books);
}

 

// GET SINGLE BOOK
async function getBookById(req, res) {
    const book = await Book.findById(req.params.id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.status(200).json(book);
}


// UPDATE BOOK
async function updateBook(req, res) {
    const { title, author, category, totalCopies } = req.body;

    const book = await Book.findById(req.params.id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    if (totalCopies !== undefined) {
        const borrowedCopies = book.totalCopies - book.availableCopies;

        if (totalCopies < borrowedCopies || totalCopies < 1) {
            return res.status(400).json({
                message: "Invalid total copies"
            });
        }

        book.totalCopies = totalCopies;
        book.availableCopies = totalCopies - borrowedCopies;
    }

    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;
    if (category !== undefined) book.category = category;

    await book.save();

    res.status(200).json({
        message: "Book updated successfully",
        book
    });
}


// DELETE BOOK
async function deleteBook(req, res) {
    const book = await Book.findById(req.params.id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    if (book.availableCopies !== book.totalCopies) {
        return res.status(400).json({
            message: "Cannot delete a borrowed book"
        });
    }

    await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message: "Book deleted successfully"
    });
}


module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};