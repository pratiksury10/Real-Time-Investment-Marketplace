const redis = require('redis');

// Create Redis client instance using the Redis URL from the .env file
const redisClient = redis.createClient({
  url: process.env.REDIS_URL, // Example: redis://localhost:6379
});

// Connect to Redis server
redisClient.connect().then(() => {
  console.log('Connected to Redis');
}).catch((err) => {
  console.error('Redis connection error:', err);
});

module.exports = redisClient;
