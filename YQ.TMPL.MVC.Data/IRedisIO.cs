using System;
using System.Collections.Generic;

namespace YQ.TMPL.MVC.Data
{
    public interface IRedisIO : IDisposable
    {
        bool Remove(string key);
        void RemoveAll(IEnumerable<string> keys);
        T Get<T>(string key);
        long Increment(string key, uint amount);
        long Decrement(string key, uint amount);
        bool Add<T>(string key, T value);
        bool Set<T>(string key, T value);
        bool Replace<T>(string key, T value);
        bool Add<T>(string key, T value, DateTime expiresAt);
        bool Set<T>(string key, T value, DateTime expiresAt);
        bool Replace<T>(string key, T value, DateTime expiresAt);
        bool Add<T>(string key, T value, TimeSpan expiresIn);
        bool Set<T>(string key, T value, TimeSpan expiresIn);
        bool Replace<T>(string key, T value, TimeSpan expiresIn);
        void FlushAll();
        bool ExpireEntryAt(string key, DateTime expireAt);
        bool ExpireEntryIn(string key, TimeSpan expireIn);
        IDictionary<string, T> GetAll<T>(IEnumerable<string> keys);
        void SetAll<T>(IDictionary<string, T> values);
        List<string> GetAllKeys();
        long GetListCount(string listId);
        string GetItemFromList(string listId, int index);
        void AddItemToList(string listId, string value);
        void PrependItemToList(string listId, string value);
        string RemoveStartFromList(string listId);
        void EnqueueItemOnList(string listId, string value);
        string DequeueItemFromList(string listId);
        void PushItemToList(string listId, string value);
        string PopItemFromList(string listId);
        bool HashContainsEntry(string hashId, string key);
        bool SetEntryInHash(string hashId, string key, string value);
        bool SetEntryInHashIfNotExists(string hashId, string key, string value);
        void SetRangeInHash(string hashId, IEnumerable<KeyValuePair<string, string>> keyValuePairs);
        long IncrementValueInHash(string hashId, string key, int incrementBy);
        double IncrementValueInHash(string hashId, string key, double incrementBy);
        string GetValueFromHash(string hashId, string key);
        List<string> GetValuesFromHash(string hashId, params string[] keys);
        bool RemoveEntryFromHash(string hashId, string key);
        long GetHashCount(string hashId);
        List<string> GetHashKeys(string hashId);
        List<string> GetHashValues(string hashId);
        Dictionary<string, string> GetAllEntriesFromHash(string hashId);
    }
}