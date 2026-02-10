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

export const parsePPMHeader = (byteBuffer) => {
  const decoder = new TextDecoder();
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
    width: imageWidth,
    height: imageHeight,
    maxVal: maxColorValue,
    headerLength: cursor.value,
  };
};
