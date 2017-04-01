var method = Conexao.prototype;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var JsonReader = require("./../../util/JsonFileReader");

this.jsonReader;
this.mongo;
this.url;

function Conexao()
{
    this.jsonReader = new JsonReader();
    this.url = loadUrl(this.jsonReader.readFile("./config.json"));
    this.mongo = MongoClient;
}

method.conectar = function (callback)
{
    this.mongo.connect(this.url, function(err, db)
    {
       if(callback)
       {
           if(err)
           {
               callback(err);
               return;
           }
           callback(err, db);
       }
       else
       {
           if(err)
               throw err;
       }
    });
};

method.cadastrar = function(entity, db, callback)
{       
    db.collection(entity.constructor.name).insertOne(entity, function(err, result)
    {
        if(callback)
        {
            callback(err, result.insertedId);
        }
        else
        {   
            if(err)
                throw err;
        }
    });
};

method.buscar = function (collection, db, callback, args, sort)
{   
    if(!sort)
        var cursor = db.collection(collection).find(args);
    else
        var cursor = db.collection(collection).find(args).sort(sort);
    
    cursor.rewind();
    cursor.toArray(callback);
};

method.buscarPorId = function (collection, db, callback, args)
{      
    var cursor = db.collection(collection).find({_id: new ObjectId(args)});
    cursor.rewind();
    cursor.toArray(callback);
};

method.editar = function(entity, db, callback, id)
{
    db.collection(entity.constructor.name).replaceOne({_id: new ObjectId(id)}, entity, function (err, result)
    {
        if(callback)
            callback(err, result);
        else
        {
            if(err)
                throw err;
        }
    });
};

method.deletar = function (collection, db, callback, id)
{
    db.collection(collection).deleteOne({_id: new ObjectId(id)}, function(err, results)
    {
        if(callback)
            callback(err, results);
        else
        {
            if(err)
                throw err;
        }
    });
};

function loadUrl(config)
{
    var url;
    url = "mongodb://";
    
    if(config.database.user)
        url += config.database.user + ":";
    
    if(config.database.password)
        url += config.database.password + "@";
    
    url += config.database.host + ":";
    url += config.database.port + "/";
    url += config.database.name;
    
    return url;
}

module.exports = Conexao;
