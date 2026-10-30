const express = require("express");
const router = express.Router();

const {
    borrowBook,
    getAllBorrowRecords,
    getBorrowRecordById,
    returnBook,
    deleteBorrowRecord
} = require("../controller/borrowController");


router.post("/", borrowBook);

router.get("/", getAllBorrowRecords);

router.get("/:id", getBorrowRecordById);

router.put("/return/:id", returnBook);

router.delete("/:id", deleteBorrowRecord);


module.exports = router;