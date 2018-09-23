using Quartz;
using Quartz.Impl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using YQ.TMPL.MVC.WebApp.Service.JobTask;

namespace YQ.TMPL.MVC.WebApp.Service
{
    public class ScheduledTaskService : IScheduledTaskService
    {
        private static IScheduler scheduler = null;
        public ScheduledTaskService()
        {
            if (scheduler == null)
            {
                scheduler = StdSchedulerFactory.GetDefaultScheduler();

            }
        }
        public static void Start()
        {
            if (scheduler == null)
            {
                scheduler = StdSchedulerFactory.GetDefaultScheduler();
            }
            scheduler.Start();
            IJobDetail jobTaskCreator = JobBuilder.Create<JobTaskCreator>().Build();
            ITrigger trigger = TriggerBuilder.Create()
              .WithIdentity("JobTaskCreator", "Device2")
              .StartNow().WithCronSchedule("0 05 6 * * ?").Build(); // * 30 * * * ?  每个点的30分执行一次                    
        }
        public static void Stop()
        {
            scheduler.Shutdown();
        }
    }
}