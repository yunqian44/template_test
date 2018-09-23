using ServiceStack.Redis;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace YQ.TMPL.MVC.Data
{
    public class RedisPoolManager
    {
        private static Hashtable RedisHashtable;
        private static object SyncObject;
        static RedisPoolManager()
        {
            RedisPoolManager.RedisHashtable = Hashtable.Synchronized(new Hashtable());
            RedisPoolManager.SyncObject = new object();
        }
        private static PooledRedisClientManager CreateManager(string section)
        {
            RedisConfigInfo config = RedisConfigInfo.GetConfig(section);
            string[] array = RedisPoolManager.SplitString(config.WriteServerList, ",");
            string[] array2 = RedisPoolManager.SplitString(config.ReadServerList, ",");
            for (int i = 0; i < array.Length; i++)
            {
                array[i] = config.RedisPassword + "@" + array[i];
            }
            for (int j = 0; j < array2.Length; j++)
            {
                array2[j] = config.RedisPassword + "@" + array2[j];
            }
            IEnumerable<string> arg_B4_0 = array2;
            IEnumerable<string> arg_B4_1 = array;
            RedisClientManagerConfig expr_7E = new RedisClientManagerConfig();
            expr_7E.MaxWritePoolSize=(config.MaxWritePoolSize);
            expr_7E.MaxReadPoolSize=(config.MaxReadPoolSize);
            expr_7E.AutoStart=(config.AutoStart);
            expr_7E.DefaultDb=(new long?((long)config.DefaultDb));
            return new PooledRedisClientManager(arg_B4_0, arg_B4_1, expr_7E);
        }
        private static string[] SplitString(string strSource, string split)
        {
            return strSource.Split(split.ToArray<char>());
        }
        public static IRedisIO GetClient()
        {
            return RedisPoolManager.GetClient("RedisConfig");
        }
        public static IRedisIO GetClient(string sectionName)
        {
            object syncObject = RedisPoolManager.SyncObject;
            PooledRedisClientManager pooledRedisClientManager;
            lock (syncObject)
            {
                if (RedisPoolManager.RedisHashtable.ContainsKey(sectionName))
                {
                    pooledRedisClientManager = (PooledRedisClientManager)RedisPoolManager.RedisHashtable[sectionName];
                }
                else
                {
                    pooledRedisClientManager = RedisPoolManager.CreateManager(sectionName);
                    if (pooledRedisClientManager != null)
                    {
                        RedisPoolManager.RedisHashtable.Add(sectionName, pooledRedisClientManager);
                    }
                }
            }
            return new RedisIO(pooledRedisClientManager.GetClient());
        }
    }
}
