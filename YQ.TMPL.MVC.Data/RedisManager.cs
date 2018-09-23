using ServiceStack.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace YQ.TMPL.MVC.Data
{
    public class RedisManager : IDisposable
    {
        private static RedisConfigInfo redisConfigInfo;
        private static PooledRedisClientManager prcm;
        private bool _isDisposed;
        static RedisManager()
        {
            RedisManager.redisConfigInfo = RedisConfigInfo.GetConfig();
            RedisManager.CreateManager();
        }
        private static void CreateManager()
        {
            string[] array = RedisManager.SplitString(RedisManager.redisConfigInfo.WriteServerList, ",");
            string[] array2 = RedisManager.SplitString(RedisManager.redisConfigInfo.ReadServerList, ",");
            for (int i = 0; i < array.Length; i++)
            {
                array[i] = RedisManager.redisConfigInfo.RedisPassword + "@" + array[i];
            }
            for (int j = 0; j < array2.Length; j++)
            {
                array2[j] = RedisManager.redisConfigInfo.RedisPassword + "@" + array2[j];
            }
            IEnumerable<string> arg_B1_0 = array2;
            IEnumerable<string> arg_B1_1 = array;
            RedisClientManagerConfig expr_81 = new RedisClientManagerConfig();
            expr_81.MaxWritePoolSize=(RedisManager.redisConfigInfo.MaxWritePoolSize);
            expr_81.MaxReadPoolSize=(RedisManager.redisConfigInfo.MaxReadPoolSize);
            expr_81.AutoStart=(RedisManager.redisConfigInfo.AutoStart);
            RedisManager.prcm = new PooledRedisClientManager(arg_B1_0, arg_B1_1, expr_81);
        }
        private static string[] SplitString(string strSource, string split)
        {
            return strSource.Split(split.ToArray<char>());
        }
        public static IRedisIO GetClient()
        {
            if (RedisManager.prcm == null)
            {
                RedisManager.CreateManager();
            }
            return new RedisIO(RedisManager.prcm.GetClient());
        }
        public void Dispose()
        {
            if (!this._isDisposed)
            {
                RedisManager.prcm.Dispose();
            }
        }
    }
}
