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
    constructor() {
    }

    register(username, password1, password2, successCallback, failCallback) {
        if (Validator.isValidUsername(username) &&
            Validator.isValidPassword(password1) &&
            Validator.stringsMatch(password1, password2)) {
            userManager.logout(function () {
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
        }
        else {
            failCallback();
        }
    };

    login(username, password, successCallback, failCallback) {
        if (Validator.isValidUsername(username) && Validator.isValidPassword(password)) {
            userManager.logout(function(){
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
        }, function onError(error) {
        }, function onComplete() {
            try {
                if (entities.length > 0){             
                    callback(entities[0].teams);
                }
                else {                              
                    var emptyArray = [];
                    callback(emptyArray);
                }
            }
            catch(e) {        
                var emptyTeamsArray = [];
                callback(emptyTeamsArray);
            }
        });
    };

    followTeam(team) {
        userManager.checkIfTeamIsFollowed(
                team, 
                function(){},
                function() {
                    userManager.getFollowedTeams(function(teamsArray) {
                        userManager.unfollowAllTeams(function(){
                            teamsArray.push(team);
                            var promise = dataStore.save({
                                username: localStorage.getItem('username'),
                                teams: teamsArray
                            }).then(function onSuccess(entity) {
                                //console.log('team followed SUCC')
                            }).catch(function onError(error) {
                                //console.log('team followed FAILED')
                            });
                        });
                    })})
    };

    unfollowTeam(team,callback) {
        userManager.getFollowedTeams(function(teamsArray) {
            var index = -1;
            for (var i = 0; i < teamsArray.length; i += 1) {
                if (team.id == teamsArray[i].id) {    
                    index = i;
                    break;
                }
            }
            if(index >= 0) {
                userManager.unfollowAllTeams(function(){
                    teamsArray.splice(index, 1);
                    var promise = dataStore.save({
                        username: localStorage.getItem('username'),
                        teams: teamsArray
                    }).then(function onSuccess(entity) {
                        callback();
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

    checkIfTeamIsFollowed(team, followedCallback, notFollowedCallback) {
        userManager.getFollowedTeams(function(teams){
            var isFollowed = false;
            for (let i = 0; i < teams.length; i += 1) {
                if (team.id == teams[i].id){
                    isFollowed = true;
                    break;
                }
            }
            if (isFollowed) {
                followedCallback();
            } 
            else {
                notFollowedCallback();
            }
        })
    }
}

const userManager = new UsersManager();
export {userManager};