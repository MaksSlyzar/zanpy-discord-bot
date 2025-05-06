import express from 'express';
import path from 'path';
import emojies from "./../bot/data/emojies.json";
import multer from "multer";
import cors from "cors";
import fs from "fs";

interface UploadEmojie {
  id: string;
  names: Array<string>;
  description: string;
};


const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.static(path.join(__dirname, "../assets/")));
app.use(cors());
const storage = multer.memoryStorage();
const upload = multer({ storage });


app.get("/", (req, res) => {
  res.send("yo");
});

/*
app.post("/api/upload", upload.single('image'), (req, res) => {
  console.log("post")
  const file = req.file;
  if (!file)
    return;
  const data = JSON.parse(req.body.data) as UploadEmojie;

  console.log('Файл:', file);
  console.log('Дані:', data);

  fs.writeFileSync(path.join(__dirname, "../assets/test-items", data.id + ".png"), file.buffer);

  const albionIcons: any[] = [];

  if (fs.existsSync(path.join(__dirname, "../bot/data/test-emojies.json"))) {
    const fileData = fs.readFileSync(path.join(__dirname, "../bot/data/test-emojies.json"), "utf8");

    if (fileData.trim()) {
      const _data = JSON.parse(fileData);
      _data["albion-icons"].push(data);

      fs.writeFileSync(path.join(__dirname, "../bot/data/test-emojies.json"), JSON.stringify(_data));
    }
  }

  res.send('Отримано!');
});*/

app.get("/api/get-emojies", (req, res) => {
  const data = {
    test: [],
    items: []
  };

  const items = JSON.parse(fs.readFileSync(path.join(__dirname, "../bot/data/emojies.json"), "utf8"))["albion-icons"].map((item: any) =>
    Object.assign({ imageUrl: `/albion-icons/${item.id}.png`, name: item.names[0] }, item));

  const test = JSON.parse(fs.readFileSync(path.join(__dirname, "../bot/data/test-emojies.json"), "utf8"))["albion-icons"];

  data.test = test;
  data.items = items;

  res.json(data);
})

app.get("/health", (_req, res) => {
  res.status(200).send("OK");
  console.log("Check status")
});

app.get("/get-emojies", (req, res) => {
  res.json(emojies);
});


app.listen(PORT, () => {
  console.log(`Сервер працює на http://0.0.0.0:${PORT}`);
});

