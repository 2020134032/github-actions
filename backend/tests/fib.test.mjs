import { test } from 'node:test';
import assert from 'node:assert';
import { fib } from '../src/calc.js';

test('fib(0) should return 0', () => {
  assert.strictEqual(fib(0), 0);
});

test('fib(1) should return 1', () => {
  assert.strictEqual(fib(1), 1);
});

test('fib(2) should return 1', () => {
  assert.strictEqual(fib(2), 1);
});

test('fib(6) should return 8', () => {
  assert.strictEqual(fib(6), 8);
});

test('fib(10) should return 55', () => {
  assert.strictEqual(fib(10), 55);
});
