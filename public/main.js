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


})