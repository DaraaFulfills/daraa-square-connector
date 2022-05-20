"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = exports.setToken = exports.redisInit = void 0;
const redis_1 = require("redis");
let redisClient;
async function redisInit(config) {
    redisClient = (0, redis_1.createClient)(config);
    redisClient.on('error', (err) => console.log('Redis Client Error', err));
    await redisClient.connect();
    return true;
}
exports.redisInit = redisInit;
async function setToken(shop, token) {
    await redisClient.set(shop, token);
    return true;
}
exports.setToken = setToken;
async function getToken(shop) {
    await redisClient.connect();
    const value = await redisClient.get(shop);
    return value;
}
exports.getToken = getToken;
