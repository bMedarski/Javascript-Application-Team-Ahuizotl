export class Date {
        constructor() {
        }
        static formatArray(arrayDates) {
            //console.log(arrayDates);
            arrayDates.forEach(function(date){
                date.date =  moment(date.date).format('DD MMM YYYY');
            });
            //console.log(arrayDates);
            return arrayDates;
        }
        static formatPlayersDate(arrayDates){
            arrayDates.forEach(function(date){
                date.contractUntil =  moment(date.contractUntil).format('DD MMM YYYY');
                date.dateOfBirth =  moment(date.dateOfBirth).format('DD MMM YYYY');
            });
            return arrayDates;
        }

}
