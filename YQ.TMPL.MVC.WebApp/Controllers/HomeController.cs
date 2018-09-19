using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YQ.TMPL.MVC.Model;
using YQ.TMPL.MVC.ViewModel;

namespace YQ.TMPL.MVC.WebApp.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }

        #region 01，获取用户列表+JsonResult GetUserList()
        /// <summary>
        /// 获取用户列表
        /// </summary>
        /// <returns></returns>
        public JsonResult GetUserList()
        {
            var modelLists = new List<UserInfo>();
            modelLists.Add(new UserInfo() { Id = 1, Age = 18, Name = "李白", Status = 1, Gender = 0, Image = "http://localhost:7779/Image/driver.png", Remark = "我是一个特别搞笑的人，他们都叫我小白", IdCard = 610124199303083650 });
            modelLists.Add(new UserInfo() { Id = 2, Age = 21, Name = "杜甫", Status = 1, Gender = 0, Image = "http://localhost:7779/Image/driver.png", Remark = "我只知道我写的诗特别多", IdCard = 610124199019932651 });
            modelLists.Add(new UserInfo() { Id = 3, Age = 14, Name = "白居易", Status = 1, Gender = 0, Image = "http://localhost:7779/Image/driver.png", Remark = "我字号白乐天，我暗恋杨贵妃", IdCard = 610155199219562654 });
            modelLists.Add(new UserInfo() { Id = 4, Age = 35, Name = "李商隐", Status = 1, Gender = 0, Image = "http://localhost:7779/Image/driver.png", Remark = "商女不知亡国恨，隔江犹唱后庭花", IdCard = 610124199515456952 });
            modelLists.Add(new UserInfo() { Id = 5, Age = 16, Name = "汪伦", Status = 1, Gender = 0, Image = "http://localhost:7779/Image/driver.png", Remark = "我是上面小白的好基友", IdCard = 610124198636254187 });
            modelLists.Add(new UserInfo() { Id = 6, Age = 45, Name = "李清照", Status = 1, Gender = 1, Image = "http://localhost:7779/Image/driver.png", Remark = "我是这里面唯一的女的,那个小白就是我家亲戚", IdCard = 610124199835261487 });
            return Json(new HttpResult(modelLists), JsonRequestBehavior.AllowGet);
        } 
        #endregion

        #region 02，获取查看用户信息+JsonResult GetDetail(int id)
        /// <summary>
        /// 获取查看用户信息
        /// </summary>
        /// <param name="id">主键Id</param>
        /// <returns></returns>
        public JsonResult GetDetail(int id)
        {
            var userInfo = new UserInfo() { Id = 1, Age = 14, Name = "白居易", Status = 1, Gender = 0, Image = "http://localhost:7779/Image/driver.png", Remark = "我字号白乐天，我暗恋杨贵妃", IdCard = 610155199219562654 };
            userInfo.JobInfos = new List<JobCard>();
            userInfo.JobInfos.Add(new JobCard() { ExpiryDate = "公元前852", JobCardNo = "T612054", JobTypeCardName = "大唐史官" });
            userInfo.JobInfos[0].Images = new List<string>();
            userInfo.JobInfos[0].Images.Add("http://localhost:7779/Image/driver.png");
            userInfo.JobInfos[0].Images.Add("http://localhost:7779/Image/driver.png");
            return Json(new HttpResult(userInfo), JsonRequestBehavior.AllowGet);
        } 
        #endregion

        #region 03，演示2+ActionResult Index2()
        /// <summary>
        /// 演示2
        /// </summary>
        /// <returns></returns>
        public ActionResult Index2()
        {
            return View();
        } 
        #endregion

        #region 04，演示3+ActionResult Index3()
        /// <summary>
        /// 演示3
        /// </summary>
        /// <returns></returns>
        public ActionResult Index3()
        {
            return View();
        } 
        #endregion

        #region 05，获取用户列表+JsonResult GetUserList2()
        /// <summary>
        /// 获取用户列表2
        /// </summary>
        /// <returns></returns>
        public JsonResult GetUserList2()
        {
            var modelLists = new List<UserInfo>();
            modelLists.Add(new UserInfo() { Id = 1, Age = 18, Name = "李白", Status = 1, Gender = 0, Image = "http://localhost:7779/Image/driver.png", Remark = "我是一个特别搞笑的人，他们都叫我小白", IdCard = 610124199303083650 });
            modelLists.Add(new UserInfo() { Id = 2, Age = 21, Name = "杜甫", Status = 1, Gender = 0, Image = "http://localhost:7779/Image/driver.png", Remark = "我只知道我写的诗特别多", IdCard = 610124199019932651 });
            modelLists.Add(new UserInfo() { Id = 3, Age = 14, Name = "白居易", Status = 1, Gender = 0, Image = "http://localhost:7779/Image/driver.png", Remark = "我字号白乐天，我暗恋杨贵妃", IdCard = 610155199219562654 });
            modelLists.Add(new UserInfo() { Id = 4, Age = 35, Name = "李商隐", Status = 1, Gender = 0, Image = "http://localhost:7779/Image/driver.png", Remark = "商女不知亡国恨，隔江犹唱后庭花", IdCard = 610124199515456952 });
            modelLists.Add(new UserInfo() { Id = 5, Age = 16, Name = "汪伦", Status = 1, Gender = 0, Image = "http://localhost:7779/Image/driver.png", Remark = "我是上面小白的好基友", IdCard = 610124198636254187 });
            modelLists.Add(new UserInfo() { Id = 6, Age = 45, Name = "李清照", Status = 1, Gender = 1, Image = "http://localhost:7779/Image/driver.png", Remark = "我是这里面唯一的女的,那个小白就是我家亲戚", IdCard = 610124199835261487 });
            return Json(new { total = modelLists.Count, rows = modelLists }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        public ActionResult TestPage()
        {
            return View();
        }



    }
}
