const { Schema, model } = require("mongoose");
const moment = require("moment");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: [1, "Must be more than 1 character"],
      max: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// format createdAt Date
reactionSchema.virtual("formattedDate").get(function () {
  return moment(this.createdAt).format("D MMMM YYYY | h:mm:ss A");
});

// get a count of all reactions for a thought
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// format createdAt Date
thoughtSchema.virtual("formattedDate").get(function () {
  return moment(this.createdAt).format("D MMMM YYYY | h:mm:ss A");
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
