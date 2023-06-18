export interface ICacheService {
  get<T>(key: string, prefix: string): Promise<T | null>
  set(key: string, value: string, prefix: string, ttl: number): Promise<boolean>
  del(key: string, prefix: string): Promise<boolean>
}