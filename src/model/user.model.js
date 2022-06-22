const { model, models, Schema } = require("mongoose");
const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      match: [emailRegex, "email is not valid"],
      validate: [
        {
          validator(email) {
            return models.User.findOne({ email })
              .then((user) => !user)
              .catch(() => false);
          },
        },
      ],
    },
    password: {
      type: String,
      required: true,
    },
    lists: {
      type: [{ type: Schema.Types.ObjectId, ref: "List" }],
      required: false,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
