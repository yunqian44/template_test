/**
* 数据请求
*/
var yq_common_ctrl = {
    /**
    * 查询
    */
    ajax_get: function (url, data, _cb, params, debug) {
        var param = { 'method': 'get' };
        this._ajax(url, data, _cb, yq_common_data.merge(params,param), debug);
    },
    /**
    * 新增
    */
    ajax_post: function (url, data, _cb, params, debug) {
        var param = { 'method': 'post' };
        this._ajax(url, data, _cb, yq_common_data.merge(params, param), debug);
    },
    /**
    * 编辑
    */
    ajax_put: function (url, data, _cb, params, debug) {
        var param = { 'method': 'put' };
        if (data.id == undefined || data.id == null) {

        } else {
            url = url + '?id=' + data.id;
        }
        this._ajax(url, data, _cb, yq_common_data.merge(params, param), debug);
    },
    /**
    * 删除
    */
    ajax_delete: function (url, data, _cb, params, debug) {
        var param = { 'method': 'delete' };
        if (data.id == undefined || data.id == null) {

        } else {
            url = url + '?id=' + data.id;
        } 
        this._ajax(url  , data, _cb, yq_common_data.merge(params, param), debug);
    },
    _ajax: function (url, data, _cb, params, debug) {
        var method = params.method ? params.method : 'get';
        var timeout = params.timeout ? params.timeout : 30*1000;
        $.ajax({
            //headers: {
            //    token: yq_cookie.getUserInfo().Token_Token,
            //    type : 1
            //},
            url: url,
            method: method,
            dataType: 'json',
            data: data,
            timeout: timeout,
            async: true, 
            success: function (ret, data) {
                if (ret && ret['code'] == 17)
                {
                    window.location.href="/"
                }
                if (ret && ret['code'] == 1) {
                    _cb(ret, data);
                } else {
                    yq_toastr.warning(ret.msg);
                }
            },
            error: function (ret) {
                if (ret.readyState == 0) {

                } else {
                    yq_toastr.warning("服务器异常请稍后！");
                }
            }
        });
    }
}
/**
* 数据处理
*/
var yq_common_data = {
    toString : Object.prototype.toString,
    isArray : function(val){
        return this.toString.call(val) === '[object Array]';
    },

    /**
     * Determine if a value is an ArrayBuffer
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an ArrayBuffer, otherwise false
     */
    isArrayBuffer : function(val) {
        return this.toString.call(val) === '[object ArrayBuffer]';
    },

    /**
     * Determine if a value is a FormData
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an FormData, otherwise false
     */
     isFormData : function(val) {
         return (typeof FormData !== 'undefined') && (val instanceof FormData);
     },

    /**
     * Determine if a value is a view on an ArrayBuffer
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
     */
     isArrayBufferView : function (val){
          var result;
          if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
            result = ArrayBuffer.isView(val);
          } else {
            result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
          }
          return result;
     },

    /**
     * Determine if a value is a String
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a String, otherwise false
     */
    isString : function(val) {
      return typeof val === 'string';
    },
    /**
     * Determine if a value is a Integer
     *
     *
     *  @returns {boolean} True if value is a Integer, otherwise false
     */
    isInteger: function(val){
        return typeof val === 'number' && val % 1 === 0
    },
    /**
     * Determine if a value is a Number
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Number, otherwise false
     */
    isNumber : function(val) {
      return typeof val === 'number';
    },

    /**
     * Determine if a value is undefined
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if the value is undefined, otherwise false
     */
    isUndefined : function(val) {
      return typeof val === 'undefined';
    },

    /**
     * Determine if a value is an Object
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an Object, otherwise false
     */
    isObject : function(val) {
      return val !== null && typeof val === 'object';
    },

    /**
     * Determine if a value is a Date
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Date, otherwise false
     */
    isDate : function(val) {
        return this.toString.call(val) === '[object Date]';
    },

    /**
     * Determine if a value is a File
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a File, otherwise false
     */
    isFile : function(val) {
        return this.toString.call(val) === '[object File]';
    },

    /**
     * Determine if a value is a Blob
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Blob, otherwise false
     */
    isBlob : function(val) {
        return this.toString.call(val) === '[object Blob]';
    },

    /**
     * Determine if a value is a Function
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Function, otherwise false
     */
    isFunction : function(val) {
        return this.toString.call(val) === '[object Function]';
    },

    /**
     * Determine if a value is a Stream
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Stream, otherwise false
     */
    isStream : function(val) {
      return isObject(val) && isFunction(val.pipe);
    },

    /**
     * Determine if a value is a URLSearchParams object
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a URLSearchParams object, otherwise false
     */
    visURLSearchParams : function(val) {
      return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
    },

    /**
     * Trim excess whitespace off the beginning and end of a string
     *
     * @param {String} str The String to trim
     * @returns {String} The String freed of excess whitespace
     */
    trim : function(str) {
      return str.replace(/^\s*/, '').replace(/\s*$/, '');
    },

    /**
     * Determine if we're running in a standard browser environment
     *
     * This allows axios to run in a web worker, and react-native.
     * Both environments support XMLHttpRequest, but not fully standard globals.
     *
     * web workers:
     *  typeof window -> undefined
     *  typeof document -> undefined
     *
     * react-native:
     *  navigator.product -> 'ReactNative'
     */
    isStandardBrowserEnv : function() {
      if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
        return false;
      }
      return (
        typeof window !== 'undefined' &&
        typeof document !== 'undefined'
      );
    },

    /**
     * Iterate over an Array or an Object invoking a function for each item.
     *
     * If `obj` is an Array callback will be called passing
     * the value, index, and complete array for each item.
     *
     * If 'obj' is an Object callback will be called passing
     * the value, key, and complete object for each property.
     *
     * @param {Object|Array} obj The object to iterate
     * @param {Function} fn The callback to invoke for each item
     */
    forEach : function(obj, fn) {
      // Don't bother if no value provided
      if (obj === null || typeof obj === 'undefined') {
        return;
      }

      // Force an array if not already something iterable
      if (typeof obj !== 'object' && !this.isArray(obj)) {
        /*eslint no-param-reassign:0*/
        obj = [obj];
      }

      if (this.isArray(obj)) {
        // Iterate over array values
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        // Iterate over object keys
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    },

    /**
     * Accepts varargs expecting each argument to be an object, then
     * immutably merges the properties of each object and returns result.
     *
     * When multiple objects contain the same key the later object in
     * the arguments list will take precedence.
     *
     * Example:
     *
     * ```js
     * var result = merge({foo: 123}, {foo: 456});
     * console.log(result.foo); // outputs 456
     * ```
     *
     * @param {Object} obj1 Object to merge
     * @returns {Object} Result of all merge properties
     */
    merge : function(/* obj1, obj2, obj3, ... */) {
      var result = {};
      function assignValue(val, key) {
        if (typeof result[key] === 'object' && typeof val === 'object') {
          result[key] = merge(result[key], val);
        } else {
          result[key] = val;
        }
      }

      for (var i = 0, l = arguments.length; i < l; i++) {
        this.forEach(arguments[i], assignValue);
      }
      return result;
    },
    array_merge: function (data,arr) {
        for (var i = 0; i < arr.length; i++) {
            data.push(arr[i])
        }
        return data;
    },
    time:function(str){
        
        if (str.length > 0) {
            return str.split(' - ');
        } else {
            return false;
        }
    },
    time_format:function(str){
        if (str.length > 10) {
            return str.substring(0, 10);
        } else {
            return str;
        }
    },

    /**
     * Extends object a by mutably adding to it the properties of object b.
     *
     * @param {Object} a The object to be extended
     * @param {Object} b The object to copy properties from
     * @param {Object} thisArg The object to bind function to
     * @return {Object} The resulting value of object a
     */
     extend : function(a, b, thisArg) {
        forEach(b, function assignValue(val, key) {
            if (thisArg && typeof val === 'function') {
              a[key] = bind(val, thisArg);
            } else {
              a[key] = val;
            }
        });
        return a;
    },
}

/**
* datatable 公共数据
*/
var yq_datatable = {
    /**
    * datatable创建函数
    * ele html id
    * url 接口地址 string
    * columnDefs 字段渲染 [{}]
    * columns 对应字段 [{}]
    * order排序规则 []
    * data结构需要传入的参数
    */
    init: function (ele, url, columnDefs, columns, order, data, params, searching) {
        var _data = {};
        if (arguments[5]) { _data = data; }

        var searchBool = true;
        if (searching!=undefined) { searchBool = searching;}

        var datatable = $(ele).on('preXhr.dt', function (e, settings, data) {
            //筛选条件加入到参数列表中
            if (yq_common_data.isFunction(params._cb_search_field)) {
                    params._cb_search_field(data);
                }
            }).dataTable({
            "order": [order],
            "columnDefs": columnDefs,
            "lengthChange": true,//允许改变每页显示的数据条数
            "searching": searchBool,//开启搜索功能
            "ordering"    :true,//是否启用Datatables排序
            "lengthMenu"  : [10,20,50],//改变每页显示条数列表的选项
            "processing"  : true,//显示加载信息
            "serverSide"  : true,//服务器模式
            "bStateSave": true,//状态保存
            "showColumns": true,                  //是否显示所有的列
            "destroy": true,
            "showColumns": true,                  //是否显示所有的列
            "showRefresh": true,                  //是否显示刷新按钮
            "minimumCountColumns": 1,             //最少允许的列数
            "deferRender": true,//延迟渲染
            "ajax":{
        	    "type":'GET',
        	    "url": url,//异步数据源
        	    //headers: {
        	    //    token: yq_cookie.getUserInfo().Token_Token,
        	    //    type: 1
        	    //},
        	    "data": _data,
			    "error": function (msg) {
			        yq_toastr.error("系统繁忙，请稍后再试");
		            return;
			    }
            },
            "columns": columns,
            "fnDrawCallback": function () {
                var show_col_checkbox = 1;
                if (params['show_col_checkbox'] || params['show_col_checkbox'] == 0) {
                    show_col_checkbox = params['show_col_checkbox'];
                }
               
                var api = this.api();
                var startIndex = api.context[0]._iDisplayStart;//获取到本页开始的条数
                api.column(show_col_checkbox).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
                
            },
            "rowCallback": function (row, data, index) {
                $(row).addClass("gradeX");
            },
        
            });
        return datatable;
    }
}

/**
* 数据验证
*/
var yq_common_data_validate = {
    //变红
    _append_sign: function (obj, class_name) {
        var _class = class_name ? class_name : 'unpass';
        if (!obj.hasClass(_class)) {
            obj.addClass(_class);
        }
        return false;
    },
    //取消变红
    _cancel_sign: function (obj, class_name) {
        var _class = class_name ? class_name : 'unpass';
        if (obj.hasClass(_class)) {
            obj.removeClass(_class);
        }
        return true;
    },
    //检查是否是字符串
    check_string: function (val, obj, class_name) {
        var _class_name = class_name ? class_name : '';
        if (val.length > 0) {
            return this._cancel_sign(obj, _class_name);
        } else {
            return this._append_sign(obj, _class_name);
        }

    },
    //检查是否是字符串,"-1除外"
    check_stringExt: function (val, obj, class_name) {
        var _class_name = class_name ? class_name : '';
        if (val.length > 0&&val!="-1") {
            return this._cancel_sign(obj, _class_name);
        } else {
            return this._append_sign(obj, _class_name);
        }

    },
    //检查是否是字符串
    check_stringLength: function (val, obj,minLen,maxLen, class_name) {
        var _class_name = class_name ? class_name : '';
        if (minLen <= val.length && maxLen >= val.length) {
            return this._cancel_sign(obj, _class_name);
        } else {
            return this._append_sign(obj, _class_name);
        }
    },
    //检查是否是数字
    check_number: function (val, obj, class_name) {
        var _class_name = class_name ? class_name : '';
        if (!yq_common_data.isNumber(val)) {
            return this._append_sign(obj, _class_name);
        } else {
            return this._cancel_sign(obj, _class_name);
        }
    },
    //检查是否是整型
    check_int: function (val, obj, class_name) {
        var _class_name = class_name ? class_name : '';
        if (!yq_common_data.isInteger(val)) {
            return this._append_sign(obj, _class_name);
        } else {
            return this._cancel_sign(obj, _class_name);
        }
    },
    //检查是否是数组
    check_array: function (val, obj, class_name) {
        var _class_name = class_name ? class_name : '';
        if (!yq_common_data.isArray(val)) {
            return this._append_sign(obj, _class_name);
        } else {
            return this._cancel_sign(obj, _class_name);
        }
    },
}

var yq_toastr = {
    _init: function (params) {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "progressBar": true,
            "positionClass": "toast-top-center",
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "3000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
        return toastr;
    },
    success: function (msg, params) {
        var str = msg ? msg : '操作成功';
        this._init(params).success(str);
    },
    info: function (msg, params) {
        var str = msg ? msg : '操作';
        this._init(params).info(str);
    },
    warning: function (msg, params) {
        var str = msg ? msg : '服务器异常';
        this._init(params).warning(str);
    },
    error: function (msg, params) {
        var str = msg ? msg : '服务器故障';
        this._init(params).error(str);
    },
}

var yq_layer = {   
    confirm: function (msg, _fun1, _fun2) {
        layer.confirm(msg, {
            btn: ['确定', '取消'] //按钮
        }, function (index) {
            _fun1();
            layer.close(index);
        }, function (index) {
            _fun2();
            layer.close(index);
        });
    }
}

/**
* 统计图表
*/
var yq_common_chart = {
    chart_pie: {
        pie: function (element_id, title_text, showSummaryData, summarydate,yname, color) {
            var option = {
                title: {
                    text: title_text,
                    x: 'center',
                    padding: [20, 0, 0, 0],
                    textStyle: {
                        fontSize: 15,
                        fontWeight: 'normal',
                        color: '#666'
                    },
                },
                backgroundColor: '#fff',
                legend: {
                    orient: 'horizontal',
                    left: 'center',
                    bottom: '3%',
                    data: summarydate,
                    padding: 5,
                    show: true,
                    textStyle: {
                        fontSize: 12,
                        fontWeight: 'normal',
                        color: '#666'
                    }
                }, 
                series: [
					{
					    type: 'pie',
					    radius: ['30%', '50%'],
					    avoidLabelOverlap: false,
					    data: showSummaryData,
					    itemStyle: {
					        emphasis: {
					            shadowBlur: 5,
					            shadowOffsetX: 0,
					        }
					    },
					    label: {
					        normal: {
					            show: false,
					            position: 'center'
					        },
					        emphasis: {
					            show: true,
					            textStyle: {
					                fontSize: '14',
					                fontWeight: 'bold',
					                color: '#666',
					            }
					        }
					    },
					}
                ],
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)",
                    triggerOn: 'click',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    extraCssText: 'width: auto; height: auto;',
                    textStyle: {
                        fontSize: 12,
                    }
                },
                //color: color
            };
            
            if (arguments[5] && color.length > 0) {
                option.color = color;
            }
            if (arguments[4] && yname.length > 0) {
                option.yAxis.name = yname;
            }
            var myChartNew = echarts.init(document.getElementById(element_id));
            myChartNew.setOption(option);
        },
        multi_pie: function () {

        }
    },
    chart_bar: {
        bar: function (element_id, title_text, showSummaryData, summarydate,yname, color) {
            var option = {
                title: {
                    text: title_text,
                    x: 'center',
                    padding: [20, 0, 0, 0],
                    textStyle: {
                        fontSize: 15,
                        fontWeight: 'normal',
                        color: '#666'
                    },
                } ,
                backgroundColor: '#fff',
                grid: {
                    left: '40px',
                    right: '10%',
                    top: '15%',
                    y2:90,
                    containLabel: false,
                    show: false
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    extraCssText: 'width: auto; height: auto;',
                    textStyle: {
                        fontSize: 12,
                    }
                },
                legend: {
                    show: false
                }, 
                xAxis: {
                    data: summarydate,
                    splitLine: {
                        show: false
                    }, axisLabel: {
                        interval: 0,//横轴信息全部显示
                        rotate: 45,//角倾斜显示 
                    },
                    axisTick: {
                        alignWithLabel: true
                    }
                },
                yAxis: {
                    name: '次',
                    splitLine: {
                        show: false
                    }
                },
                series: [
					{
					    name: title_text,
					    type: 'bar',
					    data: showSummaryData,
					    label: {
					        normal: {
					            textStyle: {
					                color: '#6ea8e0'
					            }
					        }
					    }
					}
                ],
            };
            if (arguments[5] && color.length > 0) {
                option.color = color;
            }
            if (arguments[4] && yname.length > 0) {
                option.yAxis.name = yname;
            }
            
            var myChartNew = echarts.init(document.getElementById(element_id));
            myChartNew.setOption(option);
        },
        multi_bar: function (element_id, title_text, showSummaryData, summarydate,yname, color) {
            var option = {
                title: {
                    text: title_text,
                    x: 'center',
                    padding: [20, 0, 0, 0],
                    textStyle: {
                        fontSize: 15,
                        fontWeight: 'normal',
                        color: '#666'
                    },
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    extraCssText: 'width: auto; height: auto;',
                    textStyle: {
                        fontSize: 12,
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                backgroundColor: '#fff',
                // legend: {
                //     data:['直接访问','邮件营销','联盟广告']
                // },
                xAxis: {
                    data: summarydate,
                    axisLabel: {
                    interval: 0,//横轴信息全部显示
                   rotate: 45,//角倾斜显示 
                }},
                yAxis: [
			        {
			            type: 'value'
			        }
                ],
                series: showSummaryData
            };
            if (arguments[5] && color.length > 0) {
                option.color = color;
            }
            if (arguments[4] && yname.length > 0) {
                option.yAxis.name = yname;
            }
            var myChartNew = echarts.init(document.getElementById(element_id));
            myChartNew.setOption(option);
        }
    },
    chart_line: {
        line: function (element_id, title_text, showSummaryData, summarydate, yname, color) {
            var option = {
                title: {
                    text: title_text,
                    x: 'center',
                    padding: [20, 0, 0, 0],
                    textStyle: {
                        fontSize: 15,
                        fontWeight: 'normal',
                        color: '#666'
                    },
                },
                tooltip: {
                    trigger: 'axis'
                },
                backgroundColor: '#fff',
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    boundaryGap: false,
                    data: summarydate
                },
                yAxis: {
                    type: 'value'
                },
                series: showSummaryData,
                legend: {
                    show: false
                },
            };
            if (arguments[5] && color.length > 0) {
                option.color = color;
            }
            if (yname != null && yname != undefined && yname.length > 0) {
                option.yAxis.name = yname;
            }
            var myChartNew = echarts.init(document.getElementById(element_id));
            myChartNew.setOption(option);
        },
        multi_line: function (element_id, title_text, showSummaryData, summarydate, yname, color) {
            var option = {
                title: {
                    text: title_text,
                    x: 'center',
                    padding: [20, 0, 0, 0],
                    textStyle: {
                        fontSize: 15,
                        fontWeight: 'normal',
                        color: '#666'
                    },
                },
                tooltip: {
                    trigger: 'axis'
                },
                backgroundColor: '#fff',
                grid: {
                    left: '3%',
                    right: '4%', y2: 80,
                    containLabel: true
                },
                xAxis: {   axisLabel: {
                    interval: 0,//横轴信息全部显示
                    rotate: 45,//角倾斜显示 
                },
                    boundaryGap: false,
                    data: summarydate
                },
                yAxis: {
                    type: 'value'
                },
                type: 'line',
                series: showSummaryData,
                legend: {
                    show: false
                },
            };
            if (arguments[5] && color.length > 0) {
                option.color = color;
            }
            if (yname != null && yname != undefined && yname.length > 0) {
                option.yAxis.name = yname;
            }
            var myChartNew = echarts.init(document.getElementById(element_id));
            myChartNew.setOption(option);
        }
    },
}
  
//var yq_cookie = {
//    getData: function (name) {
//        return JSON.parse($.cookie(name));
//    },
//    setData: function (name, data) {
//        return $.cookie(name, JSON.stringify(data), { expires: 7, path: '/' });//必须设置path为/
//    },
//    getUserInfo: function () {
//        return this.getData('_currentUserData');
//    },
//}

var yq_auth = {
    check_auth: function (id) {
        var auth = yq_cookie.getUserInfo().Roles;
        if ($.inArray(id, auth) > -1) {
            return true;
        } else {
            return false;
        }
    }
};

//判断下拉列表是否未选中值
var selectValIsEmpty = function (v) {
    if (v==undefined|| v == null || v == "" || v == "请选择") {
        return true;
    }
    return false;
}

//url处理方法
var yq_url = {
    //url添加参数
    getUrl: function (key, val, url) {
        var url = url ? url : window.location.href;
        var urlArr = url.split("?");
        // 处理默认的分页冒号的问题
        var currUrl = urlArr[0];
        var currUrlArr = urlArr[0].split("/");
        var currUrlArrLen = currUrlArr.length;
        var newUrlArr = new Array();
        for (var i = 0; i < currUrlArrLen; i++) {
            if (currUrlArr[i].indexOf(":") != -1 && i > 2) {

            }
            else {
                newUrlArr.push(currUrlArr[i]);
            }
        };
        url = newUrlArr.join("/");
        if (urlArr.length == 1) {
            url += "?" + key + "=" + val;
            return url;
        }

        var paramsArrNew = new Array();
        var params = urlArr[1];
        var paramsArr = params.split('&');
        paramsArrNew = paramsArr;
        var flag = false;
        for (var i = paramsArr.length - 1; i >= 0; i--) {
            var tmpArr = paramsArr[i].split("=");
            if (tmpArr[0] == key) {
                if (tmpArr.length == 1) {
                    tmpArr.push(val);
                }
                else {
                    tmpArr[1] = val;
                }
                flag = true;
            }
            // 切换查询条件,清空关键字搜索条件
            // key != 'key' 遇到 key 清空就好了
            if (key != 'key' && tmpArr[0] == 'key') {
                tmpArr[1] = '';
            }
            paramsArrNew[i] = tmpArr.join('=');

        };
        if (!flag) { paramsArr.push(key + '=' + val) };
        return url + "?" + paramsArrNew.join('&');
    },
    //获取url上参数
    getUrlParam: function (urls, params) {
        String.prototype.getQueryString = function(name){
            var reg = new RegExp("(^|&|\\?)"+ name +"=([^&]*)(&|$)"), r;
            if (r=this.match(reg)) return unescape(r[2]); return null;
        };
        return urls.getQueryString(params);
    },
    getUrlParams: function (url, decodeType) {
        var args = {};
        var arr = url.replace(/#.+/, '').split('?');

        if (arr.length == 2) {
            var query = arr[1];
            var pairs = query.split('&');

            for (var i = 0; i < pairs.length; i++) {
                var pos = pairs[i].indexOf('='); //查找name=value
                if (pos == -1) continue; //如果没有找到就跳过
                var argname = pairs[i].substring(0, pos); //提取name
                var value = pairs[i].substring(pos + 1); //提取value
                if (decodeType == 1) {
                    args[argname] = unescape(value); //存为属性
                } else {
                    args[argname] = decodeURIComponent(value); //存为属性
                }
            }
        }

        return args;
    }
}

//基本参数接口
var yq_base_data = {
    //获取设备类型
    get_device_type: function (_cb) {
        var _data;
        yq_common_ctrl.ajax_get('/Api/DeviceType', { is_used: 1,type:0 }, function (ret) {
            switch (ret['code']) {
                case 0:
                    if (ret['data'].length > 0) {
                        _data = ret['data'];
                    } else {
                        _data = [];
                    }
                    break;
                default:
                    _data = [];
                    break;
            }
            _cb(_data);
        });
    },
    //获取设备类型
    get_device_type_topLevel: function (_cb) {
        var _data;
        yq_common_ctrl.ajax_get('/Api/DeviceType/GetTopLevel', { is_used: 1}, function (ret) {
            switch (ret['code']) {
                case 0:
                    if (ret['data'].length > 0) {
                        _data = ret['data'];
                    } else {
                        _data = [];
                    }
                    break;
                default:
                    _data = [];
                    break;
            }
            _cb(_data);
        });
    },
    //获取检查类型(1检查 2保养 3维修)
    get_device_set_type: function (type,_cb) {
        yq_common_ctrl.ajax_get('/Api/DeviceSet', { type: type }, function (ret) {
            switch (ret['code']) {
                case 0:
                    if (ret['data'].length > 0) {
                        _data = ret['data'];
                    } else {
                        _data = [];
                    }
                    break;
                default:
                    _data = [];
                    break;
            }
            _cb(_data);
        });
        
    },
    //获取组织列表
    get_org_list: function (_cb) {
        yq_common_ctrl.ajax_get('/Api/Orgs', {}, function (ret) {
            var _data;
            switch (ret['code']) {
                case 0:
                    if (ret['data'].length > 0) {
                        _data = ret['data'];
                    } else {
                        _data = [];
                    }
                    break;
                default:
                    _data = [];
                    break;
            }
            _cb(_data);
        });
    },
    //获取当前切换的组织列表
    get_current_org_list: function (_cb) {
        yq_common_ctrl.ajax_get('/Api/orgs/GetCurrentOrg', {}, function (ret) {
            var _data;
            switch (ret['code']) {
                case 0:
                    if (ret['data'].length > 0) {
                        _data = ret['data'];
                    } else {
                        _data = [];
                    }
                    break;
                default:
                    _data = [];
                    break;
            }
            _cb(_data);
        });
    },
    get_set_table: function (device_type_id, type, _cb) {
        var data = { DeviceTypeId: device_type_id, type: type };
        if (device_type_id == '-1') {
            return false;
        }
        yq_common_ctrl.ajax_get('/Api/DeviceGuides/GetList', data, function (ret) {
            switch (ret['code']) {
                case 0:
                    if (ret['data'].length > 0) {
                        _data = ret['data'];
                    } else {
                        _data = [];
                    }
                    break;
                default:
                    _data = [];
                    break;
            }
            _cb(_data);
        });
    },
    //设置
    get_user: function (org_id, _cb) {
        var data = { orgId: org_id };
        yq_common_ctrl.ajax_get('api/', data, function (ret) {
            switch (ret['code']) {
                case 0:
                    if (ret['data'].length > 0) {
                        _data = ret['data'];
                    } else {
                        _data = [];
                    }
                    break;
                default:
                    _data = [];
                    break;
            }
            _cb(_data);
        });
    }
};

var yq_tree = {
    _traverseNode: function (node, jq_obj) {
        jq_obj.append("<option value='" + node.id + "'>" + this._append_html(node.Level) +node.text + "</option>");
    },
    traverseTree: function (node, jq_obj) {
        if (!node) {
            return;
        }
        this._traverseNode(node, jq_obj);
        if (node.nodes && node.nodes.length > 0) {
            var i = 0;
            for (i = 0; i < node.nodes.length; i++) {
                this.traverseTree(node.nodes[i], jq_obj);
            }
        }
    },
    _append_html: function (level) {
        var html = "&nbsp;&nbsp;";
        for (var i = level; i > 0; i--) {
            html = html + html;
        }
        return html + '&lfloor;&nbsp;';
    }
};

//导出操作
var yq_export = {
    //导出excel
    excel: function (ids,api) {

    },
    //导出图片
    image: function (ids, api) {

    }
}

var yq_enum = {
    PersonStatu:{
        In:0,//已进场
        Out:1//已退场
    },
    GuideType :{
        DeviceCheck: 1,  /// 检查
        DeviceCare: 2,  /// 保养
        DeviceRepair: 3  /// 维修
    },
    DevicePlanType: {
        DeviceCheck: 1,//设备检查
        DeviceCare:2//设备保养
    },
    DevicePlanStatus:{
        No:0,//已终止
        Yes:1,//已发布
    },
    get_Enabled: function (flag) {
        if (flag || flag > 0) {
            return '<span class="btn btn-xs btn-outline btn-primary">' + "已启用" + '</span>';
        } else {
            return '<span class="btn btn-xs btn-outline btn-danger">' + "已禁用" + '</span>';
        }
    }
}


/*判断时间的操作*/
var bf_time_valid = {
    /**
	 * 日期解析，字符串转日期
	 * @param dateString 可以为2017-02-16，2017/02/16，2017.02.16
	 * @returns {Date} 返回对应的日期对象
	 */
    dateParse: function (dateString) {
        var SEPARATOR_BAR = "-";
        var SEPARATOR_SLASH = "/";
        var SEPARATOR_DOT = ".";
        var dateArray, dateTime;
        dateTime = dateString.split(' ');
        var h = dateTime[1].split(':')[0];
        var m = dateTime[1].split(':')[1];
        if (dateString.indexOf(SEPARATOR_BAR) > -1) {
            dateArray = dateTime[0].split(SEPARATOR_BAR);
        } else if (dateString.indexOf(SEPARATOR_SLASH) > -1) {
            dateArray = dateTime[0].split(SEPARATOR_SLASH);
        } else {
            dateArray = dateTime[0].split(SEPARATOR_DOT);
        }
        return new Date(dateArray[0], dateArray[1] - 1, dateArray[2], h, m);
    },
    /**
	 * 日期比较大小
	 * compareDateString大于dateString，返回1；
	 * 等于返回0；
	 * compareDateString小于dateString，返回-1
	 * @param dateString 日期
	 * @param compareDateString 比较的日期
	 */
    dateCompare: function (dateString, compareDateString) {
        var dateTime = bf_time_valid.dateParse(dateString).getTime();
        var compareDateTime = bf_time_valid.dateParse(compareDateString).getTime();
        if (compareDateTime > dateTime) {
            return 1;
        } else if (compareDateTime == dateTime) {
            return 0;
        } else {
            return -1;
        }
    },
    /**
	 * 判断日期是否在区间内，在区间内返回true，否返回false
	 * @param dateString 日期字符串
	 * @param startDateString 区间开始日期字符串
	 * @param endDateString 区间结束日期字符串
	 * @returns {Number}
	 */
    isDateBetween: function (dateString, startDateString, endDateString) {
        var flag = false;
        var startFlag = (bf_time_valid.dateCompare(dateString, startDateString) < 1);
        var endFlag = (bf_time_valid.dateCompare(dateString, endDateString) > -1);
        if (startFlag && endFlag) {
            flag = true;
        }
        return flag;
    },
    /**
	 * 判断日期区间[startDateCompareString,endDateCompareString]是否完全在别的日期区间内[startDateString,endDateString]
	 * 即[startDateString,endDateString]区间是否完全包含了[startDateCompareString,endDateCompareString]区间
	 * 在区间内返回true，否返回false
	 * @param startDateString 新选择的开始日期，如输入框的开始日期
	 * @param endDateString 新选择的结束日期，如输入框的结束日期
	 * @param startDateCompareString 比较的开始日期
	 * @param endDateCompareString 比较的结束日期
	 * @returns {Boolean}
	 */
    isDatesBetween: function (startDateString, endDateString,
			startDateCompareString, endDateCompareString) {
        var flag = false;
        var startFlag = (bf_time_valid.dateCompare(startDateCompareString, startDateString) < 1);
        var endFlag = (bf_time_valid.dateCompare(endDateCompareString, endDateString) < 1);
        if (startFlag && endFlag) {
            flag = true;
        }
        return flag;
    },
}

$(function () {
    if (jQuery.validator) {
        jQuery.extend(jQuery.validator.messages, {
            required: "必选字段",
            remote: "请修正该字段",
            email: "请输入正确格式的电子邮件",
            url: "请输入合法的网址",
            date: "请输入合法的日期",
            dateISO: "请输入合法的日期 (ISO).",
            number: "请输入合法的数字",
            digits: "只能输入整数",
            creditcard: "请输入合法的信用卡号",
            equalTo: "请再次输入相同的值",
            accept: "请输入拥有合法后缀名的字符串",
            maxlength: jQuery.validator.format("请输入一个 长度最多是 {0} 的字符串"),
            minlength: jQuery.validator.format("请输入一个 长度最少是 {0} 的字符串"),
            rangelength: jQuery.validator.format("请输入 一个长度介于 {0} 和 {1} 之间的字符串"),
            range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
            max: jQuery.validator.format("请输入一个最大为{0} 的值"),
            min: jQuery.validator.format("请输入一个最小为{0} 的值")
        });
    }
});

/*
 * 时间组件
*/
var yq_time = {
    getNowTime: function () {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var time_content = year + "-" + month + "-" + date;
        return time_content;
    },
    Tomorrow: function () {
        var day3 = new Date();
        day3.setTime(day3.getTime()+24*60*60*1000);
        return day3.getFullYear()+"-" + (day3.getMonth()+1) + "-" + day3.getDate();
    }
}

/*
 * 
*/
var common = {
    checkbox: function (ele) {
        //debug($(ele + " th:eq(0) input[type='checkbox']").prop("checked")); return
        if ($(ele + " th:eq(0) input[type='checkbox']").prop("checked")) {
            $(ele + " input[type='checkbox']").attr("checked", true);

            $(ele + " input[type='checkbox']").each(function (value, index) {
                debug($(value));
            });
        } else {
            $(ele + " input[type='checkbox']").attr("checked", false);

            $(ele + " input[type='checkbox']").each(function (value, index) {
                debug($(value));
            });
        }
    },
};

var yq_template = {
    device_status: function (status) {

        switch (status) {
            case 0:
                str = '未完成';
                break;
            case 1:
                str = '已完成';
                break;
            default:
                str = '-';
                break;
        }

        return str;
    },
    //保养结果
    care_result: function (data) {
        if (data) {
            return '<span class="btn btn-xs btn-outline btn-danger">有问题</span>';
        } else {
            return '<span class="btn btn-xs btn-outline btn-primary">无问题</span>';
        }
    },
    check_result: function (data) {
        if (data) {
            return '<span class="btn btn-xs btn-outline btn-danger">有隐患</span>';
        } else {
            return '<span class="btn btn-xs btn-outline btn-primary">无隐患</span>';
        }
    },
    ys_result: function (data) {
        if (data) {
            return '<span class="btn btn-xs btn-outline btn-danger">不合格</span>';
        } else {
            return '<span class="btn btn-xs btn-outline btn-primary">合格</span>';
        }
    }
}



var debug = function (data) {
    console.log(JSON.stringify(data));
    //alert(JSON.stringify(data));
}

