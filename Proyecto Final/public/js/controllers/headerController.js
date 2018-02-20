myApp.controller('header', ['$scope', '$location','$http', function($scope, $location,$http){

	var c = document.getElementById("myCanvas");
    	var ctx = c.getContext("2d");

	/*  < */
	ctx.moveTo(30,25);
	ctx.lineTo(10,40);
	ctx.lineTo(30,55);

	/* WikiCode */
	ctx.font = "bold 28px Courier New";
	ctx.fillText ("WikiCode", 34,50);

	/* > */
	ctx.moveTo(170,25);
	ctx.lineTo(190,40);
	ctx.lineTo(170,55);
	ctx.lineWidth = 3;
	
	// Define el color para el dibujo canvas
	ctx.strokeStyle = '#fff';
	ctx.stroke();
}])
