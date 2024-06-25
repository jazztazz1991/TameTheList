const mongoose = require("mongoose");
const { Schema } = mongoose;

const householdSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    ],
    boards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "board",
      },
    ],
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model("Household", householdSchema);
