const moment = require('moment');
export default  {
		formatDay(timestamp) {
		    var date = new Date(timestamp*1000);
		    var hours  = date.getHours();
		    var minutes  = date.getMinutes();
		    var seconds  = date.getSeconds();
		   	var hoursNew = hours.toString();
		   	var minutesNew = minutes.toString();
		   	var secondsNew = seconds.toString();

		   	if(hoursNew.length == 1){
		   		hoursNew = '0' + hoursNew;
		   	}
		   	if(minutesNew.length == 1){
		   		minutesNew = '0' + minutesNew;
		   	}
		   	if(secondsNew.length == 1){
		   		secondsNew =  '0' + secondsNew;
		   	}
		    return  hoursNew  + ':' + minutesNew + ':' + secondsNew ;
		},
		formatOrderDate(timestamp) {
		    var date = moment.utc(timestamp).format('YYYY-MM-DD HH:mm:ss');
			var stillUtc = moment.utc(date).toDate();
			return moment(stillUtc).local().format('MM-DD HH:mm:ss');
		},
		formatOnlyDate(timestamp) {
		    var date = moment.utc(timestamp).format('YYYY-MM-DD');
			var stillUtc = moment.utc(date).toDate();
			return moment(stillUtc).local().format('DD/MM/YYYY') + ' UTC';
		},
		formatYear(timeDate){
			var date = moment(timeDate).format('LL');
			return date;
		},
		countDown(timeStart,timeEnd){
			var diffTime = timeEnd - timeStart;
			var duration = moment.duration(diffTime*1000, 'milliseconds');
			var interval = 1000;
			setInterval(function(){
			  duration = moment.duration(duration - interval, 'milliseconds');
			    console.log(duration.hours() ,duration.minutes() , duration.seconds());
			}, interval);

		}
}