const router = require('express').Router();

const { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, removeReaction } = require('../../controllers/thoughtControllers')

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

router.route('/:thoughtId/reactions').post(addReaction);

module.exports = router