const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const paymentRoutes = require("./Routes/payment");
const refundRoutes = require("./Routes/refund");
const app = express();

app.use(cors());
dotenv.config();

app.use(express.json());

app.use("/api/payment/", paymentRoutes);
// app.use('/api/refund' , refundRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
