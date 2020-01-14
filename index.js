//import './dict.js';

var fs = require("fs");
var url = require('url');
var app = require('express')();
var http = require("http").createServer(app);
var dict = require("./dict");
var io = require('socket.io')(http);
var dir = __dirname;
var cookieParser = require('cookie-parser');
app.use(cookieParser());

console.log(dir);
console.log(typeof dict.dict);

class Character {
  constructor(name) {
    this.name = name;
    this.saveString = "err";
    this.dict = new dict.dict();
  }
  addVar(name, val) {
    switch (typeof val) {
      default:
        this.dict.inject("$STR" + name, val);
        this.save();
        break;
      case "number":
        this.dict.inject("$INT" + name, val);
        this.save();
        break;
    }

  }
  save() {
    var svstr = this.dict.toSaveStr();
    if (svstr == "err") return;
    fs.writeFile("saves/" + this.name + '.txt', svstr, function(err) {
      //if (err) throw err;
      console.log('Saved!');
    });
  }
  readSave() {
    this.saveString = "err";
    var saveString = this.saveString
    fs.readFile("saves/" + this.name + ".txt", function(err, data) {

      if (data != null) saveString = data;
    });
    this.saveString = saveString
    console.log(this.saveString);
    if (this.saveString != "err") {
      var saveStuff = this.saveString.split("`\n");
      saveStuff.forEach(function(ind, val) {
        var c = val.split("`=");
        try {
          this.addVar(c[0], c[1]);
        } catch (err) { }
      });
    }


  }
  getVar(name) {
    return this.dict.getVal(name);
  }
}

var char = new Character("Test");
char.readSave();
console.log(char.getVar("$STRpineapples"));
char.addVar("pineapples", "green");

var chars = ["Test"];

app.get('/', function(req, res) {
  //res.cookie("char", chars);
  var q = url.parse(req.url, true).query;
  if(q.char == null){
    res.sendFile(__dirname + '/index.html');
  } else {
    res.sendFile(__dirname + '/test.html');
  }
  console.log(q);
  //res.sendFile(__dirname, '/test.html');
  
  //res.sendFile(__dirname + '/test.html');
});

app.get('/char', function(req, res){
  var q = url.parse(adr, true).query;
  res.sendFile(__dirname, '/test.html');

});


io.on('connection', function(socket) {
  
  console.log('a user connected');
  chars.forEach(function(v, i){socket.emit('char recieved', v)});
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

//io.on('charsrequest', function());

http.listen(8080, function() {

});

/*0000000000000000000000000
0000000000000000000000000
0000111111111111111110000
0000011111111111111100000
0010001111111111111000100
0011000111111111110001100
0011100011111111100011100
0011110001111111000111100
0011111000111110001111100
0011111100011100011111100
0011111110001000111111100
0011111111000001111111100
0011111111100011111111100
0011111111000001111111100
0011111110001000111111100
0011111100011100011111100
0011111000111110001111100
0011110001111111000111100
0011100011111111100011100
0011000111111111110001100
0010001111111111111000100
0000011111111111111100000
0000111111111111111110000
0000000000000000000000000
0000000000000000000000000*/