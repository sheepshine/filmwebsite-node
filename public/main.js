$(function(){
	$(".deleteFilm").click(function(e){
		var target=$(e.target);

		$.ajax({
			type:'DELETE',
			url:'/admin/list?id='+target.data('id')
		})
		.done(function(res){
			if(res.success===1){
				window.location.reload()
				//去除电影
			}
		})
	})

	//添加标签
	
	$("#addlabel").click(function(e){
		$.ajax({
			type:'post',
			url:'/admin/label',
			data:{
				label:$('#labelVal').val()
			}
		})
		.done(function(res){
			alert(res.message)
			window.location.reload();
		})
	})

	$("#submitNew").click(function(){
		alert($("#selectNew").val())
	})

})