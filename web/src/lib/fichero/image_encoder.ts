import { BYTES_PER_ROW, PRINTHEAD_PX } from "./constants";
import type { EncodedImage, PrintDirection } from "./types";

export class ImageEncoder {
  static encodeCanvas(
    canvas: HTMLCanvasElement,
    direction: PrintDirection,
    bytesPerRow: number = BYTES_PER_ROW,
    printheadPx: number = PRINTHEAD_PX,
  ): EncodedImage {
    let source = canvas;

    if (direction === "left") {
      source = ImageEncoder.rotateCW90(canvas);
    }

    const rowsData = ImageEncoder.canvasToRaster(source, bytesPerRow);
    return {
      cols: bytesPerRow,
      rows: source.height,
      rowsData,
    };
  }

  private static rotateCW90(canvas: HTMLCanvasElement): HTMLCanvasElement {
    const rotated = document.createElement("canvas");
    rotated.width = canvas.height;
    rotated.height = canvas.width;
    const ctx = rotated.getContext("2d")!;
    ctx.translate(rotated.width, 0);
    ctx.rotate(Math.PI / 2);
    ctx.drawImage(canvas, 0, 0);
    return rotated;
  }

  private static canvasToRaster(canvas: HTMLCanvasElement, bytesPerRow: number = BYTES_PER_ROW): Uint8Array {
    const ctx = canvas.getContext("2d")!;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const px = data.data;
    const rows = canvas.height;
    const out = new Uint8Array(rows * bytesPerRow);

    for (let y = 0; y < rows; y++) {
      for (let byteIdx = 0; byteIdx < bytesPerRow; byteIdx++) {
        let byte = 0;
        for (let bit = 0; bit < 8; bit++) {
          const x = byteIdx * 8 + bit;
          if (x < canvas.width) {
            const i = (y * canvas.width + x) * 4;
            if (px[i] === 0) {
              byte |= 0x80 >> bit;
            }
          }
        }
        out[y * bytesPerRow + byteIdx] = byte;
      }
    }

    return out;
  }
}