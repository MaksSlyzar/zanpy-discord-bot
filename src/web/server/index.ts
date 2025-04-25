import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./index.html"));
});

app.get("/health", (_req, res) => {
  res.status(200).send("OK");
  console.log("Check status")
});


app.listen(PORT, () => {
  console.log(`Сервер працює на http://0.0.0.0:${PORT}`);
});

