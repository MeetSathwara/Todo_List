const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const Dbcon = require("./Db");
const app = express();
const route = require("./routes/TodoRoute");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/todo", route);

app.get("/", (req, res) => {
    return res.send("hello");
});

Dbcon();
const PORT = process.env.PORT || 8000
app.listen(PORT, () => { console.log(`server is running on ${PORT}`) });