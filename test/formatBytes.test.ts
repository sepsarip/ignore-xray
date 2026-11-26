import test from 'node:test';
import assert from 'node:assert/strict';
import { formatBytes } from '../src/utils/formatBytes';

test('formatBytes returns 0 B for zero, negative, and non-finite inputs', () => {
  assert.equal(formatBytes(0), '0 B');
  assert.equal(formatBytes(-1), '0 B');
  assert.equal(formatBytes(-1024), '0 B');
  assert.equal(formatBytes(Number.NaN), '0 B');
  assert.equal(formatBytes(Number.POSITIVE_INFINITY), '0 B');
  assert.equal(formatBytes(Number.NEGATIVE_INFINITY), '0 B');
});

test('formatBytes formats sub-kilobyte values as rounded integer bytes', () => {
  assert.equal(formatBytes(1), '1 B');
  assert.equal(formatBytes(512), '512 B');
  assert.equal(formatBytes(1023), '1023 B');
});

test('formatBytes formats exact 1024-multiple boundaries', () => {
  assert.equal(formatBytes(1024), '1.0 KB');
  assert.equal(formatBytes(1024 ** 2), '1.0 MB');
  assert.equal(formatBytes(1024 ** 3), '1.0 GB');
  assert.equal(formatBytes(1024 ** 4), '1.0 TB');
});

test('formatBytes formats intermediate decimal sizes', () => {
  assert.equal(formatBytes(Math.round(14.2 * 1024)), '14.2 KB');
  assert.equal(formatBytes(Math.round(184.5 * 1024 ** 2)), '184.5 MB');
  assert.equal(formatBytes(Math.round(1.2 * 1024 ** 3)), '1.2 GB');
});

test('formatBytes promotes rounding boundary values to next unit', () => {
  assert.equal(formatBytes(1024 * 1024 - 1), '1.0 MB');
  assert.equal(formatBytes(1024 ** 3 - 1), '1.0 GB');
});
