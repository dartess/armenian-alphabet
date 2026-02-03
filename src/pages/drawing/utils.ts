import type { Lines, Point, Shape } from '@/pages/drawing/model';

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
  for (let i = 0; i < sample.length; i++) {
    for (let j = 0; j < input.length; j++) {
      lengthsForDots[i] ??= [];
      lengthsForDots[i][j] = length(sample[i], input[j]);
    }
  }
  const minLengthsForDots = lengthsForDots.map((lengths) => Math.min(...lengths));
  return 100 - average(minLengthsForDots);
}

function getAlphaMatrix(canvas: HTMLCanvasElement): Array<Array<number>> {
  const { width, height } = canvas;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('ctx is empty');
  }
  const { data } = ctx.getImageData(0, 0, width, height);
  const rawAlpha = data.filter((_, index) => (index + 1) % 4 === 0);
  const result: Array<Array<number>> = [];
  for (let y = 0; y < height; y++) {
    result[y] = [];
    for (let x = 0; x < width; x++) {
      result[y][x] = rawAlpha[y * width + x];
    }
  }
  return result;
}

function calculateSampleShape(originalCanvas: HTMLCanvasElement): Shape {
  const resizedCanvas = document.createElement('canvas');
  const RESIZED_WIDHT = 100;
  const RESIZED_HEIGHT = 100;
  resizedCanvas.width = RESIZED_WIDHT;
  resizedCanvas.height = RESIZED_HEIGHT;
  const resizedCtx = resizedCanvas.getContext('2d');
  if (!resizedCtx) {
    throw new Error('resizedCtx is empty');
  }
  resizedCtx.drawImage(
    originalCanvas,
    0,
    0,
    originalCanvas.width,
    originalCanvas.height,
    0,
    0,
    RESIZED_WIDHT,
    RESIZED_HEIGHT,
  );

  const alphaMatrix = getAlphaMatrix(resizedCanvas);

  const COEFF = 3;
  alphaMatrix.forEach((line, y) => {
    line.forEach((_, x) => {
      if (x % COEFF || y % COEFF) {
        alphaMatrix[y][x] = 0;
      }
    });
  });

  const result: Shape = [];
  alphaMatrix.forEach((line, y) => {
    line.forEach((dot, x) => {
      if (dot > 0) {
        result.push({ x, y });
      }
    });
  });
  return result;
}

function drawLetter(canvas: HTMLCanvasElement, letterValue: string): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('ctx is empty');
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const fontSize = canvas.height * 0.82;
  ctx.font = `${fontSize}px Noto Sans Armenian`;
  ctx.fillStyle = '#808080';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  ctx.fillText(letterValue, centerX, centerY);
}

function calculateTopBottomLines(canvas: HTMLCanvasElement): { top: number; bottom: number } {
  const alphaMatrix = getAlphaMatrix(canvas);
  const linesAlphas = alphaMatrix.map((line) => line.some(Boolean));
  const { length: linesCount } = linesAlphas;
  const top = linesAlphas.findIndex(Boolean) / linesCount;
  linesAlphas.reverse();
  const bottom = 1 - linesAlphas.findIndex(Boolean) / linesCount;
  return { top, bottom };
}

function calculateAllLines(): Lines {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 300;

  drawLetter(canvas, 'լ');
  const { top: lowercaseLine, bottom: descenderLine } = calculateTopBottomLines(canvas);

  drawLetter(canvas, 'Լ');
  const { top: capLine, bottom: baseLine } = calculateTopBottomLines(canvas);

  return {
    capLine,
    lowercaseLine,
    baseLine,
    descenderLine,
  };
}

export { calculateAccuracy, calculateSampleShape, calculateAllLines, drawLetter };
