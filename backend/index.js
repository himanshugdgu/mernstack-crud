const express = require("express");
const User = require("./database");
// cors
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// get data
app.get("/get", async (req, res) => {
  try {
    const data = await User.find();
    console.log(data);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

// create route
app.post("/post", async (req, res) => {
  try {
    const data = new User(req.body);
    const save = await data.save();
    res.send(save);
  } catch (err) {
    console.log(err);
  }
});

// update
app.put("/update/:id", async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

// delete
app.delete("/delete/:id", async (req, res) => {
  try {
    // find id and delete
    const data = await User.findByIdAndDelete(req.params.id);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

// listen
app.listen(5000, () => console.log("Listening on port 5000"));
