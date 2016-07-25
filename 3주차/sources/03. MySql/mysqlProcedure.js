var sql = require('mssql');
var config = {
    user: 'sa',
    password: 'dnjem!1',
    server: 'localhost',
    database: 'Dev'
};

//var connection = new sql.Connection(config, function(err){
sql.connect(config, function(err){
    // Stored Procedure
    //var request = new sql.Request(connection);
    var request = new sql.Request();
    var userId = '3333';
    request.input('UserID', sql.VarChar, userId);
    request.execute('up_User_Insert', function (err, returnValue) {
        // ... error checks
        console.log(err);
        console.dir(returnValue);
    });

});