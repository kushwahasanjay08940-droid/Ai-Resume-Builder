import multer from "multer";

const storage = multer.diskStorage({});

const upload = multer({ storage });

console.log("Multer configured with disk storage");
export default upload;

