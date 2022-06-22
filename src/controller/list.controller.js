const List = require("../model/list.model");
const User = require("../model/user.model");

module.exports = {
  async list(req, res) {
    try {
      const userId = req.user;
      const lists = await List.find({ user: userId });
      res.status(200).json({ message: "Lists found", data: lists });
    } catch (err) {
      res.status(404).json({ message: "Lists not found" });
    }
  },
  async show(req, res) {
    try {
      const { listId } = req.params;
      const list = await List.findById(listId);
      res.status(200).json({ message: "List found", data: list });
    } catch (err) {
      res.status(404).json({ message: "List not found" });
    }
  },
  async create(req, res) {
    try {
      const userId = req.user;
      const list = await List.create({ ...req.body, user: userId });
      const user = await User.findById(userId);
      user.lists.push(list);
      user.save({ validateBeforeSave: false });
      res.status(201).json({ message: "list created", data: list });
    } catch (err) {
      res.status(400).json({ message: "list could not be created", data: err });
    }
  },
  async destroy(req, res) {
    try {
      const { listId } = req.params;
      const list = await List.findByIdAndDelete(listId);
      res.status(200).json({ message: "list destroyed", data: list });
    } catch (err) {
      res
        .status(400)
        .json({ message: "list could not be destroyed", data: err });
    }
  },
};
