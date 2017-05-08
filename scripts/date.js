
class Date {
        constructor() {
        }
        formatArray(arrayDates) {
            arrayDates.forEach(function(date){
                date.date =  moment(date.date).format('DD MMM YYYY');
            });
            return arrayDates;
        }
        formatPlayersDate(arrayDates){
            arrayDates.forEach(function(date){
                date.contractUntil =  moment(date.contractUntil).format('DD MMM YYYY');
                date.dateOfBirth =  moment(date.dateOfBirth).format('DD MMM YYYY');
            });
            return arrayDates;
        }
        formatFixtureDate(fixture){
            fixture.date =  moment(fixture.date).format('DD MMM YYYY');
        }
}
const dateParser = new Date();
export {dateParser}
