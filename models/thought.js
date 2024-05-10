const {Schema, model} = require("mongoose")
const reactionSchema = require("./Reaction.js")
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (dateValue) => dateValue.toLocaleDateString()
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  reactions: [reactionSchema]
},{
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
});

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;