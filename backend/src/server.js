import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const sampleUser = {
  id: "1",
  email: "aaa@aaa",
  password: "aaa",
};

app.post("/auth/register", async (req, res) => {
  console.log("registered");
  res.send(sampleUser);
});

app.post("/auth/login", async (req, res) => {
  console.log("login");
  res.send(sampleUser);
});

const server = app.listen(PORT, () => {
  console.log(`INFO: Listening to port ${PORT}...`);
});
