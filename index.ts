import express from "express";
import morgan from "morgan";

import db from "./src/models";
import userRouter from "./src/routers/userRoute";
import groceryRouter from "./src/routers/groceryRoute";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/grocery", groceryRouter);

db.sequelize
  .authenticate()
  .then(() => {
    console.log("connection authenticated");
  })
  .catch((err: any) => {
    console.log("connection not authenticated", err);
  });

db.sequelize
  .sync()
  .then(() => {
    console.log("models synced");
  })
  .catch((error: any) => {
    console.log("models not synced");
  });

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
