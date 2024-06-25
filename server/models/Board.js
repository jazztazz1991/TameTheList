const mongoose = require("mongoose");
const { Schema } = mongoose;

const boardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    household: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "household",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    ],
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "task",
      },
    ],
    stats: [
      {
        category: [
          {
            totalTasks: {
              type: Number,
            },
            subCategories: [
              {
                name: {
                  type: String,
                },
                totalTasks: {
                  type: Number,
                },
                avgTime: {
                  type: Number,
                },
                fastestTime: {
                  type: Number,
                },
              },
            ],
          },
        ],
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

module.exports = boardSchema;
