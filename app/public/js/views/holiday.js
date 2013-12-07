$(document).ready( function (){

//holiday controller to server 
var hc = new HolidayController( function(){} )

console.log(hc);



var canvas = document.getElementById("video");
var ctx = canvas.getContext("2d");

var lights={
    "zone": [
        {
            "id": "one",
            "status": 0
        },
        {
            "id": "two",
            "status": 0
        },
        {
            "id": "three",
            "status": 0
        },
        {
            "id": "four",
            "status": 0
        },
        {
            "id": "five",
            "status": 0
        },
        {
            "id": "six",
            "status": 0
        },
        {
            "id": "seven",
            "status": 0
        },
        {
            "id": "eight",
            "status": 0
        },
        {
            "id": "nine",
            "status": 0
        }
    ]
};

var mouseOver=null;

var showPaths=true;

definePaths(null);



function definePaths(event, which){
	var checkHighlight=null;
	canvas.width=canvas.width;

	ctx.globalAlpha=1;
	ctx.beginPath();
		ctx.moveTo(300,52);
		ctx.lineTo(288,64);
		ctx.lineTo(267,64);
		ctx.lineTo(277,77);
		ctx.lineTo(275,96);
		ctx.lineTo(294,81);
		ctx.lineTo(314,96);
		ctx.lineTo(307,74);
		ctx.lineTo(325,68);
		ctx.lineTo(305,58);
		ctx.lineTo(300,52);
		if (event!=null){
			if (IsInPath(event)) {
				if(which==0){
					if(lights.zone[0].status==0){	
						lights.zone[0].status=1;
					}
					else{
						lights.zone[0].status=0;
					}
				}	
				else{
					checkHighlight=0;
				}
			}
		}

	ctx.closePath();
	if(lights.zone[0].status==1){
		makeSelected(0);
	} 
    if(checkHighlight==0){
		makeHighlighted(0);
	}

    ctx.globalAlpha=1;
	ctx.beginPath();
		ctx.moveTo(373,133);
		ctx.bezierCurveTo(373,121,258,124,258,133);
		ctx.bezierCurveTo(258,141,258,159,258,150);
		ctx.bezierCurveTo(258,141,373,141,373,150);
		ctx.bezierCurveTo(373,159,374,145,373,133);


		if (event!=null){
			if (IsInPath(event)) {
				if(which==0){
					if(lights.zone[1].status==0){	
						lights.zone[1].status=1;
					}
					else{
						lights.zone[1].status=0;
					}
				}
				else{
					checkHighlight=1;
				}
			}
		}

	ctx.closePath();
	if(lights.zone[1].status==1){
			makeSelected(1);
		} 
    if(checkHighlight==1){
		makeHighlighted(1);
	}

    ctx.globalAlpha=1;
    ctx.beginPath();
		ctx.moveTo(394,173);
		ctx.bezierCurveTo(394,160,243,163,243,173);
		ctx.bezierCurveTo(243,182,243,202,243,192);
		ctx.bezierCurveTo(243,182,394,182,394,193);
		ctx.bezierCurveTo(394,203,395,186,394,173);

		if (event!=null){
			if (IsInPath(event)) {
				if(which==0){
					if(lights.zone[2].status==0){	
						lights.zone[2].status=1;
					}
					else{
						lights.zone[2].status=0;
					}
				}
				else{
					checkHighlight=2;
				}
			}
		}

	ctx.closePath();
	if(lights.zone[2].status==1){
		makeSelected(2);
	} 
    if(checkHighlight==2){
		makeHighlighted(2);
	}


	ctx.globalAlpha=1;
    ctx.beginPath();
		ctx.moveTo(406,217);
		ctx.bezierCurveTo(405,202,226,206,226,217);
		ctx.bezierCurveTo(226,228,226,252,226,240);
		ctx.bezierCurveTo(226,228,406,228,406,240);
		ctx.bezierCurveTo(406,252,407,233,406,217);

		if (event!=null){
			if (IsInPath(event)) {
				if(which==0){
					if(lights.zone[3].status==0){	
						lights.zone[3].status=1;
					}
					else{
						lights.zone[3].status=0;
					}
				}
				else{
					checkHighlight=3;
				}
			}
		}

	ctx.closePath();
	if(lights.zone[3].status==1){
		makeSelected(3);
	}
    if(checkHighlight==3){
		makeHighlighted(3);
	}


	ctx.globalAlpha=1;
    ctx.beginPath();
		ctx.moveTo(421,262);
		ctx.bezierCurveTo(420,245,214,250,214,262);
		ctx.bezierCurveTo(214,275,214,301,214,288);
		ctx.bezierCurveTo(214,275,421,275,421,288);
		ctx.bezierCurveTo(421,301,422,280,421,262);


		if (event!=null){
			if (IsInPath(event)) {
				if(which==0){
					if(lights.zone[4].status==0){	
						lights.zone[4].status=1;
					}
					else{
						lights.zone[4].status=0;
					}
				}
				else{
					checkHighlight=4;
				}
			}
		}

	ctx.closePath();
	if(lights.zone[4].status==1){
		makeSelected(4);
	}
    if(checkHighlight==4){
		makeHighlighted(4);
	}


	ctx.globalAlpha=1;
    ctx.beginPath();
		ctx.moveTo(430,314);
		ctx.bezierCurveTo(429,294,204,300,204,314);
		ctx.bezierCurveTo(204,328,204,359,204,344);
		ctx.bezierCurveTo(204,328,430,328,430,344);
		ctx.bezierCurveTo(430,359,431,334,430,314);


		if (event!=null){
			if (IsInPath(event)) {
				if(which==0){
					if(lights.zone[5].status==0){	
						lights.zone[5].status=1;
					}
					else{
						lights.zone[5].status=0;
					}
				}
				else{
					checkHighlight=5;
				}
			}
		}

	ctx.closePath();
	if(lights.zone[5].status==1){
		makeSelected(5);
	}
    if(checkHighlight==5){
		makeHighlighted(5);
	}

	ctx.globalAlpha=1;
    ctx.beginPath();
		ctx.moveTo(443,364);
		ctx.bezierCurveTo(441,344,191,350,191,364);
		ctx.bezierCurveTo(191,378,191,409,191,394);
		ctx.bezierCurveTo(191,378,443,378,443,394);
		ctx.bezierCurveTo(443,409,444,384,443,364);


		if (event!=null){
			if (IsInPath(event)) {
				if(which==0){
					if(lights.zone[6].status==0){	
						lights.zone[6].status=1;
					}
					else{
						lights.zone[6].status=0;
					}
				}
				else{
					checkHighlight=6;
				}
			}
		}

	ctx.closePath();
	if(lights.zone[6].status==1){
		makeSelected(6);
	}
    if(checkHighlight==6){
		makeHighlighted(6);
	}

	ctx.globalAlpha=1;
    ctx.beginPath();
		ctx.moveTo(453,411);
		ctx.bezierCurveTo(452,388,179,395,179,411);
		ctx.bezierCurveTo(179,428,179,463,179,445);
		ctx.bezierCurveTo(179,428,453,428,453,445);
		ctx.bezierCurveTo(453,463,454,434,453,411);




		if (event!=null){
			if (IsInPath(event)) {
				if(which==0){
					if(lights.zone[7].status==0){	
						lights.zone[7].status=1;
					}
					else{
						lights.zone[7].status=0;
					}
				}
				else{
					checkHighlight=7;
				}
			}
		}

	ctx.closePath();
	if(lights.zone[7].status==1){
		makeSelected(7);
	}
    if(checkHighlight==7){
		makeHighlighted(7);
	}

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
    ctx.strokeStyle= 'white';
    ctx.stroke();
}

function makeHighlighted(bulb){
	ctx.lineWidth= 1;
    ctx.strokeStyle= 'white';
    ctx.stroke();
	ctx.globalAlpha=0.5;
    ctx.fillStyle= 'white';
    ctx.fill();
}

  $('#video').click(function(e){
  	definePaths(e,0);
  });

  $('#video').mousemove(function(e){
  	definePaths(e,1);
  });


});
