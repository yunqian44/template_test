using ServiceStack.Redis;
using System;
using System.Collections.Generic;

namespace YQ.TMPL.MVC.Data
{
    public class RedisIO : IRedisIO, IDisposable
    {
        private IRedisClient RedisClient;
        private bool disposed;
        public RedisIO(IRedisClient redis)
        {
            this.RedisClient = redis;
        }
        public bool Remove(string key)
        {
            return this.RedisClient.Remove(key);
        }
        public void RemoveAll(IEnumerable<string> keys)
        {
            this.RedisClient.RemoveAll(keys);
        }
        public T Get<T>(string key)
        {
            return this.RedisClient.Get<T>(key);
        }
        public long Increment(string key, uint amount)
        {
            return this.RedisClient.Increment(key, amount);
        }
        public long Decrement(string key, uint amount)
        {
            return this.RedisClient.Decrement(key, amount);
        }
        public bool Add<T>(string key, T value)
        {
            return this.RedisClient.Add<T>(key, value);
        }
        public bool Set<T>(string key, T value)
        {
            return this.RedisClient.Set<T>(key, value);
        }
        public bool Replace<T>(string key, T value)
        {
            return this.RedisClient.Replace<T>(key, value);
        }
        public bool Add<T>(string key, T value, DateTime expiresAt)
        {
            return this.RedisClient.Add<T>(key, value, expiresAt);
        }
        public bool Set<T>(string key, T value, DateTime expiresAt)
        {
            return this.RedisClient.Set<T>(key, value, expiresAt);
        }
        public bool Replace<T>(string key, T value, DateTime expiresAt)
        {
            return this.RedisClient.Replace<T>(key, value, expiresAt);
        }
        public bool Add<T>(string key, T value, TimeSpan expiresIn)
        {
            return this.RedisClient.Add<T>(key, value, expiresIn);
        }
        public bool Set<T>(string key, T value, TimeSpan expiresIn)
        {
            return this.RedisClient.Set<T>(key, value, expiresIn);
        }
        public bool Replace<T>(string key, T value, TimeSpan expiresIn)
        {
            return this.RedisClient.Replace<T>(key, value, expiresIn);
        }
        public void FlushAll()
        {
            this.RedisClient.FlushAll();
        }
        public IDictionary<string, T> GetAll<T>(IEnumerable<string> keys)
        {
            return this.RedisClient.GetAll<T>(keys);
        }
        public void SetAll<T>(IDictionary<string, T> values)
        {
            this.RedisClient.SetAll<T>(values);
        }
        public List<string> GetAllKeys()
        {
            return this.RedisClient.GetAllKeys();
        }
        public void Dispose()
        {
            if (!this.disposed)
            {
                this.RedisClient.Dispose();
                this.RedisClient = null;
            }
        }
        public long GetListCount(string listId)
        {
            return this.RedisClient.GetListCount(listId);
        }
        public void AddItemToList(string listId, string value)
        {
            this.RedisClient.AddItemToList(listId, value);
        }
        public void PrependItemToList(string listId, string value)
        {
            this.RedisClient.PrependItemToList(listId, value);
        }
        public void EnqueueItemOnList(string listId, string value)
        {
            this.RedisClient.PrependItemToList(listId, value);
        }
        public string DequeueItemFromList(string listId)
        {
            return this.RedisClient.DequeueItemFromList(listId);
        }
        public void PushItemToList(string listId, string value)
        {
            this.RedisClient.PushItemToList(listId, value);
        }
        public string PopItemFromList(string listId)
        {
            return this.RedisClient.PopItemFromList(listId);
        }
        public string GetItemFromList(string listId, int index)
        {
            return this.RedisClient.GetItemFromList(listId, index);
        }
        public string RemoveStartFromList(string listId)
        {
            return this.RedisClient.RemoveStartFromList(listId);
        }
        public bool HashContainsEntry(string hashId, string key)
        {
            return this.RedisClient.HashContainsEntry(hashId, key);
        }
        public bool SetEntryInHash(string hashId, string key, string value)
        {
            return this.RedisClient.SetEntryInHash(hashId, key, value);
        }
        public bool SetEntryInHashIfNotExists(string hashId, string key, string value)
        {
            return this.RedisClient.SetEntryInHashIfNotExists(hashId, key, value);
        }
        public void SetRangeInHash(string hashId, IEnumerable<KeyValuePair<string, string>> keyValuePairs)
        {
            this.RedisClient.SetRangeInHash(hashId, keyValuePairs);
        }
        public long IncrementValueInHash(string hashId, string key, int incrementBy)
        {
            return this.RedisClient.IncrementValueInHash(hashId, key, incrementBy);
        }
        public bool ExpireEntryAt(string key, DateTime expireAt)
        {
            return this.RedisClient.ExpireEntryAt(key, expireAt);
        }
        public bool ExpireEntryIn(string key, TimeSpan expireIn)
        {
            return this.RedisClient.ExpireEntryIn(key, expireIn);
        }
        public double IncrementValueInHash(string hashId, string key, double incrementBy)
        {
            return this.RedisClient.IncrementValueInHash(hashId, key, incrementBy);
        }
        public string GetValueFromHash(string hashId, string key)
        {
            return this.RedisClient.GetValueFromHash(hashId, key);
        }
        public List<string> GetValuesFromHash(string hashId, params string[] keys)
        {
            return this.RedisClient.GetValuesFromHash(hashId, keys);
        }
        public bool RemoveEntryFromHash(string hashId, string key)
        {
            return this.RedisClient.RemoveEntryFromHash(hashId, key);
        }
        public long GetHashCount(string hashId)
        {
            return this.RedisClient.GetHashCount(hashId);
        }
        public List<string> GetHashKeys(string hashId)
        {
            return this.RedisClient.GetHashKeys(hashId);
        }
        public List<string> GetHashValues(string hashId)
        {
            return this.RedisClient.GetHashValues(hashId);
        }
        public Dictionary<string, string> GetAllEntriesFromHash(string hashId)
        {
            return this.RedisClient.GetAllEntriesFromHash(hashId);
        }
    }
}