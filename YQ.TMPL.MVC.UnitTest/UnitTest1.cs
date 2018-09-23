using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using YQ.TMPL.MVC.Common;
using YQ.TMPL.MVC.Model;
using System.Collections.Generic;
using YQ.TMPL.MVC.Data;

namespace YQ.TMPL.MVC.UnitTest
{
    [TestClass]
    public class UnitTest1
    {
        internal class BaojiaSetting
        {
            public const string RedisSetKey = "BaoJiaQueueRedis";
            public const string RedisListKey = "BaoJiaMessageList";
        }

        [TestMethod]
        public void TestMethod1()
        {
            for (int i = 0; i < 10000; i++)
            {
              var msg=  new { Name = "王维"+i, Status = 1, Gender = 0, Image = "http://localhost:7779/Image/driver.png", Remark = "我是一个特别搞笑的人，他们都叫我小白", IdCard = 610124199303083650,Title= "待办任务" };

                string json = JsonHelper.SerializeObject(msg);
                using (IRedisIO redis = RedisPoolManager.GetClient(BaojiaSetting.RedisSetKey))
                {
                    redis.EnqueueItemOnList(BaojiaSetting.RedisListKey, json);
                }
            }
        }
    }
}
