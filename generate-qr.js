import QRCode from "qrcode";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target URL for the digital business card
const url = "https://rizeavukatkaraca.com/#kartvizit";

const outputDir = path.join(__dirname, "public");
const outputPath = path.join(outputDir, "karaca-hukuk-qr.png");

// Ensure public directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`Generating QR Code for: ${url}`);

QRCode.toFile(
  outputPath,
  url,
  {
    errorCorrectionLevel: "H", // High error tolerance (good for printed business cards)
    type: "png",
    width: 1024, // High resolution (1024x1024 px) for print quality
    margin: 2,
    color: {
      dark: "#0a2e5c", // Corporate Deep Trust Blue
      light: "#ffffff", // Pure white background for high readability
    },
  },
  function (err) {
    if (err) {
      console.error("Error generating QR Code:", err);
      process.exit(1);
    }
    console.log(`QR Code successfully saved to: ${outputPath}`);
  },
);
