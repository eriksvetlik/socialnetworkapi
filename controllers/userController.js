const User = require("../models/User");

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .populate("friends")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  createFriend(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then(
        (user) =>
          !user
            ? res.status(404).json({ message: "No such user exists" })
            : res.status(200).json({ message: "User deleted" })
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
  deleteFriend(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then(
        (user) =>
          !user
            ? res.status(404).json({ message: "No such user exists" })
            : res.status(200).json({ message: "User deleted" })
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
