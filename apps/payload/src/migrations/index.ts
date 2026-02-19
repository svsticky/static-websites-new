import * as migration_20260122_113822 from './20260122_113822';
import * as migration_20260219_133239 from './20260219_133239';

export const migrations = [
  {
    up: migration_20260122_113822.up,
    down: migration_20260122_113822.down,
    name: '20260122_113822',
  },
  {
    up: migration_20260219_133239.up,
    down: migration_20260219_133239.down,
    name: '20260219_133239'
  },
];
