const mongoose = require("mongoose")

mongoose.set("strictQuery", false)
mongoose.connect("mongodb+srv://mongodb:vasu23thara@myfirstdatabase.el4ju0f.mongodb.net/user23DB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((err) => {
    console.log(err)
  });