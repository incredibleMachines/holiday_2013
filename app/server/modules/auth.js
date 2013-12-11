//middleware to check if user is authenticated into page
var AM = require('./account-manager');

exports.sessionCheck = function(req, res, next){
	//console.log(req.session);
	AM.sessionAuth(req.cookies['connect.sid'],req.session, function(valid){
		if(valid === true) next();
		else res.redirect('/login');
	})

}

//returns 400
exports.authCheck = function(req, res, next){ // This should be able to handle both a session/cookie auth or an api key auth
	console.log('Checking Auth');
	AM.sessionAuth(req.cookies['connect.sid'],req.session, function(valid){
		if(valid === true) next();
		else res.send('not-authorized',400);
	})

}

exports.autoLogin = function(req,res,next){
	
	console.log('AutoLogin');
	AM.manualLogin('user', 'securitree', function(e, o){
			if (!o){
				res.send(e, 400);
			}	else{
				//log in our user with a session
			    req.session.user = o.user;
			    res.cookie('sessionID',req.sessionID);
			    console.log('User Authenticated: '.info+o.user+' Session: '.info+JSON.stringify(req.session).data)
				if (req.param('remember-me') == 'true'){
					res.cookie('user', o.user, { maxAge: 900000 });
					//res.cookie('pass', o.pass, { maxAge: 900000 });
				}
				res.send(o, 200);
			}
		});
	
}
