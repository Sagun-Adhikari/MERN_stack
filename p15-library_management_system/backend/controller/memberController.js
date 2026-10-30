const Member = require("../models/Member");

// CREATE MEMBER
async function createMember(req, res) {
    const { name, email, phone } = req.body;

    const member = await Member.create({
        name,
        email,
        phone
    });

    res.status(201).json({
        message: "Member created successfully",
        member
    });
}


// GET ALL MEMBERS
async function getAllMembers(req, res) {
    const members = await Member.find();

    res.status(200).json(members);
}


// GET SINGLE MEMBER
async function getMemberById(req, res) {
    const member = await Member.findById(req.params.id);

    if (!member) {
        return res.status(404).json({
            message: "Member not found"
        });
    }

    res.status(200).json(member);
}


// UPDATE MEMBER
async function updateMember(req, res) {
    const { name, email, phone } = req.body;

    const member = await Member.findById(req.params.id);

    if (!member) {
        return res.status(404).json({
            message: "Member not found"
        });
    }

    member.name = name ?? member.name;
    member.email = email ?? member.email;
    member.phone = phone ?? member.phone;

    await member.save();

    res.status(200).json({
        message: "Member updated successfully",
        member
    });
}


// DELETE MEMBER
async function deleteMember(req, res) {
    const member = await Member.findById(req.params.id);

    if (!member) {
        return res.status(404).json({
            message: "Member not found"
        });
    }

    await Member.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message: "Member deleted successfully"
    });
}


module.exports = {
    createMember,
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember
};