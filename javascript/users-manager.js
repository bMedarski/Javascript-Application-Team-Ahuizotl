(function() {
    Kinvey.initialize({
        appKey: 'kid_SkHdM_jyb',
        appSecret: 'ce27e6e5f57a4ddc96c196df6bd59a90'
    }).then(function(activeUser) {
        // ...
    }).catch(function(error) {
        // ...
    })
})

const UsersManager =  {
        register: function(username, password) {
            var user = new Kinvey.User();
            var promise = user.signup({
                username: username,
                password: password
            }).then(function onSuccess(user) {
                localStorage.setItem('username', username);
            }).catch(function onError(error) {
                //...
            }); 
        },

        login: function(username, password) {
            var user = new Kinvey.User();
            var promise = user.login({
                username: username,
                password: password
            }).then(function onSuccess(user) {
                localStorage.setItem('username', username);
                //console.log(localStorage.getItem('username'));
            }).catch(function onError(error) {
                //...
            }); 
        },

        logout: function(username, password) {
            var promise = Kinvey.User.logout();
            promsie = promise.then(function onSuccess() {
                localStorage.setItem('username', null);
            }).catch(function onError(error) {
                // ...
            });
        }
} 