import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./route/userRoute.js";
import cartRouter from "./route/cartRoute.js";
import productRouter from "./route/productRoute.js";
import reviewRouter from "./route/reviewRoute.js";

const app = express();
const port = process.env.PORT || 8000;

//Service connections
connectDB();
connectCloudinary();

app.use(express.json());

const allowedOrigins = [
  "https://sprint-2-frontend-teerathep-ngampukdeekuls-projects.vercel.app",// For local development
  "https://sprint-2-frontend-sudawan-s-projects.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
];

// Configure CORS
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Allow requests with no origin (e.g., mobile apps or curl)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) {
//         callback(null, true); // Allow the origin
//       } else {
//         callback(new Error("Not allowed by CORS")); // Block the origin
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true, // Allow cookies or Authorization headers
//   })
// );

const corsOptions = {
  origin: "*", // หรือใส่ URL ของ Frontend แทน เช่น https://your-frontend.com
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/product", productRouter);
app.use("/review", reviewRouter);

app.get("/", (req, res) => {
  res.status(200).json({ data: "API ทำงานปกติ" });
});

app.listen(port, () =>
  console.log("Server started on PORT :" + port + "🌏 🙌")
);
