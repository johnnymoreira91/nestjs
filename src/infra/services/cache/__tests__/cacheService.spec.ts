// import { it, describe, vi, beforeAll, expect } from 'jest';
import { CacheService } from '../CacheService';
import { ICacheService } from '../ICacheService';

jest.mock('redis', () => ({
  createClient: jest.fn(() => ({
    connect: jest.fn(),
    on: jest.fn(),
    set: jest.fn(),
    get: jest.fn(),
  })),
  get: jest.fn().mockResolvedValue({
    id: 1,
    name: 'test',
  }),
  set: jest.fn(),
}));

interface user {
  id: number;
  name: string;
}

describe('Cache Service', () => {
  let cacheService: ICacheService;
  beforeAll(() => {
    cacheService = new CacheService();
  });
  describe('Set Cache', () => {
    it('When set is called', async () => {
      const user = {
        id: 1,
        name: 'test',
      };
      const result = await cacheService.set(
        'key',
        JSON.stringify(user),
        'prefix{key}',
        10,
      );
      expect(result).toBe(true);
    });
  });

  describe('Get Cache', () => {
    it('When get is called', async () => {
      const result = await cacheService.get<user>('key', 'prefix{key}');
      console.log(result);
      expect(result?.id).toBe(1);
      expect(result?.name).toBe('test');
    });
  });
});
