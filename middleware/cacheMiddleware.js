// middleware/cacheMiddleware.js
const client = require('../config/redisClient');

// Middleware to cache responses
async function cacheResponse(req, res, next) {
  const key = req.originalUrl;
  try {
    const cachedResponse = await client.get(key);
    if (cachedResponse) {
      res.send(JSON.parse(cachedResponse));
    } else {
      res.sendResponse = res.send;
      res.send = async (body) => {
        await client.set(key, JSON.stringify(body), { EX: 60 }); // Cache for 1 minute
        res.sendResponse(body);
      };
      next();
    }
  } catch (error) {
    console.error('Cache error:', error);
    next();
  }
}

module.exports = { cacheResponse };