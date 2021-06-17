"use strict";
exports.__esModule = true;
exports.connectToDatabase = void 0;
var mongoose_1 = require("mongoose");
var MONGODB_URI = process.env.MONGODB_URI; // .env.local 설정파일 만들어줘야함
console.log("mongodb_uri = " + MONGODB_URI);

var options = {
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
};
var connectToDatabase = function (uri) {
    if (uri === void 0) { uri = MONGODB_URI; }
    return mongoose_1.connect(uri, options);
};
exports.connectToDatabase = connectToDatabase;
