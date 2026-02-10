const decoder = new TextDecoder();
const getBrightnessAscii = (brightness) => {
  switch (true) {
    case brightness < 32:
      return "@";
    case brightness < 64:
      return "#";
    case brightness < 96:
      return "*";
    case brightness < 128:
      return "+";
    case brightness < 160:
      return "=";
    case brightness < 192:
      return "-";
    case brightness < 224:
      return ":";
    case brightness < 248:
      return ".";
    default:
      return " ";
  }
};
const isWhitespaceByte = (byte) => byte === 10 || byte === 32;

const skipWhitespace = (byteBuffer, cursor) => {
  while (isWhitespaceByte(byteBuffer[cursor.value])) {
    cursor.value++;
  }
};

const readNextValue = (byteBuffer, cursor, decoder) => {
  skipWhitespace(byteBuffer, cursor);

  const startIndex = cursor.value;

  while (!isWhitespaceByte(byteBuffer[cursor.value])) {
    cursor.value++;
  }

  return decoder.decode(
    byteBuffer.slice(startIndex, cursor.value),
  );
};

const parsePPMHeader = (byteBuffer) => {
  const cursor = { value: 0 };

  const magicNumber = readNextValue(byteBuffer, cursor, decoder);
  const imageWidth = readNextValue(byteBuffer, cursor, decoder);
  const imageHeight = readNextValue(byteBuffer, cursor, decoder);
  const maxColorValue = readNextValue(byteBuffer, cursor, decoder);

  if (byteBuffer[cursor.value] === 10) {
    cursor.value++;
  }

  return {
    magic: magicNumber,
    width: Number(imageWidth),
    height: Number(imageHeight),
    maxVal: maxColorValue,
    headerLength: cursor.value,
  };
};

const getAsciiPixels = (pixelData, { height, width }) => {
  const asciiPixels = [];
  for (let row = 0; row < height; row += 2) {
    let line = "";
    const rowStart = row * width * 3;
    const rowEnd = rowStart + (width * 3);

    for (let i = rowStart; i < rowEnd; i += 3) {
      const r = pixelData[i];
      const g = pixelData[i + 1];
      const b = pixelData[i + 2];

      const brightness = (r + g + b) / 3;
      const asciiPixel = getBrightnessAscii(brightness);
      line += asciiPixel;
    }
    asciiPixels.push(line + "\n");
  }

  return asciiPixels;
};

export const ppmParser = (imageBytes) => {
  const header = parsePPMHeader(imageBytes);
  const pixelData = imageBytes.slice(header.headerLength);

  return getAsciiPixels(pixelData, header).join("");
};
