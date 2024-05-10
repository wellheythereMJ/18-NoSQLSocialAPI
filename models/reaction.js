const {Schema, Types} = require("mongoose")
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    trim: true,
    max_length: 280
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (dateValue) => dateValue.toLocaleDateString()
  },
},{
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
})

module.exports = reactionSchema;