/*------------HOME-------------*/

const menu     = require('./modules/Home/menu.js');
const register = require('./modules/Home/register.js');
const version  = require('./modules/Home/version.js');
const swap     = require('./modules/Home/swap.js');
const network  = require('./modules/Error/network');

module.exports = {
  message: {

  	/*--------------------HOME-----------------------*/
   // Menu
   menu:menu, 
   //Register 
   register:register,
   //version 
   version : version,   
   //swap 
   swap : swap,
   //network
   network : network
  }		
}