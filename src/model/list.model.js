const { model, models, Schema } = require("mongoose");

const listSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  favs: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Fav",
      },
    ],
  },
});

const List = model("List", listSchema);

module.exports = List;
