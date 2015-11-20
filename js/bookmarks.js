function setDateFormat(date) {
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return date.getFullYear() + "-" + month + "-" + currentDate;
 };
 
 function convertDate (createDate) {
	var match;
	if (!(match = createDate.match(/\d+/))) {
		return false;
	}
	createDate +="000";
	var date = new Date(parseInt(createDate,10));
	return setDateFormat(date);
}

function setMarks(){
	$("#searchkey").bind('input propertychange',function () {
		$.ajax({
			url:"bookmarks.json",
			type:"get",
			dataType:"json",
			success:function(data){
				showResult(data);
			}
		})
	})
}

function showResult(data) {
	var key = $("#searchkey").val();
	var reg = new RegExp(key,'gi');
	if(key==""){
		appendBookmarks(data);
	}else{
		var matchData = data.filter(function(item){
			return item.title.match(reg);
			}).map(function(item){
			var keys = item.title.match(reg);
			var words = item.title.split(reg);
			var str = "";
			for(var i =0;i<words.length;i++){
				str+=words[i];
				if(i!=words.length-1){
					str+="<span>"+keys[i]+"</span>";
				}
			}
			item.title = str;
			return item;
		})
		appendBookmarks(matchData);
	}
}

function appendBookmarks(data){
	var str = data.reduce(function(p,item){
		p+="<li class=\"list\"><div class=\"title\">"+item.title+"</div><div class=\"createDate\">Created@"+convertDate(item.created)+"</div></li>";
		return p;
	},"");
	$("ul").html(str);
}