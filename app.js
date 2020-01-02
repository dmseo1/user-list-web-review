var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

require('dotenv').config();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('html', require('ejs'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); //json 형태로 들어오는 데이터도 해석할 수 있게 된다.
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./router/index'));



var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`서버가 시작되었습니다: http://localhost:${port}`);
});