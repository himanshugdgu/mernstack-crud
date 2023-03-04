const mongoose = require("mongoose");

link = "mongodb+srv://himanshusingh3179:himanshusingh@cluster0.0bd2kjh.mongodb.net/?retryWrites=true&w=majority"
link2 = "mongodb://127.0.0.1:27017/mernstackcrud"
mongoose
  .connect(link)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Error connecting to database: ", err);
  });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
