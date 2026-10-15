const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentsController");

router.post("/",studentController.addEntry);

router.get("/",studentController.getEntry);

router.get("/:id",studentController.getEntryById);

router.put("/:id",studentController.updateEntry);

router.delete("/:id",studentController.deleteEntry);

module.exports = router;