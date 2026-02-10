import { parsePPMHeader } from "./src/ascii.js";

const main = () => {
  const image = Deno.readFileSync("./assets/cPika.ppm");
  const header = parsePPMHeader(image);

  console.log(header);
};
main();
