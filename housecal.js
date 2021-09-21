function house() {
	this.num = 0,
		this.year = 0,
		this.yearRate = 0,
		this.status = 0,
		this.outputinfo = {
			hkAmount: 0,
			totalRate: 0,
			totalprice: 0
		}
	this.computemethod1 = function() {
		var month = parseInt(this.year) * 12;
		var monthrate = parseFloat(this.yearRate) / 12;
		var loansNum = (loansNum * monthrate * Math.pow((1 + monthrate), month)) / (Math.pow((1 + monthrate), month) - 1)
		var totalRate = month * hkAmount - loansNum;
		this.outputinfo.hkAmount = hkAmount.toFixed(2);
		this.outputinfo.totalRate = totalRate.toFixed(2);
		this.outputinfo.totalprice = totalprice.toFixed(2);
	}
	this.computemethod2 = function() {
		var month = parseInt(this.year) * 12;
		var monthrate = parseFloat(this.yearRate) / 12;
		var loansNum = parseFloat(this.num) * 10000;
		var everymonthyh = loansNum / month;
		var hkAmount = loansNum / month + loansNum * monthrate;
		var totalRate = ((everymonthyh + loansNum * monthrate) + loansNum / month * (1 + monthrate)) / 2 * month - loansNum;
		var totalprice = totalRate + loansNum;
		this.outputinfo.hkAmount = hkAmount.toFixed(2);
		this.outputinfo.totalRate = totalRate.toFixed(2);
		this.outputinfo.totalprice = totalprice.toFixed(2);
	}

}
	var house = new house()

	function getinputData() {
		var loansNum = document.getElementById('loansAmount').value;
		var yearlimit = document.getElementById('loansYear').value;
		var loansselect = document.getElementById('loansRate').value;
		var selectobject = document.getElementById('selectbox').value;
		var numReg=new RegExp("^([0-9]{1,3}|1000)$");
		var yearReg=new RegExp("^([5-9]|[12][0-9]|30)$");
		if(numReg.test(loansNum) && yearReg.test(yearlimit)){
			house.num = loansNum;
			house.year = yearlimit;
			house.yearRate = loansselect;
			house.status = selectobject;
			return true;
		}else{
			return false;
		}
		
	}

	function showResult() {
		var result = [house.outputinfo.hkAmount, house.outputinfo.totalprice, house.outputinfo.totalRate];
		var text = ['月供', '还款总额', '总利息'];
		var html = '<tr><th>项目</th><th>金额</th></tr>';
		for(var i = 0; i < text.length; i++) {
			var tableobj = document.getElementById('calResult');
			html += '<tr class="cal-hkResult"><td class="cal-title">' + text[i] + ':</td><td class="cal-price">' + result[i] + '</td>';
			tableobj.innerHTML = html;
		}
	}

	function calResult() {
		if(getinputData()) {
			if(house.status == 0) {
				house.computemethod1();
			} else if(house.status == 1) {
				house.computemethod2();
			}
			showResult();
		}else{
			document.getElementById('calResult').innerHTML=' ';
		}
	}