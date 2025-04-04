const express = require("express");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const reelRoutes = require("./routes/reelRoutes");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { refreshToken } = require("./controllers/RefreshController");
dotenv.config();
const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // IMPORTANT: allow cookies to be sent
  })
);
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/reels", reelRoutes);
app.post("/api/refresh-token", refreshToken);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
``;
