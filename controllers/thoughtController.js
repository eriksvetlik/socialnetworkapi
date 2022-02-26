const { Thought, User } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.status(200).json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then(
        (thought) =>
          !thought
            ? res.status(404).json({ message: "No such thought exists" })
            : res.status(200).json({ message: "Thought deleted" })
        // Thoughts.findOneAndUpdate(
        //     { username: req.params.username },
        //     { $pull: { username: req.params.username } },
        //     { new: true }
        //   )
      )
      // .then((thoughts) =>
      //   !thoughts
      //     ? res.status(404).json({
      //         message: "User deleted, but no thoughts found",
      //       })
      //     : res.json({ message: "User successfully deleted" })
      // )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
