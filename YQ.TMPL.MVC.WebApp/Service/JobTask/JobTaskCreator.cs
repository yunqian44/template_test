using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Web;

namespace YQ.TMPL.MVC.WebApp.Service.JobTask
{
    /// <summary>
    /// 任务生成
    /// </summary>
    internal class JobTaskCreator : IJob
    {
        public void Execute(IJobExecutionContext context)
        {
            TaskHandler();
        }
        /// <summary>
        /// 任务代码
        /// </summary>
        public void TaskHandler()
        {
            try
            {
               /*可以加日志*/

                TaskCreateService tcService = new TaskCreateService();

                tcService.Create();

                /*可以加日志*/
            }
            catch (Exception ex)
            {
                /*可以加日志*/
            }
        }
    }
}