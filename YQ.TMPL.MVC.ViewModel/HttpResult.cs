using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YQ.TMPL.MVC.ViewModel
{
    /// <summary>
    /// Api返回数据格式
    /// </summary>
    public class HttpResult
    {
        /// <summary>
        /// 本构造函数 默认为 处理成功
        /// </summary>
        public HttpResult()
        {
        }
        /// <summary>
        /// 本构造函数 默认为 处理成功，且将返回数据传入
        /// </summary>
        /// <param name="d">返回数据</param>
        public HttpResult(dynamic d)
        {
            this.code = 1;
            this.data = d;
        }
        /// <summary>
        /// 默认作为出现错误时使用；
        /// </summary>
        /// <param name="code">错误码</param>
        /// <param name="msg">错误信息</param>
        public HttpResult(int code, string msg)
        {
            this.code = code;
            this.msg = msg;
        }

        public int code { get; set; }
        public string msg { get; set; }
        public dynamic data { get; set; }
    }


    /// <summary>
    /// Api返回数据格式
    /// </summary>
    public class HttpResult<T> : HttpResult where T : class
    {
        public HttpResult()
        {
            this.code = 1;
        }
        public HttpResult(T d)
            : this()
        {
            this.data = d;
        }

        public HttpResult(int code, string msg)
        {
            this.code = code;
            this.msg = msg;
        }

        public new T data { get; set; }
    }
}
