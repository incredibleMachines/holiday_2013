

$(document).ready( function (){

//holiday controller to server 
var hc = new HolidayController( function(){})

//parsing for some cus words
var profanity=['anus','ass','clit','clits','nipple','nipples','vagina','vaginas','boob','boobs','shit','homo','homosexual','pee','piss','poop','fuck','f u c k','f a g g o t', 'faggot','f a g g e t','fag','nuts','tits','t i t s','nigger','n i g g e r','cunt', 'c u n t','bitch','bastard','whore','slut','pussy','penis','weiner','cock','balls','dick','damn','goddam','fart','asshole', 'butt','sex','cum','cumming','jizz', 'puta', 'testicle','testie','testies','testy'];
$('input.name').keyup(function(){
	var val = $(this).val().toLowerCase();
	if(val == 'billballbaggins') $(this).val('Joe Saavedra')
	if(val == 'lonely social guy') $(this).val('Little Vicky')
	if(val == 'piuggi') $(this).val('master of the world');
	if(val == 'leif') $(this).val('peiferoni and cheese');

	for(var i = 0; i<profanity.length; i++){
		if(val.indexOf(profanity[i])>-1){
			//console.log('Found Cuss '+profanity[i]);
			var length = profanity[i].length;
			var string='';
			for(var j=0; j<length; j++) string += '*';
			var res = val.replace(profanity[i],string);
			$(this).val(res)
		}
	}
	
	//console.log($(this).val());
})

$('#alert-highlight').hide();

$('#hue').slider({ //-1 black 361 white the rest is proper 0-360 Hue vals
	    value: 1,
	    min: -1,
	    max:361,
	    slide: function(event, ui) {
	        //tip.text(ui.value);
	    },
	    change: function(event, ui) {},
	    stop:function(event,ui){
		    hc.updateHue(ui.value*182.04, $('input.name').val());//send update to our obj

	    }
	}).find(".ui-slider-handle")/*.append(tip)*/.hover(function() {
	    //tip.show()
	}, function() {
	    //durationtip.hide()
	});

//control buttons for alerts and speeds and such
$('#freq li, #dur li').click(function(e){
		e.preventDefault();
		//send api call updating speed of alert;
		//console.log($(this));
		$(this).toggleClass('disabled').toggleClass('active');
		var siblings = $(this).siblings().addClass('disabled').removeClass('active');
		//send our alerts
		//check for button state
		holidayAlert();

});

$('#alerts button[name=alert-type]').click(function(e){
		//alert($(this).val())
		holidayAlert(this);
		//set this up to send alerts over.
})

function holidayAlert(_obj){
		var alert = {};

		if(_obj != null){
		
			alert.type= parseInt($(_obj).val());
			$(_obj).removeClass('active');
		
		}else{
			var type = $('#alerts').find('.active');
	
			if(type.length == 0) alert.type=0;
			else alert.type=parseInt($(type[0]).val());

			$(type[0]).removeClass('active');

		}
		
		var freq = $('#freq').find('.active')

		if(freq.length == 0) alert.frequency=0;
		else alert.frequency= parseInt($(freq[0]).val());
		
		var dur = $('#dur').find('.active');
		
		if(dur.length == 0) alert.duration = 332;
		else alert.duration = parseInt($(dur[0]).val());
		
		var hue = $( "#hue" ).slider( "value" );
		//console.log(hue*182.04)
		hc.sendAlert(hue*182.04,alert, $('input.name').val());
		//if(debug)console.log(alert);
}

//canvas stuff
var canvas = document.getElementById("video");
var ctx = canvas.getContext("2d");

var lights={
    "zone": [
        {
            "id": "52a0caf4182adc5c1b000005",
            "status": 0,
            "slug":"the star"
        },
        {
            "id": "52a0c953182adc5c1b000004",
            "status": 0,
            "slug": "strip 1"
        },
        {
            "id": "52a0c900182adc5c1b000003",
            "status": 0,
            "slug": "strip 2"
        },
        {
            "id": "52a0c81e182adc5c1b000002",
            "status": 0,
            "slug": "strip 3"
        },
        {
            "id": "52a0ddb1182adc5c1b000006",
            "status": 0,
            "slug": "strip 4"
            
        },
        {
            "id": "52a204b958435b250b000001",
            "status": 0,
            "slug": "strip 5"
        },
        {	
            "id": "52a66c62545907c222000001",
            "status": 0,
            "slug": "strip 6"
        },
        {
            "id": "52a20cfe58435b250b000003",
            "status": 0,
            "slug": "strip 7"
        },
        {
            "id": "52a24e38aaa4ac750c000001",
            "status": 0,
   	        "slug": "blank"

        },
        {
	        "id":"52a5efd37a391a7a1c000001",
	        "status":0,
	        "slug": "blank"
        },
        {
            
            "id":"52a5ea6d494c148f1b000001",
            "status": 0,
   	        "slug": "blank"

        },
        {
	        "id": "52a2146d58435b250b000005",
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
		ctx.moveTo(351,45);
		ctx.lineTo(358,60);
		ctx.lineTo(374,62);
		ctx.lineTo(363,73);
		ctx.lineTo(365,90);
		ctx.lineTo(351,82);
		ctx.lineTo(336,90);
		ctx.lineTo(339,73);
		ctx.lineTo(327,62);
		ctx.lineTo(343,60);
		ctx.lineTo(351,45);

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
				else if (which==2){
					checkHighlight=null;
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
		ctx.moveTo(393,103);
		ctx.bezierCurveTo(388,107,374,114,356,114);
		ctx.bezierCurveTo(337,114,323,107,319,103);
		ctx.lineTo(309,123);
		ctx.bezierCurveTo(320,131,337,136,356,136);
		ctx.bezierCurveTo(374,136,391,131,402,123);
		ctx.lineTo(393,103);


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
				else if (which==2){
					checkHighlight=null;
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
		ctx.moveTo(414,144);
		ctx.bezierCurveTo(403,151,383,160,356,160);
		ctx.bezierCurveTo(329,160,308,151,297,144);
		ctx.lineTo(288,164);
		ctx.bezierCurveTo(305,175,330,182,356,182);
		ctx.bezierCurveTo(382,182,407,175,424,164);
		ctx.lineTo(414,144);

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
				else if (which==2){
					checkHighlight=null;
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
		ctx.moveTo(436,184);
		ctx.bezierCurveTo(432,187,428,190,421,193);
		ctx.bezierCurveTo(403,202,379,208,356,208);
		ctx.bezierCurveTo(333,208,309,202,290,193);
		ctx.bezierCurveTo(284,190,279,187,276,184);
		ctx.lineTo(266,204);
		ctx.bezierCurveTo(287,219,321,230,356,230);
		ctx.bezierCurveTo(391,230,425,219,445,204);
		ctx.lineTo(436,184);


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
				else if (which==2){
					checkHighlight=null;
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
		ctx.moveTo(457,224);
		ctx.bezierCurveTo(452,229,445,234,434,240);
		ctx.bezierCurveTo(412,251,383,257,356,257);
		ctx.bezierCurveTo(328,257,300,251,278,240);
		ctx.bezierCurveTo(267,234,259,228,255,224);
		ctx.lineTo(245,245);
		ctx.bezierCurveTo(251,250,259,255,268,260);
		ctx.bezierCurveTo(293,272,324,279,356,279);
		ctx.bezierCurveTo(387,279,418,272,443,260);
		ctx.bezierCurveTo(453,255,460,250,466,245);
		ctx.lineTo(457,224);

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
				else if (which==2){
					checkHighlight=null;
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
		ctx.moveTo(478,265);
		ctx.bezierCurveTo(473,273,460,283,447,289);
		ctx.bezierCurveTo(422,302,388,310,356,310);
		ctx.bezierCurveTo(323,310,290,302,264,289);
		ctx.bezierCurveTo(248,281,238,272,233,265);
		ctx.lineTo(223,287);
		ctx.bezierCurveTo(230,294,241,302,254,309);
		ctx.bezierCurveTo(283,323,319,332,356,332);
		ctx.bezierCurveTo(392,332,428,323,457,309);
		ctx.bezierCurveTo(470,302,481,295,489,287);
		ctx.lineTo(478,265);

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
				else if (which==2){
					checkHighlight=null;
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
		ctx.moveTo(500,305);
		ctx.bezierCurveTo(497,314,484,326,461,338);
		ctx.bezierCurveTo(431,353,393,362,356,362);
		ctx.bezierCurveTo(318,362,280,353,250,338);
		ctx.bezierCurveTo(227,326,215,313,212,305);
		ctx.lineTo(200,328);
		ctx.bezierCurveTo(209,339,223,349,241,358);
		ctx.bezierCurveTo(274,374,315,384,356,384);
		ctx.bezierCurveTo(397,384,438,374,471,358);
		ctx.bezierCurveTo(489,349,502,339,511,328);
		ctx.lineTo(500,305);

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
				else if (which==2){
					checkHighlight=null;
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
ctx.moveTo(521,345);
ctx.lineTo(520,345);
ctx.bezierCurveTo(520,369,451,415,356,415);
ctx.bezierCurveTo(261,415,192,369,192,345);
ctx.lineTo(192,345);
ctx.lineTo(200,393);
ctx.lineTo(209,393);
ctx.bezierCurveTo(211,395,213,401,227,408);
ctx.bezierCurveTo(264,427,310,437,356,437);
ctx.bezierCurveTo(402,437,448,427,485,408);
ctx.bezierCurveTo(507,396,524,383,533,370);
ctx.lineTo(521,345);


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
				else if (which==2){
					checkHighlight=null;
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
		ctx.moveTo(123,89);
		ctx.lineTo(156,215);
		ctx.bezierCurveTo(156,215,218,198,250,147);
		ctx.bezierCurveTo(282,94,267,33,267,33);
		ctx.lineTo(140,61);
		ctx.bezierCurveTo(140,61,140,70,136,77);
		ctx.bezierCurveTo(132,84,123,89,123,89);



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
				else if (which==2){
					checkHighlight=null;
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
ctx.moveTo(579,72);
ctx.lineTo(461,52);
ctx.bezierCurveTo(461,52,451,110,482,156);
ctx.bezierCurveTo(514,204,571,214,571,214);
ctx.lineTo(596,97);
ctx.bezierCurveTo(596,97,587,94,583,88);
ctx.bezierCurveTo(579,82,579,72,579,72);

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
				else if (which==2){
					checkHighlight=null;
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
ctx.moveTo(498,485);
ctx.lineTo(503,412);
ctx.lineTo(533,412);
ctx.lineTo(538,344);
ctx.lineTo(635,345);
ctx.lineTo(656,360);
ctx.lineTo(656,409);
ctx.lineTo(663,410);
ctx.lineTo(698,437);
ctx.lineTo(694,517);
ctx.lineTo(516,514);
ctx.lineTo(498,485);


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
				else if (which==2){
					checkHighlight=null;
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

ctx.moveTo(33,485);
ctx.lineTo(29,410);
ctx.lineTo(45,410);
ctx.lineTo(57,361);
ctx.lineTo(57,336);
ctx.lineTo(71,332);
ctx.lineTo(72,265);
ctx.lineTo(85,260);
ctx.lineTo(98,235);
ctx.lineTo(169,238);
ctx.lineTo(169,258);
ctx.lineTo(180,260);
ctx.lineTo(180,332);
ctx.lineTo(190,332);
ctx.lineTo(200,393);
ctx.lineTo(209,393);
ctx.lineTo(212,464);
ctx.lineTo(190,485);
ctx.lineTo(33,485);



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
				else if (which==2){
					checkHighlight=null;
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
    if (!ctx.setLineDash) {
    	ctx.setLineDash = function () {}
	}
    ctx.setLineDash([6,4]);
    ctx.stroke();
    //add bulb to state object
}

function makeHighlighted(bulb){
	ctx.globalAlpha=0.5;
    ctx.fillStyle= 'white';
    ctx.fill();
}

  $('#video').click(function(e){
  	definePaths(e,0);
  	$('#alert-highlight').hide();
  });

  $('#video').mousemove(function(e){
  	definePaths(e,1);
  });

  $('#video').mouseleave(function(e){
  	definePaths(e,2);
  	//console.log('out');
  });

  $('#alert-highlight').click(function(){
  	$('#alert-highlight').hide();
  });


});
