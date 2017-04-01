var method = JsonFileReader.prototype; 
var fileReader = require("fs");

function JsonFileReader()
{
	
}

method.readFile = function(path)
{
    var json = JSON.parse(fileReader.readFileSync(path, 'utf8'));
    return json;
};

module.exports = JsonFileReader;
