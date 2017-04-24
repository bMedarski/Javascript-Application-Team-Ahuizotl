const Connection = (function () {
    class Connection {
        constructor() {}
        get() {
            let promise = new Promise(function(resolve, reject){
                $.ajax({
                    headers: { 'X-Auth-Token': 'ba2ca6f1811849d690a248353d63f1ca' },
                    url: 'http://api.football-data.org/v1/competitions/398/teams',
                    dataType: 'json',
                    type: 'GET',
                    success:function(connection){
                       resolve(connection);
                    },
                    error:function(err){
                        reject(err);
                    }
                })
            });
            return promise
        }
    }
    return Connection;
} ());

export {Connection};