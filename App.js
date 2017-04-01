function secret()
{
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,;[]{}/?()!@#$%";

	for( var i=0; i < 20; i++ )
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

//Requires independentes de recursos================================
console.log("INFO: Requiring NPM Dependencies");

var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var expressSession = require("express-session");
var cookieParser = require("cookie-parser");

console.log("INFO: NPM Dependencies required Sucessfully.");




//Inicialização de objetos==========================================

console.log("INFO: Initializing Application Server");

var router = express();

router.use(cookieParser());
router.use(expressSession({secret:secret()}));


console.log("INFO: Application server initialized sucessfully");

//==================================================================


//Definições de uso dos objetos=====================================
console.log("INFO: Applying configurations to application server.");

router.use(express.static(path.resolve(__dirname, 'client/')));
router.use(bodyParser.json());



console.log("INFO: configurations applied");

//==================================================================


//Requires dependetes de recursos===================================
console.log("INFO: requiring inner dependencies");

var JsonFileReader = require("./src/util/JsonFileReader");


console.log("INFO: Setup Interceptors.");

var interceptor = require("./src/interceptor/Interceptors");
router.use(interceptor);

console.log("INFO: Interceptors setup sucess.");

//Require do arquivo que configura as rotas das requisições
require("./src/controller/Routes")(router);


console.log("INFO: Dependencies required sucessfully.");


//==================================================================

console.log("INFO: Reading configuration file.");

var json = new JsonFileReader();
var config = json.readFile("config.json");

console.log("INFO: configurations file sucessfully readed.");



//Inicialização do Wapp.use(cookieParser());

router.use(expressSession({secret:'somesecrettokenhere'}));

console.log("INFO: Setup of environment variables.");

process.env.NODE_ENV = config.environment;
process.env.PORT = config.port;
process.env.SESSION = config.session;

console.log("INFO: Setup ok.");

console.log("INFO: Starting Server");
router.listen(process.env.PORT, function()
{
    console.log("INFO: Server started at http://localhost:"+process.env.PORT);
});


///==================================================================