const mongoose = require("mongoose");

const Cause = mongoose.model(
  "Cause",
  new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
  })
);

module.exports = Cause;