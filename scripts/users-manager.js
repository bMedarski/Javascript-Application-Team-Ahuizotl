import {Validator} from 'validator';
Kinvey.initialize({
    appKey: 'kid_SkHdM_jyb',
    appSecret: 'ce27e6e5f57a4ddc96c196df6bd59a90'
}).then(function(activeUser) {
    // ...
}).catch(function(error) {
    // ...
});

var dataStore = Kinvey.DataStore.collection('FollowedTeams');

class UsersManager{
    constructor() {}
    register(username, password1, password2, successCallback, failCallback) {
        if (Validator.isValidUsername(username) &&
            Validator.isValidPassword(password1) &&
            Validator.stringsMatch(password1, password2)) {
            this.logout(function () {
                var user = new Kinvey.User();
                var promise = user.signup({
                    username: username,
                    password: password1
                }).then(function onSuccess(user) {
                    localStorage.setItem('username', username);
                    successCallback();
                }).catch(function onError(error) {
                    failCallback();
                });
            });
        }else
        {
            failCallback();
        }
    };

    login(username, password, successCallback, failCallback) {
        if (Validator.isValidUsername(username) && Validator.isValidPassword(password)) {
            this.logout(function(){
                var user = new Kinvey.User();
                var promise = user.login({
                    username: username,
                    password: password
                }).then(function onSuccess(user) {
                    localStorage.setItem('username', username);
                    successCallback();
                }).catch(function onError(error) {
                    failCallback();
                });
            });
        }else
        {
            failCallback();
        }
    };

    logout(callback) {
        var logout = Kinvey.User.logout();
        var promise = logout.then(function onSuccess() {
            localStorage.setItem('username', null);
            callback();
        }).catch(function onError(error) {
            callback();
        });
    };

    getFollowedTeams(callback) {
        var query = new Kinvey.Query();
        query.equalTo('username', localStorage.getItem('username'));
        var stream = dataStore.find(query);
        var entities = [];
        stream.subscribe(function onNext(e) {
            entities = e;
            console.log(entities);
        }, function onError(error) {
            // ...
        }, function onComplete() {
            try {

                console.log('success');
                callback(entities[0].teams);
            }
            catch(e) {
                var emptyTeamsArray = [];
                callback(emptyTeamsArray);
            }
        });
    };

    followTeam(teamName) {
        this.getFollowedTeams(function(teamsArray) {
            if(teamsArray.indexOf(teamName) < 0) {
                this.unfollowAllTeams(function(){
                    teamsArray.push(teamName);
                    var promise = dataStore.save({
                        username: localStorage.getItem('username'),
                        teams: teamsArray
                    }).then(function onSuccess(entity) {
                        console.log('team followed SUCC')
                    }).catch(function onError(error) {
                        //console.log('team followed FAILED')
                    });
                });
            }
        });
    };

    unfollowTeam(teamName) {
        UsersManager.getFollowedTeams(function(teamsArray) {
            var index = teamsArray.indexOf(teamName);
            if(index >= 0) {
                UsersManager.unfollowAllTeams(function(){
                    teamsArray.splice(index, 1);
                    var promise = dataStore.save({
                        username: localStorage.getItem('username'),
                        teams: teamsArray
                    }).then(function onSuccess(entity) {
                        //console.log('team unfollowed SUCC')
                    }).catch(function onError(error) {
                        //console.log('team unfollowed FAILED')
                    });
                });
            }
        });
    };

    unfollowAllTeams(callback) {
        var query = new Kinvey.Query();
        query.equalTo('username', localStorage.getItem('username'));
        var promise = dataStore.remove(query);
        promise = promise.then(function onSuccess(result) {
            callback();
        }).catch(function onError(error) {
            // ...
        });
    }
}
let userManager = new UsersManager();
export {userManager};