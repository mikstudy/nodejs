var sql = require('mssql');

var config = {
    user: 'sa',
    password: 'dnjem!1',
    server: 'localhost',
    database: 'Dev'
};

var connection = new sql.Connection(config, function(err){
    // Query
    var request = new sql.Request(connection);
    var query = 'SELECT TOP 1000 [UserID] FROM [Dev].[dbo].[tb_User]';
    request.query(query, function (err, recordset) {
        // ... error checks
        //console.dir(recordset);
        console.log(recordset);
    });

});
