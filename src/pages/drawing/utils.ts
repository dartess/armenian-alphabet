import type { Point, Shape } from '@/pages/drawing/model';

function length(pointA: Point, pointB: Point): number {
  const ac = pointB.x - pointA.x;
  const bc = pointB.y - pointA.y;
  return Math.sqrt(ac ** 2 + bc ** 2);
}

function average(arr: Array<number>) {
  if (arr.length === 0) {
    return 0;
  }
  let sum = 0;
  for (const val of arr) {
    sum += val;
  }
  return sum / arr.length;
}

function calculateAccuracy(sample: Shape, input: Shape): number {
  if (input.length === 0) {
    return 0;
  }
  const lengthsForDots: Array<Array<number>> = [];
  for (let i = 0; i < sample.length; i += 1) {
    for (let j = 0; j < input.length; j += 1) {
      lengthsForDots[i] ??= [];
      lengthsForDots[i][j] = length(sample[i], input[j]);
    }
  }
  const minLengthsForDots = lengthsForDots.map((lengths) => Math.min(...lengths));
  return 100 - average(minLengthsForDots);
}

async function getSampleShape(url: string): Promise<Shape> {
  const image = new Image(100, 100);
  image.src = url;
  await image.decode();
  const canvas = document.createElement('canvas');
  canvas.width = 100;
  canvas.height = 100;
  const context = canvas.getContext('2d')!;
  context.drawImage(image, 0, 0, 100, 100);
  const { data } = context.getImageData(0, 0, 100, 100);
  const rawAlpha = data.filter((_, index) => (index + 1) % 4 === 0);

  const COEFF = 3;
  for (let y = 0; y < 100; y += 1) {
    for (let x = 0; x < 100; x += 1) {
      if (x % COEFF || y % COEFF) {
        rawAlpha[y * 100 + x] = 0;
      }
    }
  }

  const result: Shape = [];
  for (let y = 0; y < 100; y += 1) {
    for (let x = 0; x < 100; x += 1) {
      if (rawAlpha[y * 100 + x]) {
        result.push({ x, y });
      }
    }
  }
  return result;
}

export {
  calculateAccuracy,
  getSampleShape,
};
