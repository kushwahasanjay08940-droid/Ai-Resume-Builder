import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";
import { createWorker } from "tesseract.js";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export const pdfToText = async (file) => {
  try {
    console.log("📄 Reading PDF...");

    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let text = "";

    // STEP 1: Try normal extraction
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      text += content.items.map((item) => item.str).join(" ") + " ";
    }

    text = text.trim();

    console.log("PDF TEXT:", text);

    // STEP 2: If text found → return
    if (text.length > 20) {
      return text;
    }

    console.log("⚠️ No text found, switching to OCR...");

    // STEP 3: OCR fallback (Tesseract)
    const worker = await createWorker("eng");

    const images = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2 });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvasContext: context,
        viewport,
      }).promise;

      images.push(canvas.toDataURL("image/png"));
    }

    let ocrText = "";

    for (const img of images) {
      const {
        data: { text },
      } = await worker.recognize(img);

      ocrText += text + " ";
    }

    await worker.terminate();

    return ocrText.trim();
  } catch (err) {
    console.log("PDF ERROR:", err);
    return "";
  }
};