import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Cards from "./Models/dbCards.js";

//App Config
const app = express();
const port = process.env.PORT || 3001;
const connection_url =
   "mongodb+srv://admin:s7Djiy7JXmXMT00D@cluster0.ghthx.mongodb.net/tinderdb?retryWrites=true&w=majority";

//Middleware
app.use(express.json());
app.use(cors());

//DB Config
mongoose.connect(connection_url, {
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true,
});

//API Endpoints
app.get("/", (req, res) => res.status(200).send("OK ✌"));

app.post("/tinder/cards", (req, res) => {
   const dbCard = req.body;

   Cards.create(dbCard, (err, data) => {
      if (err) {
         res.status(500).send(err);
      } else {
         res.status(201).send(data);
      }
   });
});

app.get("/tinder/cards", (req, res) => {
   Cards.find((err, data) => {
      if (err) {
         res.status(500).send(err);
      } else {
         res.status(200).send(data);
      }
   });
});

//Listener
app.listen(port, () => console.log("listening on http://localhost:3001/"));
