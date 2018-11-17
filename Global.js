/**
 * @author  Jack on 2018/6/12  https://github.com/JackChengGZ/
 * @description JackCheng个人封装的一些全局方法,开发中大部分能用到,采用简单的对象封装
 * @version 0.0.1
 */
module.exports ={
	/**
	 * @method getUrlPara:获取url后面特定的参数值
	 * @param {string} key:需要获取参数值对应的key
	 * @returns {*}
	 * @example
	 *  www.jackgang.com?hello=world
	 *  G.getUrlPara('hello')
	 *  world
	 */
	getUrlPara:function(key){
		var para = window.location.search;
		if( para ){
			var arr = para.split('?')[1].split('&'),
				len = arr.length,
				obj = {};
			for(var i = 0; i < len; i++){
				var v = arr[i].split('='),
					k = v[0],
					value = v[1] ? v[1] : '';
				obj[k] = value;
			}
			if( !key ){	//无key值，取全部
				console.log("不存在"+key);
				return obj;
			}else{	//有key值，取key值对应值
				return obj[key];
			}
		}else{
			return '';
		}
	},
	 /**
	 * @method getUserAgent:获取浏览器信息
	 * @returns {string}
	 * @example
	 * G.getUserAgent()
	 */
	getUserAgent : function(){
		var browser = window.navigator.userAgent.toLowerCase();
		return browser;
	},
	/**
	 * @method getUrlPath:获取URL的路径部分(就是文件地址)转为数组了
	 * @param {number} ind:获取数组中的第n个值
	 * @returns {string}
	 * @example
	 * G.getUrlPath(1)
	 */
	getUrlPath : function(ind){
		var path = window.location.pathname;
		if( path ){
			var arr = path.split('/'),
				arr_val = [];
			for(var i = 0; i < arr.length; i++){
				if( arr[i] ){
					arr_val.push(arr[i]);
				}
			}
			if( typeof ind == 'undefined' ){
				return arr_val[arr_val.length-1];
			}else{
				return arr_val[ind];
			}
		}else{
			return '';
		}
	},
	/**
	 * @method timeDown:一个定时的方法，多用于发送短信验证码
	 * @param {number} time:定时时间为多少秒
	 * @param {function} each:回调函数 定时进行中做的事可以传一个参数
	 * @param {function} call:回调函数 定时结束后要做的事
	 * @example
	 * G.timeDown(60,function(t){
	 *     console.log(t+'秒之后可重发'); 
	 * },function(){
	 *     console.log('重新发送'); 
	 * })
	 */
	timeDown : function(time,each,call){
		var date = new Date(),
			StartTime = date.getTime();
		aa();
		var t = setInterval(aa,1000);
		function aa(){
			var date = new Date(),
				ThisTime = date.getTime();
			var desc = ThisTime - StartTime;
			//在这里没有采用time--的写法,而是用前一个时间减去现在的时间是因为代码在执行的过程中也会消耗一定的时间,如果参数time的值过大，就会有一定的影响
			var showTime = time - parseInt(desc/1000);
			if( typeof each == 'function' ){
				each(showTime);
			}
			if( showTime <= 0 ){
				clearInterval(t);
				if( typeof call == 'function' ){
					call();
				}
			}
		}
	},
	/**
	 * @method setSessionStorage:记录数据,用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据
	 * @method getSessionStorage:读取存储的数据
	 * @param {string} pathname:存储对象Storage的key
	 * @param {string} key:存储对象的key
	 * @param {string} value:存储对象的value
	 * @example
	 * G.setSessionStorage('user','name','jack') //key:user  value:{name:jack}
	 * G.getSessionStorage('user')   //  {name:jack}
	 * 采用对象的方式存储可能之后对数据的获取和查看比较清晰
	 */
	setSessionStorage : function(pathname,key,value){//  记录数据
		var memory = this.getSessionStorage(pathname);
		memory[key] = value;
		window.sessionStorage.setItem(pathname,JSON.stringify(memory));
	},
	getSessionStorage : function(pathname){   //读取存储的数据
		var session = JSON.parse(window.sessionStorage.getItem(pathname));
		if( !session ){
			session = {};
		}
		return session;
	},
	 /**
	 * @method checkReg:利用正则的验证(通常在表单比较多)
	 * @param {string} str:需要检验的字符串
	 * @param {string} type:需要检验的字符串类型:email phone tel number english text chinese lower upper
	 * @example
	 * G.checkReg('165226226326','phone');
	 * result：false;
	 * 可以根据需要扩展,正则可以根据需要修改
	 */
	checkReg:function(str,type){
		switch (type) {
			case 'username':
				return /^[_A-Za-z0-9]{6,16}$/.test(str);
			case 'password':
				return /^[\w~!@#$%^&*()_+{}:"<>?\-=[\];\',.\/A-Za-z0-9]{6,16}$/.test(str);
			case 'email':
				return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
			case 'phone':
				return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
			case 'tel':
				return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
			case 'number':
				return /^[0-9]$/.test(str);
			case 'english':
				return /^[a-zA-Z]+$/.test(str);
			case 'text':
				return /^\w+$/.test(str);
			case 'chinese':
				return /^[\u4E00-\u9FA5]+$/.test(str);
			case 'lower':
				return /^[a-z]+$/.test(str);
			case 'upper':
				return /^[A-Z]+$/.test(str);
			default:
				return true;
		}	
	},
	 /**
	 * @method checkPwd:检测密码强度
	 * @param {string} str:需要检验的字符串
	 * @example
	 * G.checkPwd('16132fdghsfdsg&(*GKJK_');
	 * result：4;
	 * 正则可以根据需要修改
	 */
	checkPwd: function(str) {
		var nowLv = 0;
		if (str.length < 6) {
			return nowLv
		}
		if (/[0-9]/.test(str)) {
			nowLv++
		}
		if (/[a-z]/.test(str)) {
			nowLv++
		}
		if (/[A-Z]/.test(str)) {
			nowLv++
		}
		if (/[\.|-|_]/.test(str)) {
			nowLv++
		}
		return nowLv;
	},
	/**
	 * @method trim:去除空格
	 * @param {string} str:需要去除空格的字符串
	 * @param {number} type:1-所有空格  2-前后空格  3-前空格 4-后空格
	 * @example
	 * G.trim('  1235abcd',1);
	 * result:1235abcd;
	 */
	trim: function(str, type) {
		switch (type) {
			case 1:
				return str.replace(/\s+/g, "");
			case 2:
				return str.replace(/(^\s*)|(\s*$)/g, "");
			case 3:
				return str.replace(/(^\s*)/g, "");
			case 4:
				return str.replace(/(\s*$)/g, "");
			default:
				return str;
		}
	},
	/**
	 * @method changeCase:大小写的转换
	 * @param {string} str:需要转换的字符串
	 * @param {number} type:1-首字母大写  2-首字母小写  3-大小写转换 4-全部大写  5-全部小写
	 * @example
	 * G.trim('abcdef',1);
	 * result:Abcdef;
	 */
	changeCase: function(str, type) {
		function ToggleCase(str) {
			var itemText = ""
			str.split("").forEach(
				function(item) {
					if (/^([a-z]+)/.test(item)) {
						itemText += item.toUpperCase();
					} else if (/^([A-Z]+)/.test(item)) {
						itemText += item.toLowerCase();
					} else {
						itemText += item;
					}
				});
			return itemText;
		}
		switch (type) {
			case 1:
				return str.replace(/\b\w+\b/g, function(word) {
					return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
				});
			case 2:
				return str.replace(/\b\w+\b/g, function(word) {
					return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
				});
			case 3:
				return ToggleCase(str);
			case 4:
				return str.toUpperCase();
			case 5:
				return str.toLowerCase();
			default:
				return str;
		}
	},
	/**
	 * @method replaceAll:字符串替换
	 * @param {string} str:字符串
	 * @param {RegExp} AFindText:要替换的字符或者正则表达式（不要写g）
	 * @param {string} ARepText:替换成什么
	 * @example
	 * G.replaceAll('这里是上海，中国第三大城市，广东省省会，简称穗，','上海','广州');
	 * result:"这里是广州，中国第三大城市，广东省省会，简称穗，";
	 */
	replaceAll: function(str, AFindText, ARepText) {
		raRegExp = new RegExp(AFindText, "g");
		return str.replace(raRegExp, ARepText);
	},
	/**
	 * @method formatText:字符串格式化
	 * @param {string} str:字符串
	 * @param {number} size:字符串按照几个分割，默认值为3
	 * @param {string} delimiter:以什么样的形式分割，默认值是','
	 * @example
	 * G.formatText('1234567890');
	 * result:'1,234,567,890';
	 */
	formatText: function(str, size, delimiter) {
		var _size = size || 3,
			_delimiter = delimiter || ',';
		var regText = '\\B(?=(\\w{' + _size + '})+(?!\\w))';
		var reg = new RegExp(regText, 'g');
		return str.replace(reg, _delimiter);
	},
	/**
	 * @method removeRepeatArray:数组去重
	 * @param {Array} arr:需要去重的数组
	 * @example
	 * G.removeRepeatArray([1,5,6,2,6,4,3,4]);
	 * result: [1, 5, 6, 2, 4, 3];
	 */
	removeRepeatArray: function(arr) {
		return arr.filter(function(item, index, self) {
			return self.indexOf(item) === index;
		});
		//es6
		//return Array.from(new Set(arr))
	},	
	/**
	 * @method upsetArr:数组顺序打乱
	 * @param {Array} arr:需要顺序打乱的数组
	 * @example
	 * G.upsetArr([1,5,6,2,6,4,3,4]);
	 * result: [1,5,6,6,2,4,3,4];
	 */
	upsetArr: function(arr) {
		return arr.sort(function() {
			return Math.random() - 0.5
		});
	},
	/**
	 * @method sumArr:数组求和
	 * @param {Array} arr:针对数字类型的数组
	 * @example
	 * G.sumArr([1,5,6,2,6,4,3,4]);
	 * result: 31;
	 */
	sumArr: function(arr) {
		return arr.reduce(function(pre, cur) {
			return pre + cur
		})
	},
	/**
	 * @method removeArrayForValue:筛选数组删除值为'val'的数组元素
	 * @param {Array} arr:需要去除元素的数组
	 * @param {string} val:需要去除的val
	 * @param {string} type:去除类似val的
	 * @example
	 * G.removeArrayForValue(['test','test1','test2','test','aaa'],'test','%')
	 * result: ["aaa"]   带有'test'的都删除;
	 * G.removeArrayForValue(['test','test1','test2','test','aaa'],'test')
	 * result：["test1", "test2", "aaa"]  //数组元素的值全等于'test'才被删除
	 */
	removeArrayForValue: function(arr, val, type) {
		return arr.filter(function(item) {
			return type ? item.indexOf(val) === -1 : item !== val
		})
	},
	/**
	 * @method getFontSize:适配rem,默认是font-size:100px;可以修改
	 * @example
	 * G.getFontSize()
	 */
	getFontSize: function() {
		var doc = document,
			win = window;
		var docEl = doc.documentElement,
			resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
			recalc = function() {
				var clientWidth = docEl.clientWidth;
				if (!clientWidth) return;
				//如果屏幕大于750（750是根据我效果图设置的，具体数值参考效果图），就设置clientWidth=750，防止font-size会超过100px
				if (clientWidth > 750) {
					clientWidth = 750
				}
				//设置根元素font-size大小
				docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
			};
		//屏幕大小改变，或者横竖屏切换时，触发函数
		win.addEventListener(resizeEvt, recalc, false);
		//文档加载完成时，触发函数
		doc.addEventListener('DOMContentLoaded', recalc, false);
	},
	/**
	 * @method getEndTime:到某一个时间的倒计时
	 * @param {string|number} endTime:到某一个时间的毫秒数
	 * @example
	 * G.getEndTime(1529925185169)
	 * 剩余时间10天 9小时 54 分钟18 秒
	 */	
	getEndTime: function(endTime) {
		// var startDate = new Date(); //开始时间，当前时间
		// var endDate = new Date(endTime); //结束时间，需传入时间参数
		// var t = endDate.getTime() - startDate.getTime(); //时间差的毫秒数

		var startDate = new Date(); //开始时间，当前时间
		var t = endTime - startDate.getTime(); //时间差的毫秒数
		var d = 0,
			h = 0,
			m = 0,
			s = 0;
		if (t >= 0) {
			d = Math.floor(t / 1000 / 3600 / 24);
			h = Math.floor(t / 1000 / 60 / 60 % 24);
			m = Math.floor(t / 1000 / 60 % 60);
			s = Math.floor(t / 1000 % 60);
			return "剩余时间" + d + "天 " + h + "小时 " + m + " 分钟" + s + " 秒";
		} else {
			return '时间错误!!!';
		}
	},
	/**
	 * @method randomColor:随机生成一个颜色
	 * @example
	 * G.randomColor()
	 */	
	randomColor: function() {
		//randomNumber是下面定义的函数
		//写法1
		//return 'rgb(' + this.randomNumber(255) + ',' + this.randomNumber(255) + ',' + this.randomNumber(255) + ')';

		//写法2
		return '#' + Math.random().toString(16).substring(2).substr(0, 6);

		//写法3
		//var color='#',_index=this.randomNumber(15);
		//for(var i=0;i<6;i++){
		//color+='0123456789abcdef'[_index];
		//}
		//return color;
	},
	/**
	 * @method setUrlPrmt:设置url参数  可以用于拼接url+G.setUrlPrmt()
	 * @param {object} obj:一个对象
	 * @example
	 * G.setUrlPrmt({'a':1,'b':2})
	 * a=1&b=2
	 */	
	setUrlPrmt: function(obj) {
		var _rs = [];
		for (var p in obj) {
			if (obj[p] != null && obj[p] != '') {
				_rs.push(p + '=' + obj[p])
			}
		}
		return _rs.join('&');
	},
	/**
	 * @method upDigit:现金额大写转换函数
	 * @param {number} n:需要转换的金额
	 * @example
	 * G.upDigit(168752632)
	 * "人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
	 */	
	upDigit: function(n) {
		var fraction = ['角', '分', '厘'];
		var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
		var unit = [
			['元', '万', '亿'],
			['', '拾', '佰', '仟']
		];
		var head = n < 0 ? '欠人民币' : '人民币';
		n = Math.abs(n);
		var s = '';
		for (var i = 0; i < fraction.length; i++) {
			s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
		}
		s = s || '整';
		n = Math.floor(n);
		for (var i = 0; i < unit[0].length && n > 0; i++) {
			var p = '';
			for (var j = 0; j < unit[1].length && n > 0; j++) {
				p = digit[n % 10] + unit[1][j] + p;
				n = Math.floor(n / 10);
			}
			s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
			//s = p + unit[0][i] + s;
		}
		return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
	},
	/**
	 * @method filterParams:清除对象中值为空的属性
	 * @param {object} obj:目标对象
	 * @example
	 * G.filterParams({a:"",b:null,c:"010",d:123});
	 * Object {c: "010", d: 123}
	 */	
	filterParams: function(obj) {
		var _newPar = {};
		for (var key in obj) {
			if ((obj[key] === 0 || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
				_newPar[key] = obj[key];
			}
		}
		return _newPar;
	},
	/**
	 * @method setCookie:设置cookie
	 * @method getCookie:获取cookie
	 * @method removeCookie:删除cookie
	 * @param {string} name:cookie的键
	 * @param {string} value:cookie的值
	 * @param {number} iDay:保留时间
	 * @example
	 * G.setCookie('name','Jack',2);//在file:///类型下不能设置
	 */	
	setCookie: function(name, value, iDay) {
		var oDate = new Date();
		oDate.setDate(oDate.getDate() + iDay);
		document.cookie = name + '=' + value + ';expires=' + oDate;
	},
	getCookie: function(name) {
		var arr = document.cookie.split('; ');
		for (var i = 0; i < arr.length; i++) {
			var arr2 = arr[i].split('=');
			if (arr2[0] == name) {
				return arr2[1];
			}
		}
		return '';
	},
	removeCookie: function(name) {
		this.setCookie(name, 1, -1);
	},
	/**
	 * @method hasClass:检测对象是否有哪个类名
	 * @method addClass:添加类名
	 * @method removeClass:删除类名
	 * @method replaceClass:替换类名("被替换的类名","替换的类名") 目前该方法在测试中有问题
	 * @param {object} obj:检测对象
	 * @param {string} classStr:类名
	 * @example
	 * G.hasClass(obj,'active');//true false
	 */	
	hasClass: function(obj, classStr) {
		if (obj.className && this.trim(obj.className, 1) !== "") {
			var arr = obj.className.split(/\s+/); //这个正则表达式是因为class可以有多个,判断是否包含
			console.log(arr.indexOf(classStr) == -1);
			return (arr.indexOf(classStr) == -1) ? false : true;
		} else {
			return false;
		}
	},
	addClass: function(obj, classStr) {
		if ((this.istype(obj, 'array') || this.istype(obj, 'elements')) && obj.length >= 1) {
			for (var i = 0, len = obj.length; i < len; i++) {
				if (!this.hasClass(obj[i], classStr)) {
					obj[i].className += " " + classStr;
				}
			}
		} else {
			if (!this.hasClass(obj, classStr)) {
				obj.className += " " + classStr;
			}
		}
	},
	removeClass: function(obj, classStr) {
		if ((this.istype(obj, 'array') || this.istype(obj, 'elements')) && obj.length > 1) {
			for (var i = 0, len = obj.length; i < len; i++) {
				if (this.hasClass(obj[i], classStr)) {
					var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
					obj[i].className = obj[i].className.replace(reg, '');
				}
			}
		} else {
			if (this.hasClass(obj, classStr)) {
				var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
				obj.className = obj.className.replace(reg, '');
			}
		}
	},
	// replaceClass: function(obj, newName, oldName) {//该方法目前测试有bug
	// 	this.removeClass(obj, oldName);
	// 	this.addClass(obj, newName);
	// },
	/**
	 * @method istype:数据类型判断
	 * @param {object} o:需要检测的数据
	 * @param {string} type:类型
	 * @example
	 * G.hasClass(obj,'active');//true false
	 */	
	istype: function(o, type) {
		if (type) {
			var _type = type.toLowerCase();
		}
		switch (_type) {
			case 'string':
				return Object.prototype.toString.call(o) === '[object String]';
			case 'number':
				return Object.prototype.toString.call(o) === '[object Number]';
			case 'boolean':
				return Object.prototype.toString.call(o) === '[object Boolean]';
			case 'undefined':
				return Object.prototype.toString.call(o) === '[object Undefined]';
			case 'null':
				return Object.prototype.toString.call(o) === '[object Null]';
			case 'function':
				return Object.prototype.toString.call(o) === '[object Function]';
			case 'array':
				return Object.prototype.toString.call(o) === '[object Array]';
			case 'object':
				return Object.prototype.toString.call(o) === '[object Object]';
			case 'nan':
				return isNaN(o);
			case 'elements':
				return Object.prototype.toString.call(o).indexOf('HTML') !== -1
			default:
				return Object.prototype.toString.call(o)
		}
	},
	/**
	 * @method css:设置样式
	 * @param {object} obj:需要设置样式的对象
	 * @param {string} json:样式以json对象的形式
	 * @example
	 * G.css(obj,{color:'red',fontSize:'25px'});
	 */	
	css: function(obj, json) {	
		for (var attr in json) {
			obj.style[attr] = json[attr];
		}
	},
	/**
	 * @method html:可以获取也可以设置 和jquery的一样
	 * @param {object} obj:目标对象
	 * @param  arguments[1]:当需要设置的时候的内容
	 * @example
	 * G.html(obj,"<div><b>很多事发货单</b><div>");
	 */	
	html: function(obj) {
		if (arguments.length === 1) {
			return obj.innerHTML;
		} else if (arguments.length === 2) {
			obj.innerHTML = arguments[1];
		}
	},
	/**
	 * @method text:可以获取也可以设置文本 和jquery的一样
	 * @param {object} obj:目标对象
	 * @param  arguments[1]:当需要设置的时候的内容
	 * @example
	 * G.html(obj,"很多事发货单");
	 */	
	text: function(obj) {
		if (arguments.length === 1) {
			return obj.innerHTML;
		} else if (arguments.length === 2) {
			obj.innerHTML = arguments[1];
		}
	},
	/**
	 * @method aftLoadImg:图片没加载出来时用一张图片代替
	 * @param {object} obj:目标对象img
	 * @param {string} url:正确的img路径
	 * @param {string} errorUrl:加载失败的img路径
	 * @param {function} cb:回调函数
	 * @example
	 * var obj=document.getElementById('img');
		G.aftLoadImg(obj,'http://img07.tooopen.com/images/20170316/tooopen_sy_201977.jpg','http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg',function(){
			console.log(123)
		})
	 */	
	aftLoadImg: function(obj, url, errorUrl, cb) {
		var oImg = new Image(),
			_this = this;
		oImg.src = url;
		oImg.onload = function() {
			obj.src = oImg.src;
			if (cb && _this.istype(cb, 'function')) {
				cb(obj);
			}
		}
		oImg.onerror = function() {
			obj.src = errorUrl;
			if (cb && _this.istype(cb, 'function')) {
				cb(obj);
			}
		}
	},
	/**
	 * @method loadImg:图片滚动懒加载
	 * @param {string} className :要遍历图片的类名
	 * @param {number} num :距离多少的时候开始加载 默认 0
	 * @param {string} errorUrl:图片加载失败显示
	 * @example
	 * //比如，一张图片距离文档顶部3000，num参数设置200，那么在页面滚动到2800的时候，图片加载。不传num参数就滚动，num默认是0，页面滚动到3000就加载
	//html代码
	//<p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>
	//<p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>
	//<p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>....
	//data-src储存src的数据，到需要加载的时候把data-src的值赋值给src属性，图片就会加载。
	//详细可以查看testLoadImg.html
	//window.onload = function() {
	//  loadImg('load-img',100);
	//  window.onscroll = function() {
	//      loadImg('load-img',100);
	//      }
	//}
	 */	
	loadImg: function(className, num, errorUrl) {                                                                       
		var _className = className || 'ec-load-img',
			_num = num || 0,
			_this = this,
			_errorUrl = errorUrl || null;
		var oImgLoad = document.getElementsByClassName(_className);
		for (var i = 0, len = oImgLoad.length; i < len; i++) {
			if (document.documentElement.clientHeight + document.documentElement.scrollTop > oImgLoad[i].offsetTop - _num && !oImgLoad[i].isLoad) {
				//记录图片是否已经加载
				oImgLoad[i].isLoad = true;
				//设置过渡，当图片下来的时候有一个图片透明度变化
				oImgLoad[i].style.cssText = "transition: ''; opacity: 0;"
				if (oImgLoad[i].dataset) {
					this.aftLoadImg(oImgLoad[i], oImgLoad[i].dataset.src, _errorUrl, function(o) {
						setTimeout(function() {
							if (o.isLoad) {
								_this.removeClass(o, _className);
								o.style.cssText = "";
							}
						}, 1000)
					});
				} else {
					this.aftLoadImg(oImgLoad[i], oImgLoad[i].getAttribute("data-src"), _errorUrl, function(o) {
						setTimeout(function() {
							if (o.isLoad) {
								_this.removeClass(o, _className);
								o.style.cssText = "";
							}
						}, 1000)
					});
				}
				(function(i) {
					setTimeout(function() {
						oImgLoad[i].style.cssText = "transition:all 1s; opacity: 1;";
					}, 16)
				})(i);
			}
		}
	},
	/**
	 * @method browserInfo:手机类型判断
	 * @param {string} type:手机类型
	 * @example
	 * G.browserInfo("android");
	 */	
	browserInfo: function(type) {
		switch (type) {
			case 'android':
				return navigator.userAgent.toLowerCase().indexOf('android') !== -1
			case 'iphone':
				return navigator.userAgent.toLowerCase().indexOf('iphone') !== -1
			case 'ipad':
				return navigator.userAgent.toLowerCase().indexOf('ipad') !== -1
			case 'weixin':
				return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
			default:
				return navigator.userAgent.toLowerCase()
		}
	},
	/**
	 * @method delayFn:函数节流  delayms内连续触发的调用，后一个调用会把前一个调用的等待处理掉，但每隔200ms至少执行一次
	 * @param {function} fn:处理函数
	 * @param {number} delay:延迟的毫秒数
	 * @param {number} mustDelay:间隔多少每执行一次
	 * @example
	 * var count=0;
	 * function fn1(){
	 * 	count++;
	 *  console.log(count);
	 * }
	 * 100ms内连续触发的调用，后一个调用会把前一个调用的等待处理掉，但每隔200ms至少执行一次
	 * document.onmousemove=G.delayFn(fn1,100,200);
	 */	
	delayFn: function(fn, delay, mustDelay) {
		var timer = null;
		var t_start;
		return function() {
			var context = this,
				args = arguments,
				t_cur = +new Date();
			//先清理上一次的调用触发（上一次调用触发事件不执行）
			clearTimeout(timer);
			//如果不存触发时间，那么当前的时间就是触发时间
			if (!t_start) {
				t_start = t_cur;
			}
			//如果当前时间-触发时间大于最大的间隔时间（mustDelay），触发一次函数运行函数
			if (t_cur - t_start >= mustDelay) {
				fn.apply(context, args);
				t_start = t_cur;
			}
			//否则延迟执行
			else {
				timer = setTimeout(function() {
					fn.apply(context, args);
				}, delay);
			}
		};
	},
	/**
	 * @method AddFavorite:原生JavaScript把当前的链接加入收藏夹
	 * @param {string} sURL:需要加入收藏的链接
	 * @param {string} sTitle:需要加入收藏的标题
	 * @example
	 * G.AddFavorite("www.baidu.com",'新的一天');
	 */	
	AddFavorite: function(sURL, sTitle) {
		try {
			window.external.addFavorite(sURL, sTitle)
		} catch (e) {
			try {
				window.sidebar.addPanel(sTitle, sURL, "")
			} catch (e) {
				alert("加入收藏失败，请使用Ctrl+D进行添加")
			}
		}
	},
	/**
	 * @method Cutstr:原生JavaScript 实现字符串长度截取
	 * @param {string} str:需要截取的字符串
	 * @param {number} len:需要截取的长度
	 * @example
	 * G.Cutstr("www.baidu.com",6);
	 *    www.b...
	 */	
	Cutstr: function(str, len) {
		var temp;
		var icount = 0;
		var patrn = /[^\x00-\xff]/;
		var strre = "";
		for (var i = 0; i < str.length; i++) {
			if (icount < len - 1) {
				temp = str.substr(i, 1);
				if (patrn.exec(temp) == null) {
					icount = icount + 1
				} else {
					icount = icount + 2
				}
				strre += temp
			} else {
				break
			}
		}
		return strre + "...";
	}
}

