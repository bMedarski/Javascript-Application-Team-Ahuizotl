import {Connection} from 'javascript/connector.js'
import {Template} from 'javascript/template.js';

let app = Sammy('#main', function(){
    this.get('#/', function () {

    });

    this.get('#/teams', function () {
        const connection = new Connection();
        const template = new Template();
        var teams;
        connection.get()
            .then(function (res) {
                teams = res.teams;

                return template.get('teams');
            })
            .then(function(html){

                teams = {teams:teams};

                var template = Handlebars.compile(html);

                $('#main').html(template(teams));
            })
    });
    this.get('', function () {

    });
});
$(function () {
    app.run('#/');
});
