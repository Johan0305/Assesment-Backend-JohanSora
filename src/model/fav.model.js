const { model, models, Schema } = require("mongoose");

const favSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  list: {
    type: Schema.Types.ObjectId,
    ref: "List",
    required: true,
  },
});

const Fav = model("Fav", favSchema);

module.exports = Fav;
