import {Connection} from 'javascript/connector.js';
import {Template} from 'javascript/template.js';

let app = Sammy('#main', function(){
    this.get('#/', function () {
        $('#main').html('Homepage');
    });

    this.get('#/teams/:398', function () {
        const connection = new Connection();
        const template = new Template();
        const url = 'http://api.football-data.org/v1/competitions/398/teams';
        let teams;
        connection.get(url)
            .then(function (res) {
                teams = res.teams;

                return template.get('teams');
            })
            .then(function(html){

                teams = {teams:teams};
                console.log(teams);
                let template = Handlebars.compile(html);

                $('#main').html(template(teams));
            })
    });
    this.get('#/competitions-2015', function () {
        const connection = new Connection();
        const template = new Template();
        let url = 'http://api.football-data.org/v1/competitions/?season=2015';
        let competitions;
        connection.get(url)
            .then(function (res) {

                competitions = res;

                return template.get('competitions');
            })
            .then(function(html){

                competitions = {competitions:competitions};
                console.log(competitions);
                let template = Handlebars.compile(html);

                $('#main').html(template(competitions));
            })
    });
    this.get('#/competitions-2016', function () {
        const connection = new Connection();
        const template = new Template();
        let url = 'http://api.football-data.org/v1/competitions/?season=2016';
        let competitions;
        connection.get(url)
            .then(function (res) {

                competitions = res;

                return template.get('competitions');
            })
            .then(function(html){

                competitions = {competitions:competitions};
                console.log(competitions);
                let template = Handlebars.compile(html);

                $('#main').html(template(competitions));
            })
    });
    this.get('', function () {
        $('#main').html('Homepage');
    });
});
$(function () {
    app.run('#/');
});
