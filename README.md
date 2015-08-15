# time-selector
time-selector是一个适用于移动web的时间选择控件<br>
用手机或模拟器打开 <http://beyoursun.github.io/time-selector/demo.html>
* * *

##1. 资源引用
css
```html
<link rel="stylesheet" type="text/css" href="ts.css">
```
js
```html
<script type="text/javascript" src="ts.js"></script>
```
在你的html中插入以下代码
```html
<div class="ts-container">
	<div class="ts-wrapper">
		<div class="ts-date">
			<ul class="ts-year"></ul>
			<ul class="ts-month"></ul>
			<ul class="ts-day"></ul>
			<span class="tip-year">年</span>
			<span class="tip-month">月</span>
			<span class="tip-day">日</span>
		</div>
		<div class="ts-time">
			<ul class="ts-hour"></ul>
			<ul class="ts-min"></ul>
			<span class="tip-hour">时</span>
			<span class="tip-min">分</span>
		</div>
		<div class="btn-container">
			<a class="btn-ok">确定</a>
			<a class="btn-cancel">取消</a>
		</div>
	</div>
</div>
```

##2. 初始化
```js
var ts;
window.onload = function() {
  ts = new TimeSelector({
  	startYear: 2000,
  	endYear: 2022
  });
};
```
初始化时传入两个参数，开始年和结束年。

##3. 使用
```js
ts.show(); // 显示控件
ts.hide(); // 隐藏控件
```
时间选择控件默认是隐藏的，用``ts.show()``方法将其显示出来。
```js
ts.ok(callback);
```
选择时间后点击确定的回调函数，通过``ts.date``获取当前选择时间的Date对象，通过``ts.toString()``获取当前选择时间的格式化字符串。

**e.g.**
```js
ts.ok(function() {
  console.log(ts.date);
  console.log(ts.toString());
});
```
