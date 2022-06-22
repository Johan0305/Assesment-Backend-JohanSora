const Fav = require("../model/fav.model");
const List = require("../model/list.model");

module.exports = {
  async create(req, res) {
    try {
      const { listId } = req.params;
      const list = await List.findById(listId);
      if (!list) {
        throw new Error("List not found");
      }
      const fav = await Fav.create({ ...req.body, list: listId });
      list.favs.push(fav);
      await list.save({ validateBeforeSave: false });
      res.status(201).json({ message: "fav created", data: fav });
    } catch (err) {
      res.status(400).json({ message: "fav failed", data: err });
    }
  },
};
