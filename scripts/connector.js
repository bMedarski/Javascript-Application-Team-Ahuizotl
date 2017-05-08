
    class Connection {
        constructor() {}
        get(url) {
            let promise = new Promise(function(resolve, reject){
                $.ajax({
                    headers: { 'X-Auth-Token': 'd31ecf09ca784f769c1be2a8ddd2f28e' },
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
const connect = new Connection();

export {connect};