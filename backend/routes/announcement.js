const express = require("express");
const router = express.Router();
const Announcement = require("../models/announcement");

router.post("/create", async (req, res) => {
  const { content, date, poster } = req.body;
  try {
    const newAnnouncement = new Announcement({
      content: content,
      date: date,
      poster: poster,
    });
    const savedAnnouncement = await newAnnouncement.save();
    res.json(savedAnnouncement);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;