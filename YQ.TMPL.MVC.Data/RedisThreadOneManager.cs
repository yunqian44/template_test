using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Text;

namespace YQ.TMPL.MVC.Data
{
    public class RedisThreadOneManager
    {
        public static IRedisIO GetRedisClient(string sectionName)
        {
            string name = "redis_" + sectionName;
            IRedisIO redisIO = CallContext.GetData(name) as IRedisIO;
            if (redisIO == null)
            {
                redisIO = RedisPoolManager.GetClient(sectionName);
                CallContext.SetData(name, redisIO);
            }
            return redisIO;
        }
    }
}
