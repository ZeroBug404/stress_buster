import { Router } from "express";
import { googleController } from "./google.controller";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // Extract the file extension
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`); // Save with a unique name
  },
});

const upload = multer({ storage });

const router = Router();

router.get("/chat-history", googleController.getChatHistory);

router.get("/result", googleController.getResult);
router.post(
  "/image-result",
  upload.single("file"),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  googleController.getImageResult
);

router.post("/chat", googleController.geminiChat);

//
export const googleRouter = router;
