function TimeSelector(opt) {
	this.startYear = opt.startYear || 1900;
	this.endYear = opt.endYear || 2100;
	this.date = opt.date || new Date();
	this.init();
	this.bind();
}

TimeSelector.prototype.init = function() {
	var yearList = document.querySelector('.ts-year');
	var year;
	for (var i = this.startYear; i <= this.endYear; i++) {
		year = document.createElement('li');
		year.innerHTML = i;
		yearList.appendChild(year);
	};
	var offsetY = - (this.date.getFullYear() - this.startYear - 2) * 32;
	yearList.style.webkitTransform = 'translate3d(0,' + offsetY + 'px,0)';

	var monthList = document.querySelector('.ts-month');
	var month;
	for (var i = 1; i <= 12; i++) {
		month = document.createElement('li');
		month.innerHTML = digit2(i);
		monthList.appendChild(month);
	};
	var offsetY = - (this.date.getMonth() - 2) * 32;
	monthList.style.webkitTransform = 'translate3d(0,' + offsetY + 'px,0)';

	var dayList = document.querySelector('.ts-day');
	var day;
	for (var i = 1; i <= 31; i++) {
		day = document.createElement('li');
		day.innerHTML = digit2(i);
		dayList.appendChild(day);
	};
	var offsetY = - (this.date.getDate() - 3) * 32;
	dayList.style.webkitTransform = 'translate3d(0,' + offsetY + 'px,0)';

	var hourList = document.querySelector('.ts-hour');
	var hour;
	for (var i = 0; i < 24; i++) {
		hour = document.createElement('li');
		hour.innerHTML = digit2(i);
		hourList.appendChild(hour);
	};
	var offsetY = - (this.date.getHours() - 2) * 32;
	hourList.style.webkitTransform = 'translate3d(0,' + offsetY + 'px,0)';

	var minList = document.querySelector('.ts-min');
	var min;
	for (var i = 0; i < 60; i++) {
		min = document.createElement('li');
		min.innerHTML = digit2(i);
		minList.appendChild(min);
	};
	var offsetY = - (this.date.getMinutes() - 2) * 32;
	minList.style.webkitTransform = 'translate3d(0,' + offsetY + 'px,0)';
};

TimeSelector.prototype.bind = function() {
	var that = this;
	var date = new Date();
	date.setTime(this.date.getTime());

	var startY;
	var offsetY;
	var curY;
	var length;

	var startHandler = function(e) {
		startY = e.touches[0].pageY;

		if (this.classList.contains('ts-year')) {
			curY = - (date.getFullYear() - that.startYear - 2) * 32;
		} else if (this.classList.contains('ts-month')) {
			curY = - (date.getMonth() - 2) * 32;
		} else if (this.classList.contains('ts-day')) {
			curY = - (date.getDate() - 3) * 32;
		} else if (this.classList.contains('ts-hour')) {
			curY = - (date.getHours() - 2) * 32;
		} else if (this.classList.contains('ts-min')) {
			curY = - (date.getMinutes() - 2) * 32;
		};

		length = this.getElementsByTagName('li').length;

		this.style.webkitTransition = 'none';
	};

	var moveHandler = function(e) {
		e.preventDefault();

		offsetY = e.touches[0].pageY - startY + curY;

		this.style.webkitTransform = 'translate3d(0,' + offsetY + 'px,0)';
	};

	var endHandler = function(e) {
		offsetY = Math.round(offsetY / 32) * 32;
		if (offsetY > 64) {
			offsetY = 64;
		} else if (offsetY < -32 * (length - 3)) {
			offsetY = -32 * (length - 3);
		};

		if (this.classList.contains('ts-year')) {
			date.setFullYear(- offsetY / 32 + 2 + that.startYear);
		} else if (this.classList.contains('ts-month')) {
			date.setMonth(- offsetY / 32 + 2);
		} else if (this.classList.contains('ts-day')) {
			date.setDate(- offsetY / 32 + 3);
		} else if (this.classList.contains('ts-hour')) {
			date.setHours(- offsetY / 32 + 2);
		} else if (this.classList.contains('ts-min')) {
			date.setMinutes(- offsetY / 32 + 2);
		};

		this.style.webkitTransform = 'translate3d(0,' + offsetY + 'px,0)';
		this.style.webkitTransition = 'all .4s';
	};

	var yearList = document.querySelector('.ts-year');
	yearList.addEventListener('touchstart', startHandler);
	yearList.addEventListener('touchmove', moveHandler);
	yearList.addEventListener('touchend', endHandler);

	var monthList = document.querySelector('.ts-month');
	monthList.addEventListener('touchstart', startHandler);
	monthList.addEventListener('touchmove', moveHandler);
	monthList.addEventListener('touchend', endHandler);

	var dayList = document.querySelector('.ts-day');
	dayList.addEventListener('touchstart', startHandler);
	dayList.addEventListener('touchmove', moveHandler);
	dayList.addEventListener('touchend', endHandler);

	var hourList = document.querySelector('.ts-hour');
	hourList.addEventListener('touchstart', startHandler);
	hourList.addEventListener('touchmove', moveHandler);
	hourList.addEventListener('touchend', endHandler);

	var minList = document.querySelector('.ts-min');
	minList.addEventListener('touchstart', startHandler);
	minList.addEventListener('touchmove', moveHandler);
	minList.addEventListener('touchend', endHandler);

	var cancel = document.querySelector('.btn-cancel');
	cancel.addEventListener('click', function() {
		that.hide();
	})

	var ok = document.querySelector('.btn-ok');
	ok.addEventListener('click', function() {
		that.date = date;
		that.hide();
		alert(that.toChinese());
	})
};

TimeSelector.prototype.toChinese = function() {
	return this.date.getFullYear() + ' 年 ' + (this.date.getMonth() + 1) + ' 月 ' + this.date.getDate() + ' 日';
}

TimeSelector.prototype.hide = function() {
	var ts = document.querySelector('.ts-container');
	ts.style.display = 'none';
};

TimeSelector.prototype.show = function() {
	var ts = document.querySelector('.ts-container');
	ts.style.display = 'block';
};

function digit2 (n) {
	if (n < 10) {
		return '0' + n;
	} else {
		return n;
	}
}