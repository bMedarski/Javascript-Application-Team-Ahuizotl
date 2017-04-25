const Connection = (function () {
    class Connection {
        constructor() {}
        get(url) {
            let promise = new Promise(function(resolve, reject){
                $.ajax({
                    headers: { 'X-Auth-Token': 'ba2ca6f1811849d690a248353d63f1ca' },
                    url: url,
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