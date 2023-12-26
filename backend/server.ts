import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRoute from "./routes/todoRoute";
import userRoute from "./routes/userRoute";

const app = express();
const PORT = Number(process.env.PORT);

app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.DB || "")
    .then(() => console.log("db connected...🚀"))
    .catch((err) => console.log(err));

app.use(todoRoute);
app.use(userRoute);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
