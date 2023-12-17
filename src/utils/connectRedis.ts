import { createClient } from 'redis';

if (!process.env.REDIS_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
}

const redisUrl: string = process.env.REDIS_URI;

const redisClient = createClient({
    url: redisUrl,
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
    } catch (error: any) {
        setInterval(connectRedis, 5000);
    }
};

connectRedis();

redisClient.on('connect', () => console.log('🚀 Redis client connected successfully'));

redisClient.on('error', (err) => console.error(err));

export default redisClient;
