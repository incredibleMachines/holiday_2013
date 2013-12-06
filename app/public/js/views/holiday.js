$(document).ready( function (){

var f=$.farbtastic('#color-picker');
f.linkTo(function(){
    updateColor();
});

var canvas = document.getElementById("video");
var ctx = canvas.getContext("2d");

var buttonOn=[0,0,0,0,0,0];

var mouseOver=null;

var color=[[0,0,100],[0,0,100],[0,0,100],[0,0,100],[0,0,100],[0,0,100]];


updateColor();
definePaths(null);



function definePaths(event, which){
	var checkHighlight=0;
	canvas.width=canvas.width;
	console.log(buttonOn);

	ctx.beginPath();
		ctx.moveTo(296,1);
		ctx.lineTo(284,15);
		ctx.lineTo(262,15);
		ctx.lineTo(273,28);
		ctx.lineTo(271,48);
		ctx.lineTo(291,32);
		ctx.lineTo(312,48);
		ctx.lineTo(304,25);
		ctx.lineTo(322,18);
		ctx.lineTo(301,8);
		ctx.lineTo(296,1);
		if (event!=null){
			if (IsInPath(event)) {
				if(buttonOn[0]==0){	
					buttonOn[0]=1;
				}
				else{
					buttonOn[0]=0;
				}	
			}
		}
		if(buttonOn[0]==1){
			makeSelected(0);
		} 
		else{
			makeUnSelected();
		}
	ctx.closePath();
    ctx.stroke();

	ctx.beginPath();
		ctx.moveTo(357,80);
		ctx.bezierCurveTo(356,67,237,71,237,80);
		ctx.bezierCurveTo(237,89,237,109,237,99);
		ctx.bezierCurveTo(237,89,357,89,357,99);
		ctx.bezierCurveTo(357,109,357,93,357,80);

		if (event!=null){
			if (IsInPath(event)) {
				if(buttonOn[1]==0){	
					buttonOn[1]=1;
				}
				else{
					buttonOn[1]=0;
				}
			}
		}
		if(buttonOn[1]==1){
				makeSelected(1);
			} 
			else{
				makeUnSelected();
			}
	ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
		ctx.moveTo(382,120);
		ctx.bezierCurveTo(382,105,211,98,210,109);
		ctx.bezierCurveTo(209,120,208,144,208,132);
		ctx.bezierCurveTo(209,120,381,131,380,143);
		ctx.bezierCurveTo(379,155,382,136,382,120);
		if (event!=null){
			if (IsInPath(event)) {
				if(buttonOn[2]==0){	
					buttonOn[2]=1;
				}
				else{
					buttonOn[2]=0;
				}
			}
		}
		if(buttonOn[2]==1){
				makeSelected(2);
			} 
			else{
				makeUnSelected();
			}
	ctx.closePath();
    ctx.stroke();



    ctx.beginPath();
		ctx.moveTo(413,158);
		ctx.bezierCurveTo(412,139,175,145,175,158);
		ctx.bezierCurveTo(175,171,175,200,175,185);
		ctx.bezierCurveTo(175,171,413,171,413,185);
		ctx.bezierCurveTo(413,200,414,177,413,158);
		if (event!=null){
			if (IsInPath(event)) {
				if(buttonOn[3]==0){	
					buttonOn[3]=1;
				}
				else{
					buttonOn[3]=0;
				}
			}
		}
		if(buttonOn[3]==1){
				makeSelected(3);
			} 
			else{
				makeUnSelected();
			}
	ctx.closePath();
    ctx.stroke();
    console.log(event);
    console.log(which);
}

function IsInPath(event) {
	var bb, x, y;
	bb = canvas.getBoundingClientRect();
	x = (event.clientX-bb.left) * (canvas.width/bb.width);
	y = (event.clientY-bb.top) * (canvas.height/bb.height);
	return ctx.isPointInPath(x,y);
}

function makeSelected(bulb){
    ctx.lineWidth= 2;
    ctx.strokeStyle= 'hsl('+color[bulb][0]+','+color[bulb][1]+'%,'+color[bulb][2]+'%)';
}
function makeUnSelected(){
    ctx.lineWidth= 1;
    ctx.strokeStyle= "white";
}

function makeHighlighted(bulb){
    ctx.fillStyle= 'hsl('+color[bulb][0]+','+color[bulb][1]+'%,'+color[bulb][2]+'%)';
}

function updateColor(){
   for(var i=0;i<buttonOn.length;i++){
   		if(buttonOn[i]==1){
			color[i][0]=f.hsl[0]*360;
			color[i][1]=f.hsl[1]*100;
			color[i][2]=f.hsl[2]*100;
		}
	}
	definePaths();
  }

  $('#video').click(function(e){
  	definePaths(e,0);
  });

  $('#video').mouseover(function(e){
  	definePaths(e,1);
  });

  //deselect all listener
$('#deselect').click(function(){
  for(var i=0;i<buttonOn.length;i++){
  	buttonOn[i]=0;
  }
  definePaths();
});

//select all listener
$('#select').click(function(){
  for(var i=0;i<buttonOn.length;i++){
  	buttonOn[i]=1;
  	  console.log('all');
  }
  definePaths();
});


});
