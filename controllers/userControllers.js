const {User, Thought} = require("../models")

module.exports = {
  async getAllUsers(req,res){
    try {
      const users = await User.find()
      res.status(200).json(users)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },
  async getUserById(req,res){
    try {
      const user = await User.findById(req.params.id).populate("thoughts").populate("friends")
      if (!user) {
        return res.status(404).json({message: "No user found with this id!"})
      }
      res.status(200).json(user)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },
  async createUser(req,res){
    try {
      const user = await User.create(req.body)
      res.status(200).json(user)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },
  async updateUser(req,res){
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {$set:req.body}, {new: true, runValidators: true})
      if (!user) {
        return res.status(404).json({message: "No user found with this id!"})
      }
      res.status(200).json(user)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },
  async deleteUser(req,res){
    try {
      const user = await User.findByIdAndDelete(req.params.id)
      if (!user) {
        return res.status(404).json({message: "No user found with this id!"})
      }
      await Thought.deleteMany({ _id: { $in: user.thoughts}});
      res.status(200).json({message: "User and associated thoughts deleted!"});
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },
  async addFriend(req, res){
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, {
        $addToSet: {friends: req.params.friendId},
      }, {new: true, runValidators: true})
      if (!user) {
        return res.status(404).json({message: "No user found with this id!"})
      }   
      res.status(200).json(user)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },
  async removeFriend(req, res){
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, {
        $pull: {friends: req.params.friendId},
      }, {new: true, runValidators: true})
      if (!user) {
        return res.status(404).json({message: "No user found with this id!"})
      }   
      res.status(200).json(user)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }
}