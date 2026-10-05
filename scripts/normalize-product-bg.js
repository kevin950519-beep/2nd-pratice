/**
 * normalize-product-bg.js
 *
 * 제품 Day 이미지(src/assets/product/{n}.png)의 배경을 목표색(기본 #FCFCFC)으로 맞춘다.
 * 이미지 가장자리(테두리 16px)의 중앙값을 그 이미지의 배경색으로 보고,
 * R/G/B 채널별 배율(목표 / 배경)을 곱해 보정한다. (ImageMagick `convert` 필요)
 * Night 이미지({n}-1.png)는 건드리지 않는다.
 *
 * 사용:
 *   node scripts/normalize-product-bg.js --out <dir> [--only 1,7,16] [--target FCFCFC]
 *   node scripts/normalize-product-bg.js --in-place [--only ...]
 */

import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const SRC = join(ROOT, 'src', 'assets', 'product');
const BORDER = 16;

const args = process.argv.slice(2);
const getArg = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};

const isInPlace = args.includes('--in-place');
const outDir = getArg('out');
const only = getArg('only')?.split(',');
const target = (getArg('target') || 'FCFCFC').replace('#', '');
const targetRgb = [0, 2, 4].map((i) => parseInt(target.slice(i, i + 2), 16));

if (!isInPlace && !outDir) {
  console.error('--out <dir> 또는 --in-place 가 필요합니다.');
  process.exit(1);
}
if (outDir) mkdirSync(outDir, { recursive: true });

const median = (values) => values.sort((a, b) => a - b)[Math.floor(values.length / 2)];

/** 가장자리 띠(상·하·좌·우)를 축소해 픽셀을 읽고 채널별 중앙값을 반환 */
function sampleBackground(file) {
  const [w, h] = execFileSync('convert', [file, '-format', '%w %h', 'info:']).toString().split(' ').map(Number);
  const strips = [
    `${w}x${BORDER}+0+0`, `${w}x${BORDER}+0+${h - BORDER}`,
    `${BORDER}x${h}+0+0`, `${BORDER}x${h}+${w - BORDER}+0`,
  ];
  const samples = [[], [], []];
  strips.forEach((geometry) => {
    const txt = execFileSync('convert', [file, '-crop', geometry, '+repage', '-resize', '120x120>', 'txt:-'], { maxBuffer: 1 << 26 }).toString();
    [...txt.matchAll(/srgb?a?\((\d+),(\d+),(\d+)/g)].forEach((m) => {
      samples.forEach((channel, c) => channel.push(Number(m[c + 1])));
    });
  });
  return samples.map(median);
}

const files = readdirSync(SRC)
  .filter((name) => /^\d+\.png$/.test(name))
  .filter((name) => !only || only.includes(name.replace('.png', '')))
  .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

files.forEach((name) => {
  const input = join(SRC, name);
  const bg = sampleBackground(input);
  const gains = bg.map((value, c) => targetRgb[c] / value);
  const output = isInPlace ? input : join(outDir, name);
  const command = ['-channel', 'R', '-evaluate', 'Multiply', gains[0].toFixed(5),
    '-channel', 'G', '-evaluate', 'Multiply', gains[1].toFixed(5),
    '-channel', 'B', '-evaluate', 'Multiply', gains[2].toFixed(5), '+channel'];
  execFileSync('convert', [input, ...command, output]);
  console.log(`${name}: bg rgb(${bg.join(',')}) -> gain ${gains.map((g) => g.toFixed(3)).join(' / ')}`);
});
