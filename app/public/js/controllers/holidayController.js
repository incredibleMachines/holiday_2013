//$(document).ready(function(){
function HolidayController(mainCallback){
	
	//globals
	var _this = this; 
	var reconnect = false;

	var socket; //globalish io variable
	var state ={	ids: [],
					on: true,
					method: 'put',
					hue: null, 
					sat: 211, //set this default
					bri: 120, //set this default
					alert: {duration:0,frequency:0,type:0}
					}; //state object 
					
	/* Sample State object
		state =
				{	ids: [bulb ids],
					on:true,
					method:'put',
					hue:((h.h *360)* 182.04), //we convert the hue value into degrees then convert to scaled hue by multiplying the value by 182.04
					sat:(h.s * 254),
					bri:(h.l * 254),
					alert: {duration: 0, frequency: 0, type: 0}
				};
	*/
	
	//connect the Socket
	this.connectSocket=function(callback){
		console.log("connect socket");
		var session = getCookie('sessionID');
		console.log(document.cookie);
		if(reconnect){
			socket.socket.reconnect();
			callback(socket);
		}else{
			socket = io.connect('/?session='+encodeURIComponent(session));
			callback(socket);
		}
	}
	
	this.updateHue=function (hue,callback){
		//check if hue is -1 or 361 (black or white)
		//change hsl to reflect
		//then change back
		switch(hue){
			case -1*182.04:
				console.log("White");
				state.sat = 0;
				state.hue = 0;
				state.bri = 254;
				_this.sendAPICall();
				//set defaults back
				state.sat= 211;
				state.bri=120;
				break;
			case 361*182.04:
				console.log("Black");
				state.sat = 0;
				state.hue = 0;
				state.bri = 0;
				_this.sendAPICall();
				//set defaults back
				state.sat= 211;
				state.bri=120;
				break;
			default:
				state.hue=hue;
				console.log('hue changed');
				_this.sendAPICall();
				break;
				
		}
	}
	
	this.sendAlert= function(alert){
		var obj = JSON.parse(JSON.stringify(state)); //explicity copy the data into a new object
		obj.alert = alert;
		_this.sendAPICall(obj);
	}
	
	
	this.updateDuration=function(dur){
		state.alert.duration= dur;
		//_this.sendAPICall();
		//state.alert.duration=0;
	}
	this.updateFrequency=function(freq){
		state.alert.frequency = freq;
		state.alert.duration = 1;
		//_this.sendAPICall();
		//state.alert.duration=0;
	}
	
	this.updateType = function(type){
		state.alert.type = type;
		state.alert.duration=1;
		//_this.sendAPICall();
		//state.alert.duration=0;
	}
	//check if object is in state.ids
	this.isFixtureInControl=function(id){
		if(state.ids.indexOf(id)>-1) return true;
		else return false;
	}
	//add light to objects
	this.addFixtureToControl=function(id){
		console.log('add request: '+id);
		if(!_this.isFixtureInControl(id)) state.ids.push(id);
	}
	//remove light from objects
	this.removeFixtureFromControl=function(id){
		console.log('remove request: '+id);
		var index = state.ids.indexOf(id);
		if(index>-1) state.ids.splice(index,1);
		//otherwise we got some sort of weird error
	}
	
	//socket commands



	//other messages we need to send?
		
	this.sendAPICall=function(_obj){
	  //iterate on state array
      //state.id = currBulbId;
      
      //state.type = currBulbType;
      if(_obj==null){
	      //must do this with groups as this will be quite slow.
	      for(var i =0; i<state.ids.length; i++){
	      		var obj = JSON.parse(JSON.stringify(state));
	      		delete obj.ids;
		      	obj.id = state.ids[i];
		      	var json = JSON.stringify(obj);
			  	console.log(json);
			  	socket.send(json);
	      }
	}else{
		for(var i =0; i<state.ids.length; i++){
			delete _obj.ids;
			_obj.id = state.ids[i];
			var json =JSON.stringify(_obj);
			console.log(json);
			socket.send(json);
		}
	}      

   	}
	//startup
	this.connectSocket(function(socket){
		socket.on('connect',function(){
			//connection update
			console.log('Connection');
		})
		socket.on('disconnect',function(){
			//open.disabled = false;
			//close.disabled = true;
			reconnect = true;
		});				
	});
	

	//callback to the holiday.js view 
	mainCallback();
}	


function getCookies() {
    var c = document.cookie, v = 0, cookies = {};
    if (document.cookie.match(/^\s*\$Version=(?:"1"|1);\s*(.*)/)) {
        c = RegExp.$1;
        v = 1;
    }
    if (v === 0) {
        c.split(/[,;]/).map(function(cookie) {
            var parts = cookie.split(/=/, 2),
                name = decodeURIComponent(parts[0].trimLeft()),
                value = parts.length > 1 ? decodeURIComponent(parts[1].trimRight()) : null;
            cookies[name] = value;
        });
    } else {
        c.match(/(?:^|\s+)([!#$%&'*+\-.0-9A-Z^`a-z|~]+)=([!#$%&'*+\-.0-9A-Z^`a-z|~]*|"(?:[\x20-\x7E\x80\xFF]|\\[\x00-\x7F])*")(?=\s*[,;]|$)/g).map(function($0, $1) {
            var name = $0,
                value = $1.charAt(0) === '"'
                          ? $1.substr(1, -1).replace(/\\(.)/g, "$1")
                          : $1;
            cookies[name] = value;
        });
    }
    return cookies;
}
function getCookie(name) {
    return getCookies()[name];
}
//})