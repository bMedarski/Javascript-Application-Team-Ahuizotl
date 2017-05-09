import {connect} from 'connector';
import {templateLoader} from 'template';
import {dateParser} from 'date';
import {dataParser} from 'data';
import {userManager} from 'user-manager';

var app = Sammy('#main', function(){
    this.get('#/', function () {
        const url = `http://api.football-data.org/v1/fixtures/?timeFrame=n30`;
        let fixtures;
        connect.get(url)
            .then(function (res) {
                fixtures = res.fixtures;
                dateParser.formatArray(fixtures);
                dataParser.formatCompetitionID(fixtures);
                return templateLoader.get('home');
            })
            .then(function(html){
                fixtures = {fixtures:fixtures};
                let template = Handlebars.compile(html);
                $('#main').html(template(fixtures));
            })
    });
    this.get(`#/teamPage/:id`, function () {
        let id = this.params['id'];
        const url = `http://api.football-data.org/v1/teams/${id}/fixtures`;
        const teamUrl = `http://api.football-data.org/v1/teams/${id}`;
        let team;
        let name= '';
        let img = '';
        connect.get(teamUrl)
            .then(function (res) {
                //console.log(res);
                name = res.name;
                img = res.crestUrl;
                //console.log(localStorage.getItem('username'))
            });
        connect.get(url)
            .then(function (res) {
                team = res;
                team.id = id;
                team.name = name;
                team.img = img;
                //console.log(team);
                dateParser.formatArray(team.fixtures);
                dataParser.formatCompetitionID(team.fixtures);
                return templateLoader.get('teamPage');
            })
            .then(function(html){
                team = {team:team};
                //console.log(team);
                let template = Handlebars.compile(html);
                $('#main').html(template(team));
            })
    });
    this.get(`#/teamPlayers/:id`, function () {
        let id = this.params['id'];
        const url = `http://api.football-data.org/v1/teams/${id}/players`;
        const teamUrl = `http://api.football-data.org/v1/teams/${id}`;
        let team;
        let name= '';
        let img = '';
        connect.get(teamUrl)
            .then(function (res) {
                //console.log(res);
                name = res.name;
                img = res.crestUrl;
            });
        connect.get(url)
            .then(function (res) {
                team = res;
                team.id = id;
                team.name = name;
                team.img = img;
                //console.log(team);
                dateParser.formatPlayersDate(team.players);
                return templateLoader.get('playersPage');
            })
            .then(function(html){
                //team = {team:team};
                //console.log(team);
                let template = Handlebars.compile(html);
                $('#main').html(template(team));
            })
    });
    this.get('#/fixture/:id', function () {
        let id = this.params['id'];
        const url = `http://api.football-data.org/v1/fixtures/${id}`;
        let fixture;
        connect.get(url)
            .then(function (res) {
                //console.log(res);
                fixture = res;
                dateParser.formatFixtureDate(fixture.fixture);
                dataParser.formatFixtureID(fixture);
                dateParser.formatArray(fixture.head2head.fixtures);
                dataParser.formatCompetitionID(fixture.head2head.fixtures);
                return templateLoader.get('fixture');
            })
            .then(function(html){
                let template = Handlebars.compile(html);
                $('#main').html(template(fixture));
            })
    });
    this.get('#/competitionTable/:id', function () {
        let id = this.params['id'];
        const url = `http://api.football-data.org/v1/competitions/${id}/leagueTable`;
        let table,
            teamId;

        connect.get(url)
            .then(function (res) {
                table = res;
                table.id = id;
                dataParser.formatTeamID(table.standing);

                return templateLoader.get('tableCompetition');
            })
            .then(function(html){
                let template = Handlebars.compile(html);
                $('#main').html(template(table));
            })
    });
    this.get('#/competition/:id', function () {
        let id = this.params['id'];
        let url = `http://api.football-data.org/v1/competitions/${id}/fixtures`;
        let urlCompetition = `http://api.football-data.org/v1/competitions/${id}`;
        let competitions;
        let name= '';
        connect.get(urlCompetition)
            .then(function (res) {

                name = res.caption;
            });
        connect.get(url)
            .then(function (res) {
                //console.log(res);
                competitions = res;
                competitions.name = name;
                competitions.id = id;
                dateParser.formatArray(competitions.fixtures);
                dataParser.formatCompetitionID(competitions.fixtures);
                //console.log(competitions)
                return templateLoader.get(`competitions`);
            })
            .then(function(html){

                //competitions = {fixtures:competitions};
                //console.log(competitions);
                let template = Handlebars.compile(html);

                $('#main').html(template(competitions));
            })
    });
    this.get('#/register', function () {
        templateLoader.get(`register`)
            .then(function(html){
                let template = Handlebars.compile(html);

                $('#main').html(template());
            })
    });
    this.get('#/login', function() {
        templateLoader.get(`login`)
            .then(function(html){
                let template = Handlebars.compile(html);

                $('#main').html(template());
            })
    });
    this.post('#/register', function () {
        let username = this.params.username;
        let password = this.params.password;
        let repeatPassword = this.params.repeatPassword;
        userManager.register(
            username,
            password,
            repeatPassword,
            function() {
                $('#login').addClass('hidden');
                $('#register').addClass('hidden');
                $('#logout').removeClass('hidden');
                $('#user').removeClass('hidden');
                $('#userInfo').html(username);
                window.location = '#/';
            },
            function () {
                console.log('wrong reg');
            }
        );
    });
    this.post('#/login', function() {
        let username = this.params.username;
        let password = this.params.password;

        userManager.login(
            username,
            password,
            function(){
                $('#login').addClass('hidden');
                $('#register').addClass('hidden');
                $('#logout').removeClass('hidden');
                $('#user').removeClass('hidden');
                $('#userInfo').html(username);
                window.location = '#/';
            },
            function (){
                console.log('wrong log');
            });
    });
    this.get('#/logout', function() {

        userManager.logout(

            function(){
                $('#login').removeClass('hidden');
                $('#register').removeClass('hidden');
                $('#logout').addClass('hidden');
                $('#user').addClass('hidden');
                $('#userInfo').html();
                //window.location = '#/';
            })
    });
    this.get('#/username', function() {
            let teamsArray;
            let htmlTemp;
            let promise = new Promise(function(resolve, reject){
                userManager.getFollowedTeams(function(teams){
                    teamsArray = {teams:teams};
                    htmlTemp = templateLoader.get('teams');
                    console.log(teamsArray);
                    resolve(htmlTemp);
                });
                return promise;
        }).then(function(html){
                let template = Handlebars.compile(html);
                $('#main').html(template(teamsArray));
            })
    });
    this.get('#/follow/', function(context) {
        let team = {
            id:context.params.id,
            name:context.params.name
        };
        userManager.followTeam(team);
    });
    this.get('#/unfollow/:id', function() {
        let id = this.params['id'];
        console.log({id:id});
        userManager.unfollowTeam({id:id});
        window.location = '#/username';
    })
});
$(function () {
    app.run('#/');
});
