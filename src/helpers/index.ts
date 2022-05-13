import { createClient } from 'redis';
let redisClient;

type RedisInitConfig = {
    url: string;
    port?: number;
    username?: string;
    password?: string;
}

export async function redisInit(config:RedisInitConfig):Promise<boolean>{
    redisClient = createClient(config);
    redisClient.on('error', (err) => console.log('Redis Client Error', err));
    await redisClient.connect();
    return true;
}

export async function setToken(shop:string, token:string):Promise<boolean>{
    await redisClient.set(shop, token);
    return true;
}

export async function getToken(shop:string):Promise<string>{
    await redisClient.connect();
    const value = await redisClient.get(shop);
    return value;
}

