import { ICacheService } from './ICacheService';
import { RedisClientType } from '@redis/client/dist/lib/client';
import { createClient } from 'redis';
import { Injectable } from '@nestjs/common';

@Injectable()
class CacheService implements ICacheService {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: `redis://${process.env.REDIS_URL}:${
        process.env.REDIS_PORT
          ? Number(process.env.REDIS_PORT.toString())
          : 6379
      }`,
    });
    this.client.connect();
    this.client.on('connect', function () {
      console.log('Redis connected');
    });
    this.client.on('error', (err) => console.log('Redis Client Error', err));
  }
  async get<T>(key: string, prefix: string): Promise<T | null> {
    const data = await this.client.get(prefix.replace('key', key));

    const dataParse: T = JSON.parse(data);
    return dataParse;
  }
  async set(
    key: string,
    value: string,
    prefix: string,
    ttl: number,
  ): Promise<boolean> {
    const redisKey = prefix.replace('key', key);
    await this.client.set(redisKey, value, {
      EX: ttl,
      NX: true,
    });
    return true;
  }
  async del(key: string, prefix: string): Promise<boolean> {
    const redisKey = prefix.replace('key', key);
    await this.client.del(redisKey);
    return true;
  }
}

export { CacheService };
