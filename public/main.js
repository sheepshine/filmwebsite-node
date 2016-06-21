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

	//删除标签
	$(".removeLabels").click(function(e){
		var target=$(e.target);
		alert(target.data('id'))
		$.ajax({
			type:'DELETE',
			url:'/admin/label?id='+target.data('id')
		})
		.done(function(res){
			alert(res.message)
			window.location.reload();
		})
	})

	//提交评论
	$("#commitComment").click(function(e){
		var target=$(e.target);
		$.ajax({
			type:'get',
			url:'/api/detail/comment',
			data:{
				id:target.data('id'),
				comment:$("#commentValue").val()
			}
		})
		.done(function(res){
			alert(res.message)
			window.location.reload();
		})
	})
})