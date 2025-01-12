import sharp from "sharp";
import fs from "fs";
import path from "path";


// Directorul unde se află fișierele
const inputDirectory = "./images"; // Actualizați calea dacă e necesar
const outputDirectory = "./out";

// Creăm directorul de ieșire dacă nu există
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

// Funcție pentru conversia fișierelor în WebP
async function convertToWebp(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .toFormat("webp")
      .toFile(outputPath);
    console.log(`Converted ${inputPath} to ${outputPath}`);
  } catch (error) {
    console.error(`Error converting ${inputPath}:`, error);
  }
}

// Obținem toate fișierele din directorul de intrare
const files = fs.readdirSync(inputDirectory);

// Lista extensiilor suportate
const supportedExtensions = [".png", ".svg", ".jpg", ".jpeg", ".gif", ".bmp", ".tiff", ".webp"];

// Filtrăm fișierele și le convertim
files.forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (supportedExtensions.includes(ext)) {
    const inputPath = path.join(inputDirectory, file);
    const outputPath = path.join(
      outputDirectory,
      path.basename(file, ext) + ".webp"
    );

    convertToWebp(inputPath, outputPath);
  } else {
    console.log(`Skipping unsupported file: ${file}`);
  }
});
