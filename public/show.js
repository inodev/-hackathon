$(function(){
	$(".media").waypoint(
		function(){$(this).toggleClass('animated fadeIn');},
		{ofset: '80%'}
	);
});