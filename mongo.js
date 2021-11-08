const mongoose = require("mongoose");
const url = "mongodb+srv://Ankur123:djdjank123@ankur0.221bw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connect ho chuka hai!"))
  .catch((err) => {
    console.log(err)
  });

