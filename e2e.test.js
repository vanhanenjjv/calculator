import { test as baseTest, expect } from '@playwright/test'
import fetch from 'node-fetch'

import createServer from './src/server.js'

const operationUrl = (workerIndex, operation) => `http://localhost:${9000 + workerIndex}/${operation.toLowerCase()}`

const operate = workerIndex => operation => (a, b) =>
  fetch(operationUrl(workerIndex, operation), {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ a, b })
  })
  .then(res => res.json())
  .then(json => json.result)

const test = baseTest.extend({
  operate: ({}, use, testInfo) => {
    use(operate(testInfo.workerIndex))
  },
  server: [({}, use, workerInfo) => {
    use(createServer(9000 + workerInfo.workerIndex, { silent: true }))
  }, { scope: 'worker', auto: true }]
})

test.describe.parallel('Calculator', () => {
  test.describe('Add', () => {
    test('should return 5 for 2 + 3', async ({ operate }) => {
      expect(5).toEqual(await operate('add')(2, 3))
    })

    test('should return 7 for 4 + 3', async ({ operate }) => {
      expect(7).toEqual(await operate('add')(4, 3))
    })

    test('should return 12 for 6 + 6', async ({ operate }) => {
      expect(12).toEqual(await operate('add')(6, 6))
    })
  })

  test.describe('Divide', () => {
    test('should return 7 for 14 / 2', async ({ operate }) => {
      expect(7).toEqual(await operate('divide')(14, 2))
    })

    test('should return 4 for 12 / 3', async ({ operate }) => {
      expect(4).toEqual(await operate('divide')(12, 3))
    })

    test('should return 0.25 for 1 / 4', async ({ operate }) => {
      expect(0.25).toEqual(await operate('divide')(1, 4))
    })
  })

  test.describe('Subtract', () => {
    test('should return 7 for 15 - 8', async ({ operate }) => {
      expect(7).toEqual(await operate('subtract')(15, 8))
    })

    test('should return 5 for 10 - 5', async ({ operate }) => {
      expect(5).toEqual(await operate('subtract')(10, 5))
    })

    test('should return 5.5 for 6 - 0.5', async ({ operate }) => {
      expect(5.5).toEqual(await operate('subtract')(6, 0.5))
    })
  })

  test.describe('Multiply', () => {
    test('should return 9 for 3 * 3', async ({ operate }) => {
      expect(9).toEqual(await operate('multiply')(3, 3))
    })

    test('should return 12 for 3 * 4', async ({ operate }) => {
      expect(12).toEqual(await operate('multiply')(3, 4))
    })

    test('should return 4.5 for 1.5 * 3', async ({ operate }) => {
      expect(4.5).toEqual(await operate('multiply')(1.5, 3))
    })
  })
})
