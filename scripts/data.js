import {Competitions} from 'info';
 class Data {
    constructor() {
    }
     static getID(link){
        const regex = /\d+$/g;
        let m = regex.exec(link);
        return m[0];
    }
     formatFixtureID(fixture){
        fixture.homeTeamId = Data.getID(fixture.fixture._links.homeTeam.href);
        fixture.awayTeamId = Data.getID(fixture.fixture._links.awayTeam.href);
        fixture.competitionId = Data.getID(fixture.fixture._links.competition.href);
        //console.log(Competitions);
        fixture.competitionName = Competitions[Data.getID(fixture.fixture._links.competition.href)];
        if(fixture.fixture.result.goalsHomeTeam != null && fixture.fixture.result.goalsAwayTeam != null){
            fixture.displayResult  = true;
        }
    }
     formatTeamID(array){
        array.forEach(function(fixture){
            fixture.teamId = Data.getID(fixture._links.team.href);
        });
    }
     formatCompetitionID(array){
        array.forEach(function(fixture){

            fixture.homeTeamId = Data.getID(fixture._links.homeTeam.href);
            fixture.awayTeamId = Data.getID(fixture._links.awayTeam.href);
            fixture.competitionId = Data.getID(fixture._links.competition.href);
            fixture.gameId = Data.getID(fixture._links.self.href);
            fixture.competitionName = Competitions[Data.getID(fixture._links.competition.href)];
            if(fixture.result.goalsHomeTeam != null && fixture.result.goalsAwayTeam != null){
                fixture.displayResult  = true;
            }
        });
    }
}
const dataParser = new Data();
export {dataParser};
