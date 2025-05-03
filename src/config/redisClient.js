// // utils/redis.ts
// import { createClient } from 'redis';

// const redis = createClient({
//   url: process.env.REDIS_URL || 'redis://localhost:6379',
//   socket: {
//     reconnectStrategy: (retries) => {
//       if (retries > 10) {
//         console.log('Too many retries on REDIS. Connection terminated');
//         return new Error('Too many retries');
//       }
//       return Math.min(retries * 100, 5000); // Wait between retries
//     },
//   },
// });

// redis.on('error', (err) => console.log('Redis Client Error', err));

// (async () => {
//   try {
//     await redis.connect();
//     console.log('Connected to Redis');
//   } catch (err) {
//     console.error('Redis connection error:', err);
//   }
// })();

// export default redis;
