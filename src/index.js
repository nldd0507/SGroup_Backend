import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config();

import router from "./route/route.js";
import errorHandler from "./middleware/errorHandler.js";
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use("/", router);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
