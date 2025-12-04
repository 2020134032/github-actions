import { test } from 'node:test';
import assert from 'node:assert';
import { fact } from '../src/calc.js';

test('fact(0) should return 1', () => {
  assert.strictEqual(fact(0), 1);
});

test('fact(1) should return 1', () => {
  assert.strictEqual(fact(1), 1);
});

test('fact(2) should return 2', () => {
  assert.strictEqual(fact(2), 2);
});

test('fact(6) should return 720', () => {
  assert.strictEqual(fact(6), 720);
});

test('fact(7) should return 5040', () => {
  assert.strictEqual(fact(7), 5040);
});
