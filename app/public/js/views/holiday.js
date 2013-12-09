$(document).ready( function (){

//holiday controller to server 
var hc = new HolidayController( function(){
	
	
	
	
} )

//slider for HUE functionality
var tip = $('<div class="btn btn-inverse" />').css({
    position: 'absolute',
    top: -30,
    left: -15
}).show().text(1);

$('#hue').slider({ //-1 black 361 white the rest is proper 0-360 Hue vals
	    value: 1,
	    min: -1,
	    max:361,
	    slide: function(event, ui) {
	        tip.text(ui.value);
	    },
	    change: function(event, ui) {},
	    stop:function(event,ui){
		    hc.updateHue(ui.value*182.04 );//send update to our obj

	    }
	}).find(".ui-slider-handle").append(tip).hover(function() {
	    tip.show()
	}, function() {
	    //durationtip.hide()
	});

//control buttons for alerts and speeds and such


$('#freq li, #dur li').click(function(e){
		e.preventDefault();
		//send api call updating speed of alert;
		console.log($(this));
		$(this).toggleClass('disabled').toggleClass('active');
		var siblings = $(this).siblings().addClass('disabled').removeClass('active');
		//send our alerts
		//check for button state
		holidayAlert();

});

$('#alerts button[name=alert-type]').click(function(e){
		//alert($(this).val())
		holidayAlert();
		//set this up to send alerts over.
})

function holidayAlert(){
		var alert = {};

		var type = $('#alerts').find('.active');

		if(type.length == 0) alert.type=0;
		else alert.type=parseInt($(type[0]).val());
		
		//get freq && dur
		
		var freq = $('#freq').find('.active')

		if(freq.length == 0) alert.frequency=0;
		else alert.frequency= parseInt($(freq[0]).val());
		
		var dur = $('#dur').find('.active');
		
		if(dur.length == 0) alert.duration = 1;
		else alert.duration = parseInt($(dur[0]).val());
		
		hc.sendAlert(alert);
		console.log(alert);
}

//canvas stuff
var canvas = document.getElementById("video");
var ctx = canvas.getContext("2d");

var lights={
    "zone": [
        {
            "id": "52a0caf4182adc5c1b000005",
            "status": 0,
            "slug":"blank"
        },
        {
            "id": "52a0c953182adc5c1b000004",
            "status": 0,
            "slug": "blank"
        },
        {
            "id": "52a0c900182adc5c1b000003",
            "status": 0,
            "slug": "blank"
        },
        {
            "id": "52a0c81e182adc5c1b000002",
            "status": 0,
            "slug": "blank"
        },
        {
            "id": "52a0ddb1182adc5c1b000006",
            "status": 0,
            "slug": "blank"
            
        },
        {
            "id": "52a204b958435b250b000001",
            "status": 0,
            "slug": "blank"
        },
        {
            "id": "52a2086c58435b250b000002",
            "status": 0,
            "slug": "blank"
        },
        {
            "id": "52a20cfe58435b250b000003",
            "status": 0,
            "slug": "blank"
        },
        {
            "id": "nine",
            "status": 0,
   	        "slug": "blank"

        },
        {
	        "id":"ten",
	        "status":0,
	        "slug": "blank"
        },
        {
            "id": "eleven",
            "status": 0,
   	        "slug": "blank"

        },
        {
	        "id":"twelve",
	        "status":0,
	        "slug": "blank"
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
		ctx.moveTo(349,50);
		ctx.lineTo(337,62);
		ctx.lineTo(316,62);
		ctx.lineTo(326,75);
		ctx.lineTo(324,94);
		ctx.lineTo(343,79);
		ctx.lineTo(363,94);
		ctx.lineTo(356,72);
		ctx.lineTo(374,66);
		ctx.lineTo(354,56);
		ctx.lineTo(349,50);
		if (event!=null){
			if (IsInPath(event)) {
				if(which==0){
					if(lights.zone[0].status==0){	
						lights.zone[0].status=1;
						//this is where we draw this out
						hc.addFixtureToControl(lights.zone[0].id);
					}
					else{
						lights.zone[0].status=0;
						//this is the deselect
						hc.removeFixtureFromControl(lights.zone[0].id);
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
		ctx.moveTo(406,131);
		ctx.bezierCurveTo(406,119,291,122,291,131);
		ctx.bezierCurveTo(291,139,291,157,291,148);
		ctx.bezierCurveTo(291,139,406,139,406,148);
		ctx.bezierCurveTo(406,157,407,143,406,131);

		if (event!=null){
			if (IsInPath(event)) {
				if(which==0){
					if(lights.zone[1].status==0){	
						lights.zone[1].status=1;
						hc.addFixtureToControl(lights.zone[1].id);

					}
					else{
						lights.zone[1].status=0;
						hc.removeFixtureFromControl(lights.zone[1].id);
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
		ctx.moveTo(423,169);
		ctx.bezierCurveTo(423,156,272,159,272,169);
		ctx.bezierCurveTo(272,178,272,198,272,188);
		ctx.bezierCurveTo(272,178,423,178,423,189);
		ctx.bezierCurveTo(423,199,424,182,423,169);

		if (event!=null){
			if (IsInPath(event)) {
				if(which==0){
					if(lights.zone[2].status==0){	
						lights.zone[2].status=1;
						hc.addFixtureToControl(lights.zone[2].id);

					}
					else{
						lights.zone[2].status=0;
						hc.removeFixtureFromControl(lights.zone[2].id);
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
		ctx.moveTo(439,215);
		ctx.bezierCurveTo(438,200,259,204,259,215);
		ctx.bezierCurveTo(259,226,259,250,259,238);
		ctx.bezierCurveTo(259,226,439,226,439,238);
		ctx.bezierCurveTo(439,250,440,231,439,215);


		if (event!=null){
			if (IsInPath(event)) {
				if(which==0){
					if(lights.zone[3].status==0){	
						lights.zone[3].status=1;
						hc.addFixtureToControl(lights.zone[3].id);

					}
					else{
						lights.zone[3].status=0;
						hc.removeFixtureFromControl(lights.zone[3].id);
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
		ctx.moveTo(451,260);
		ctx.bezierCurveTo(450,243,244,248,244,260);
		ctx.bezierCurveTo(244,273,244,299,244,286);
		ctx.bezierCurveTo(244,273,451,273,451,286);
		ctx.bezierCurveTo(451,299,452,278,451,260);

		if (event!=null){
			if (IsInPath(event)) {
				if(which==0){
					if(lights.zone[4].status==0){	
						lights.zone[4].status=1;
						hc.addFixtureToControl(lights.zone[4].id);

					}
					else{
						lights.zone[4].status=0;
						hc.removeFixtureFromControl(lights.zone[4].id);
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
		ctx.moveTo(461,312);
		ctx.bezierCurveTo(460,292,235,298,235,312);
		ctx.bezierCurveTo(235,326,235,357,235,342);
		ctx.bezierCurveTo(235,326,461,326,461,342);
		ctx.bezierCurveTo(461,357,462,332,461,312);

		if (event!=null){
			if (IsInPath(event)) {
				if(which==0){
					if(lights.zone[5].status==0){	
						lights.zone[5].status=1;
						hc.addFixtureToControl(lights.zone[5].id);

					}
					else{
						lights.zone[5].status=0;
						hc.removeFixtureFromControl(lights.zone[5].id);
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
		ctx.moveTo(481,363);
		ctx.bezierCurveTo(479,343,229,349,229,363);
		ctx.bezierCurveTo(229,377,229,408,229,393);
		ctx.bezierCurveTo(229,377,481,377,481,393);
		ctx.bezierCurveTo(481,408,482,383,481,363);

		if (event!=null){
			if (IsInPath(event)) {
				if(which==0){
					if(lights.zone[6].status==0){	
						lights.zone[6].status=1;
						hc.addFixtureToControl(lights.zone[6].id);

					}
					else{
						lights.zone[6].status=0;
						hc.removeFixtureFromControl(lights.zone[6].id);
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
		ctx.moveTo(495,412);
		ctx.bezierCurveTo(494,389,221,396,221,412);
		ctx.bezierCurveTo(221,429,221,464,221,446);
		ctx.bezierCurveTo(221,429,495,429,495,446);
		ctx.bezierCurveTo(495,464,496,435,495,412);


		if (event!=null){
			if (IsInPath(event)) {
				if(which==0){
					if(lights.zone[7].status==0){	
						lights.zone[7].status=1;
						hc.addFixtureToControl(lights.zone[7].id);

					}
					else{
						lights.zone[7].status=0;
						hc.removeFixtureFromControl(lights.zone[7].id);
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

	ctx.globalAlpha=1;
    ctx.beginPath();
		ctx.moveTo(86,60);
		ctx.bezierCurveTo(86,60,15,161,64,192);
		ctx.bezierCurveTo(146,246,323,86,229,34);
		ctx.bezierCurveTo(183,9,86,60,86,60);



		if (event!=null){
			if (IsInPath(event)) {
				if(which==0){
					if(lights.zone[8].status==0){	
						lights.zone[8].status=1;
						hc.addFixtureToControl(lights.zone[8].id);

					}
					else{
						lights.zone[8].status=0;
						hc.removeFixtureFromControl(lights.zone[8].id);
					}
				}
				else{
					checkHighlight=8;
				}
			}
		}

	ctx.closePath();
	if(lights.zone[8].status==1){
		makeSelected(8);
	}
    if(checkHighlight==8){
		makeHighlighted(8);
	}


	ctx.globalAlpha=1;
    ctx.beginPath();
		ctx.moveTo(551,47);
		ctx.bezierCurveTo(551,47,427,-13,406,39);
		ctx.bezierCurveTo(371,131,552,269,583,165);
		ctx.bezierCurveTo(598,116,551,47,551,47);

		if (event!=null){
			if (IsInPath(event)) {
				if(which==0){
					if(lights.zone[9].status==0){	
						lights.zone[9].status=1;
						hc.addFixtureToControl(lights.zone[9].id);

					}
					else{
						lights.zone[9].status=0;
						hc.removeFixtureFromControl(lights.zone[9].id);
					}
				}
				else{
					checkHighlight=9;
				}
			}
		}

	ctx.closePath();
	if(lights.zone[9].status==1){
		makeSelected(9);
	}
    if(checkHighlight==9){
		makeHighlighted(9);
	}


	ctx.globalAlpha=1;
    ctx.beginPath();
		ctx.moveTo(70,351);
		ctx.bezierCurveTo(70,351,196,411,215,357);
		ctx.bezierCurveTo(249,264,71,142,42,246);
		ctx.bezierCurveTo(28,295,70,351,70,351);

		if (event!=null){
			if (IsInPath(event)) {
				if(which==0){
					if(lights.zone[10].status==0){	
						lights.zone[10].status=1;
						hc.addFixtureToControl(lights.zone[10].id);

					}
					else{
						lights.zone[10].status=0;
						hc.removeFixtureFromControl(lights.zone[10].id);
					}
				}
				else{
					checkHighlight=10;
				}
			}
		}

	ctx.closePath();
	if(lights.zone[10].status==1){
		makeSelected(10);
	}
    if(checkHighlight==10){
		makeHighlighted(10);
	}

	ctx.globalAlpha=1;
    ctx.beginPath();
		ctx.moveTo(641,376);
		ctx.bezierCurveTo(641,376,669,229,614,215);
		ctx.bezierCurveTo(518,191,422,399,528,418);
		ctx.bezierCurveTo(579,427,641,376,641,376);

		if (event!=null){
			if (IsInPath(event)) {
				if(which==0){
					if(lights.zone[11].status==0){	
						lights.zone[11].status=1;
						hc.addFixtureToControl(lights.zone[11].id);

					}
					else{
						lights.zone[11].status=0;
						hc.removeFixtureFromControl(lights.zone[11].id);
					}
				}
				else{
					checkHighlight=11;
				}
			}
		}

	ctx.closePath();
	if(lights.zone[11].status==1){
		makeSelected(11);
	}
    if(checkHighlight==11){
		makeHighlighted(11);
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
    //add bulb to state object
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
