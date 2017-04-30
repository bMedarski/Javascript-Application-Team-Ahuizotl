import {Connection} from 'javascript/connector.js';
import {Template} from 'javascript/template.js';
import {Date} from 'javascript/date.js';
import {Data} from 'javascript/competitionData.js';

var app = Sammy('#main', function(){
    this.get('#/', function () {
        const connection = new Connection();
        const template = new Template();
        const url = `http://api.football-data.org/v1/fixtures/?timeFrame=n30`;
        let fixtures;
        connection.get(url)
            .then(function (res) {
                fixtures = res.fixtures;
                Date.formatArray(fixtures);
                Data.formatCompetitionID(fixtures);
                //console.log(fixtures);
                return template.get('home');
            })
            .then(function(html){
                fixtures = {fixtures:fixtures};
                let template = Handlebars.compile(html);
                $('#main').html(template(fixtures));
            })
    });
    //this.get('#/competitionTeams/:id', function () {
    //    let id = this.params['id'];
    //    //console.log(id);
    //    const connection = new Connection();
    //    const template = new Template();
    //    const url = `http://api.football-data.org/v1/competitions/${id}/teams`;
    //    let teams;
    //
    //    connection.get(url)
    //        .then(function (res) {
    //            //teams = res.teams;
    //            console.log(res);
    //            return template.get('teams');
    //        })
    //        .then(function(html){
    //
    //            teams = {teams:teams};
    //            //console.log(teams);
    //            let template = Handlebars.compile(html);
    //
    //            $('#main').html(template(teams));
    //        })
    //});
    this.get(`#/teamPage/:id`, function () {
        let id = this.params['id'];
        const connection = new Connection();
        const template = new Template();
        const url = `http://api.football-data.org/v1/teams/${id}/fixtures`;
        const teamUrl = `http://api.football-data.org/v1/teams/${id}`;
        let team;
        let name= '';
        let img = '';
        connection.get(teamUrl)
            .then(function (res) {
                //console.log(res);
                name = res.name;
                img = res.crestUrl;
            });
        connection.get(url)
            .then(function (res) {
                team = res;
                team.id = id;
                team.name = name;
                team.img = img;
                //console.log(team);
                //team.name = res.fixtures[0].homeTeamName;

                Date.formatArray(team.fixtures);
                Data.formatCompetitionID(team.fixtures);
                return template.get('teamPage');
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
        const connection = new Connection();
        const template = new Template();
        const url = `http://api.football-data.org/v1/teams/${id}/players`;
        const teamUrl = `http://api.football-data.org/v1/teams/${id}`;
        let team;
        let name= '';
        let img = '';
        connection.get(teamUrl)
            .then(function (res) {
                //console.log(res);
                name = res.name;
                img = res.crestUrl;
            });
        connection.get(url)
            .then(function (res) {
                team = res;
                team.id = id;
                team.name = name;
                team.img = img;
               //console.log(team);
                Date.formatPlayersDate(team.players);
                return template.get('playersPage');
            })
            .then(function(html){
                //team = {team:team};
                //console.log(team);
                let template = Handlebars.compile(html);
                $('#main').html(template(team));
            })
    });
    //this.get('#/fixtures/:id', function () {
    //    let id = this.params['id'];
    //    const connection = new Connection();
    //    const template = new Template();
    //    const url = `http://api.football-data.org/v1/competitions/${id}/fixtures?matchday=20`;
    //    let fixtures;
    //    connection.get(url)
    //        .then(function (res) {
    //            fixtures = res.fixtures;
    //            Date.formatArray(fixtures);
    //            return template.get('fixture');
    //        })
    //        .then(function(html){
    //
    //            fixtures = {fixtures:fixtures};
    //            let template = Handlebars.compile(html);
    //
    //            $('#main').html(template(fixtures));
    //        })
    //});
    this.get('#/competitionTable/:id', function () {
        let id = this.params['id'];
        const connection = new Connection();
        const template = new Template();
        const url = `http://api.football-data.org/v1/competitions/${id}/leagueTable`;
        let table,
            teamId;

        connection.get(url)
            .then(function (res) {
                table = res;
                table.id = id;
                //console.log(table);
                Data.formatTeamID(table.standing);

                return template.get('table');
            })
            .then(function(html){
                let template = Handlebars.compile(html);
                $('#main').html(template(table));
            })
    });
    this.get('#/competition/:id', function () {
        let id = this.params['id'];
        const connection = new Connection();
        const template = new Template();
        let url = `http://api.football-data.org/v1/competitions/${id}/fixtures`;
        let urlCompetition = `http://api.football-data.org/v1/competitions/${id}`;
        let competitions;
        let name= '';
        connection.get(urlCompetition)
            .then(function (res) {
                //console.log(res);
                name = res.caption;
            });
        connection.get(url)
            .then(function (res) {

                competitions = res;
                competitions.name = name;
                competitions.id = id;
                Date.formatArray(competitions.fixtures);
                Data.formatCompetitionID(competitions.fixtures);
                //console.log(competitions)
                return template.get(`competitions`);
            })
            .then(function(html){

                //competitions = {fixtures:competitions};
                //console.log(competitions);
                let template = Handlebars.compile(html);

                $('#main').html(template(competitions));
            })
    });
});
$(function () {
    app.run('#/');
});
