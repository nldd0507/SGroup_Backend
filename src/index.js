import express from "express";
import router from "./route/route.js";

const app = express();
app.use(express.json());
app.use("/", router);

app.get("/", (req, res) => {
  res.send("<h1>Hello, World!</h1>");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
