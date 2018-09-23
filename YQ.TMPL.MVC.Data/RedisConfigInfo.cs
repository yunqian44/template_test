using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;

namespace YQ.TMPL.MVC.Data
{
    public sealed class RedisConfigInfo : ConfigurationSection
    {
        public const string DefaultSection = "RedisConfig";
        [ConfigurationProperty("WriteServerList", IsRequired = false)]
        public string WriteServerList
        {
            get
            {
                return (string)base["WriteServerList"];
            }
            set
            {
                base["WriteServerList"] = value;
            }
        }
        [ConfigurationProperty("ReadServerList", IsRequired = false)]
        public string ReadServerList
        {
            get
            {
                return (string)base["ReadServerList"];
            }
            set
            {
                base["ReadServerList"] = value;
            }
        }
        [ConfigurationProperty("Password", IsRequired = false)]
        public string RedisPassword
        {
            get
            {
                return (string)base["Password"];
            }
            set
            {
                base["Password"] = value;
            }
        }
        [ConfigurationProperty("MaxWritePoolSize", IsRequired = false, DefaultValue = 5)]
        public int MaxWritePoolSize
        {
            get
            {
                int num = (int)base["MaxWritePoolSize"];
                if (num <= 0)
                {
                    return 5;
                }
                return num;
            }
            set
            {
                base["MaxWritePoolSize"] = value;
            }
        }
        [ConfigurationProperty("DefaultDb", IsRequired = false, DefaultValue = 0)]
        public int DefaultDb
        {
            get
            {
                int num = (int)base["DefaultDb"];
                if (num <= 0)
                {
                    return 0;
                }
                return num;
            }
            set
            {
                base["DefaultDb"] = value;
            }
        }
        [ConfigurationProperty("MaxReadPoolSize", IsRequired = false, DefaultValue = 5)]
        public int MaxReadPoolSize
        {
            get
            {
                int num = (int)base["MaxReadPoolSize"];
                if (num <= 0)
                {
                    return 5;
                }
                return num;
            }
            set
            {
                base["MaxReadPoolSize"] = value;
            }
        }
        [ConfigurationProperty("AutoStart", IsRequired = false, DefaultValue = true)]
        public bool AutoStart
        {
            get
            {
                return (bool)base["AutoStart"];
            }
            set
            {
                base["AutoStart"] = value;
            }
        }
        [ConfigurationProperty("LocalCacheTime", IsRequired = false, DefaultValue = 36000)]
        public int LocalCacheTime
        {
            get
            {
                return (int)base["LocalCacheTime"];
            }
            set
            {
                base["LocalCacheTime"] = value;
            }
        }
        [ConfigurationProperty("RecordeLog", IsRequired = false, DefaultValue = false)]
        public bool RecordeLog
        {
            get
            {
                return (bool)base["RecordeLog"];
            }
            set
            {
                base["RecordeLog"] = value;
            }
        }
        public static RedisConfigInfo GetConfig()
        {
            return ConfigurationManager.GetSection("RedisConfig") as RedisConfigInfo;
        }
        public static RedisConfigInfo GetConfig(string sectionName)
        {
            RedisConfigInfo expr_0B = (RedisConfigInfo)ConfigurationManager.GetSection(sectionName);
            if (expr_0B == null)
            {
                throw new ConfigurationErrorsException("Section " + sectionName + " is not found.");
            }
            return expr_0B;
        }
    }
}
