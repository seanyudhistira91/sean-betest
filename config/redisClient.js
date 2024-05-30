// config/redisClient.js
const redis = require('redis');

const client = redis.createClient({
  url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`,
});

client.on('error', (error) => {
  console.error('Redis error:', error);
});

client.on('ready', () => {
  console.log('Redis client connected and ready to use');
});

// Connect to the Redis server
async function connectClient() {
  try {
    await client.connect();
    console.log('Connected to Redis server');
  } catch (error) {
    console.error('Redis connection error:', error);
    process.exit(1); // Exit the process with an error code
  }
}

connectClient();

module.exports = client;
