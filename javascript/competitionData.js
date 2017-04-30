export class Data {
    constructor() {
    }
    static getID(link){
        let id = link.substring(link.length-2);
        const regex = /\d+$/g;
        let m = regex.exec(link);
        return m[0];
    }
    static formatCompetitionID(array){
        const competitions ={
            424:"European Championships France",
            426:"Premier League",
            427:"Championship",
            428:"League One",
            429:"FA-Cup",
            430:"1. Bundesliga",
            431:"2. Bundesliga",
            432:"DFB-Pokal",
            433:"Eredivisie",
            434:"Ligue 1",
            435:"Ligue 2",
            436:"Primera Division",
            437:"Liga Adelante",
            438:"Serie A",
            439:"Primeira Liga",
            440:"Champions League",
            441:"Serie B",
            442:"English National League",
            443:"League Two"
        };
        array.forEach(function(fixture){

            fixture.homeTeamId = Data.getID(fixture._links.homeTeam.href);
            fixture.awayTeamId = Data.getID(fixture._links.awayTeam.href);
            fixture.competitionId = Data.getID(fixture._links.competition.href);
            fixture.competitionName = competitions[Data.getID(fixture._links.competition.href)];
            if(fixture.result.goalsHomeTeam != null && fixture.result.goalsAwayTeam != null){
                fixture.displayResult  = true;
            }
        });
    }
}
