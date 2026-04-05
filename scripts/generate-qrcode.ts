import QRCode from "qrcode";
import path from "path";

const HOMEPAGE_URL = "https://www.k-miyosino.com/";
const OUTPUT_PATH = path.resolve(
  __dirname,
  "../docs/resident/images/qrcode-homepage.png"
);

async function main() {
  await QRCode.toFile(OUTPUT_PATH, HOMEPAGE_URL, {
    type: "png",
    width: 300,
    margin: 2,
    color: { dark: "#000000", light: "#ffffff" },
  });
  console.log(`QR code saved to ${OUTPUT_PATH}`);
}

main();
