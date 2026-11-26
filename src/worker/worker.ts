import { parentPort } from 'node:worker_threads';

parentPort?.on('message', () => {
  // Snapshot cache and evaluation handler implemented in T-11
});
