import express from "express";
import { json } from "express";
import { prisma } from "@repo/db";
const app = express();
app.use(json());

app.get("/", (req, res) => {
  res.send("hello ");
});

app.post("/hdfcWebHook", (req, res) => {
  //  todo : add zod validation here
  const paymentInformation = {
    token: req.body.token,
    user_id: req.body.user_identifer,
    amount: req.body.amount,
  };
  // update balance in db and txn.
});
app.listen(3002, () => {
  console.log("server working ");
});
