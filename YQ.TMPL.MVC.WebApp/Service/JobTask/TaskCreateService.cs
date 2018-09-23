using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace YQ.TMPL.MVC.WebApp.Service.JobTask
{
    /// <summary>
    /// 任务生成
    /// </summary>
    public class TaskCreateService
    {
        DateTime TodayDate;

        public TaskCreateService()
        {
            TodayDate = DateTime.Now.Date;
        }

        /// <summary>
        /// 开始任务
        /// </summary>
        public void Create()
        {
            #region 检查 ＋
            CreateCheck();
            #endregion
        }

        #region 01，创建检查任务+void CreateCheck()
        /// <summary>
        /// 创建检查任务
        /// </summary>
        public void CreateCheck()
        {
            //检查任务
            //var tasks =string.Empty;

            //生成任务
            //var res=XXX.AddTasks(tasks)

            //写入任务消息队列
            

            //写入任务短信队列
            //var res3 = SetMessage(entitys); 
        }
        #endregion
    }
}