// methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.
var connection = require('./connection');
// get home

// Helper function for SQL syntax.
// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
    // loop through the keys and push the key/value as a string into arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations 
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

module.exports = {
    //get
    selectAll: function (table, cb) {
        // create SQL search
        var sqlsearch = "SELECT * FROM " + table
        // Run query
        connection.query(sqlsearch, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result)
        });
    },
    // post
    insertOne: function (table, column, value, cb) {
        // create SQL search
        var sqlsearch = 'INSERT INTO ' + table + ' (' + column + ') VALUES ("' + value + '");'
        // Run query
        connection.query(sqlsearch, value, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result)
        });
    },
    //put
    updateOne: function (table, updateColVal, condition, cb) {
        // create SQL search
        var sqlsearch = "UPDATE  " + table + " SET " + objToSql(updateColVal) + " WHERE " + condition
        // Run query
        connection.query(sqlsearch, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result)

        });
    }
    ,
}