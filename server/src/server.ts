import fileUpload from "express-fileupload";
import knex from "knex";
import cors from "cors";
import { PORT } from "./env.js";
import ExpressConfig from "./Express/express.config.js";
import { removeExtension } from "./Utils/helper.js";
import { STATUS_CODE } from "./Utils/constants.js";

const app = ExpressConfig();

app.use(fileUpload());

/**
 * CORS configuration
 */
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*", // allow CORS
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

// DB
const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./img.db",
  },
  useNullAsDefault: true,
});

// Image Interface
interface Image {
  id: number | string;
  title: string;
  img: string;
}

app.get("/", async (_req, res) => {
  res.send("Hello!");
});

app.post("/upload", async (req, res) => {
  if (!req.files) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);
    return;
  }

  const { name, data } = req.files.pic as any;
  if (name && data) {
    try {
      await db.insert({ title: removeExtension(name), img: data }).into("img");
      res.status(STATUS_CODE.CREATED).json({
        status: "success",
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
  } else {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);
  }
});

app.get("/images", async (req, res) => {
  const { title } = req.query;

  try {
    const whereCondition = `%${title || ""}%`;
    const images = await db<Image>("img")
      .whereLike("title", whereCondition)
      .orderBy("id", "desc");
    res.status(STATUS_CODE.OK).send(images);
  } catch (e) {
    console.log(e);
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
});

app.get("/image/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const img = await db<Image>("img").where({ id: id }).first();
    if (img) {
      res.status(STATUS_CODE.OK).send(img);
    } else {
      res.sendStatus(STATUS_CODE.BAD_REQUEST);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
});

app.delete("/image/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db("img").where("id", id).del();
    res.status(STATUS_CODE.OK).json({
      status: "success",
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
});

app.listen(PORT, () => console.log("Server Running on Port " + PORT));
