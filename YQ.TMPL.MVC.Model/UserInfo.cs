using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YQ.TMPL.MVC.Model
{
    public class UserInfo
    {
        /// <summary>
        /// 主键Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 姓名
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 性别
        /// </summary>
        public int Gender { get; set; }

        /// <summary>
        /// 年龄
        /// </summary>
        public int Age { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }

        /// <summary>
        /// 图像
        /// </summary>
        public string Image { get; set; }

        /// <summary>
        /// 状态（0:无效，1:有效）
        /// </summary>
        public int Status { get; set; }

        /// <summary>
        /// 身份证号
        /// </summary>
        public long IdCard { get; set; }


        public List<JobCard> JobInfos { get; set; }
    }

    public class JobCard
    {
        public string JobTypeCardName { get; set; }

        public string JobCardNo { get; set; }

        public string ExpiryDate { get; set; }

        public List<string> Images { get; set; }
    }
}
