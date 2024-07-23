import { Request, Response, Router } from "express";
import { BAD_REQUEST, NOT_FOUND } from "../utility/httpcode";
import Razorpay from "razorpay";
import { Orders } from "razorpay/dist/types/orders";

const paymentRouter = Router();

paymentRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body_data = req.body;
    const rzp_key = process.env.RZP_KEY;
    const rzp_secret = process.env.RZP_SECRET;
    if (!!rzp_key && !!rzp_secret) {
      const razorpay = new Razorpay({
        key_id: process.env.RZP_KEY as string,
        key_secret: process.env.RZP_SECRET as string,
      });
      const options: Orders.RazorpayOrderCreateRequestBody = {
        amount: body_data.amount,
        currency: body_data.currency,
        receipt: Math.floor(100000000 + Math.random() * 900000000).toString(),
      };

      const response = await razorpay.orders.create(options);
      res.json({
        amount: response.amount,
        currency: response.currency,
        receipt: response.receipt,
      });
    } else {
      return res
        .status(NOT_FOUND)
        .json({ status: "error", message: "Razorpay keys not found" });
    }
  } catch (error: any) {
    console.log("Payment error");
    console.log(error);
    res.status(BAD_REQUEST).json({ status: "error", message: error.message });
  }
});

export default paymentRouter;
