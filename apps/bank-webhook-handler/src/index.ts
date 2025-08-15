import express from "express";
import { json } from "express";
import { prisma } from "@repo/db";
const app = express();
app.use(json());

app.get("/", (req, res) => {
  res.send("hello ");
});

app.post("/hdfcWebHook", async (req, res) => {
  //  todo : add zod validation here
  //  todo : check if request came from bank only
  // check if onramp transaction is processing or not if: proceed else fail.
  const paymentInformation = {
    token: req.body.token,
    user_id: req.body.user_identifer,
    amount: req.body.amount,
  };
  // update balance in db and txn.
  try {
    await prisma.$transaction([
      prisma.balance.update({
        where: {
          userId: Number(paymentInformation.user_id),
        },
        data: {
          amount: { increment: Number(paymentInformation.amount) },
        },
      }),

      prisma.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);
    res.status(200).json("Captured");
  } catch (e) {
    console.log(e);
    res.status(400).json({
      Alert: "Transaction Failed",
    });
  }
});

app.listen(3002, () => {
  console.log("server working ");
});
