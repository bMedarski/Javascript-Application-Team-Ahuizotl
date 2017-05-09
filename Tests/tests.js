import {userManager} from '../scripts/users-manager/'
describe('User Tests', () => {
    it('Test 1', () => {
        expect(2+2).to.equal(4);
    });
    describe('RestrationValidationTests',() => {
        it('RegistrationValidationUsernameNullUnidentified',()=>{
            function testFunc(){
                userManager.register(null, 'testpass1','testpass1',function someFunc(){},function someFunc2(){})
            }
            expect(testFunc()).to.throw();

        });
        it('RegistrationValidationUsernameOutOfRangeMin',()=>{
            function testFunc(){
                userManager.register('tes', 'testpass1','testpass1',function someFunc(){},function someFunc2(){})
            }
            expect(testFunc()).to.throw();

        });
        it('RegistrationValidationUsernameOutOfRangeMax',()=>{
            function testFunc(){
                userManager.register('thisusernameisdefinatelymorethanitshouldbe', 'testpass1','testpass1',function someFunc(){},function someFunc2(){})
            }
            expect(testFunc()).to.throw();

        });
        it('RegistrationValidationUsernameIllegalCharacters',()=>{
            function testFunc(){
                userManager.register('%$@#$%', 'testpass1','testpass1',function someFunc(){},function someFunc2(){})
            }
            expect(testFunc()).to.throw();

        });
        it('RegistrationValidationPasswordNullUnidentified',()=>{
            function testFunc(){
                userManager.register('ValidName', null,null,function someFunc(){},function someFunc2(){})
            }
            expect(testFunc()).to.throw();

        });
        it('RegistrationValidationPasswordIsInRangeMin',()=>{
            function testFunc(){
                userManager.register('ValidName', '12','12',function someFunc(){},function someFunc2(){})
            }
            expect(testFunc()).to.throw();

        });
        it('RegistrationValidationPasswordIsInRangeMax',()=>{
            function testFunc(){
                userManager.register('ValidName', 'ThisPasswordIsDefinatelyLongerThanItShouldBe','ThisPasswordIsDefinatelyLongerThanItShouldBe',function someFunc(){},function someFunc2(){})
            }
            expect(testFunc()).to.throw();

        });
        it('RegistrationValidationPasswordNoMatch',()=>{
            function testFunc(){
                userManager.register('ValidName', 'goshopesho','peshogosho',function someFunc(){},function someFunc2(){})
            }
            expect(testFunc()).to.throw();

        });
    });
});