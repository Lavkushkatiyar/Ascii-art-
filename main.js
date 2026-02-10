import { ppmParser } from "./src/ascii.js";

const main = () => {
  const image = Deno.readFileSync("./assets/cPika.ppm");
  const asciiImage = ppmParser(image);

  console.log(asciiImage);
};
main();
