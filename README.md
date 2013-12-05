INCREDIBLE MACHINES HOLIDAY 2013 CARD
--------------------------------------------

Brought to you by us.

Running on the server:
---------------------

ssh into the machine

cd /var/www/

nvm use 0.10

 *First time running 
	npm install
	forever -a -l visualtree.log -o visualtree_out.log -e visualtree_error.log app.js

 *Restarting Server
	forever restartall

