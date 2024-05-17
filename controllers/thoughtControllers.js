const {User, Thought} = require('../models')

module.exports = {
  async getAllThoughts(req, res){
    try {
      const thoughts = await Thought.find()
      res.status(200).json(thoughts)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },
  async getThoughtById(req, res){
    try {
          const thought = await Thought.findById(req.params.id)
          if (!thought) {
            return res.status(404).json({message: "No thought found with this id!"})
          }
          res.status(200).json(thought)
        } catch (err) {
          console.log(err)
          res.status(500).json(err)
        }
  }, 
  async createThought(req, res){
    try {
      const thought = await Thought.create(req.body)
      const user = await User.findByIdAndUpdate(req.body.userId, {$addToSet: {thoughts: thought._id}}, {new: true})
      if (!user) {
        return res.status(404).json({message: "No user found with this id!"})
      }
      res.status(200).json(thought)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },

  async updateThought(req, res){
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.id, {$set:req.body}, {new: true})
      if (!thought) {
        return res.status(404).json({message: "No thought found with this id!"})
      }
      res.status(200).json(thought)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },
  async deleteThought(req, res){
    try {
      const thought = await Thought.findByIdAndDelete(req.params.id)
      if (!thought) {
        return res.status(404).json({message: "No thought found with this id!"})
      }
      res.status(200).json(thought)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },
  async addReaction(req, res){
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, {
        $addToSet: {reactions: req.body},
      }, {new: true, runValidators: true})
      if (!thought) {
        return res.status(404).json({message: "No thought found with this id!"})
      }   
      res.status(200).json(thought)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },
  async removeReaction(req, res){
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, {
        $pull: {reactions: {reactionId: req.params.reactionId}},
      }, {new: true, runValidators: true})
      if (!thought) {
        return res.status(404).json({message: "No thought found with this id!"})
      }   
      res.status(200).json(thought)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }
}
