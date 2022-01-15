const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Announcement", announcementSchema);
