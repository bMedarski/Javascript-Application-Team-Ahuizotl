const Validator =  {
    isNullOrUndefined: function(parameter) {
        if (parameter === null || parameter === undefined) {
            return true;
        }
        else {
            return false;
        }
    },

    isString: function(parameter) {
        if (typeof (parameter) == 'string') { 
            return true;
        }
        else {
            return false;
        }
    },

    stringLengthIsInRange: function(string, minLength, maxLength) {
        if (string.length >= minLength && string.length <= maxLength) {
            return true;
        }
        else {
            return false;
        }
    },
    
    containsOnlyLettersAndDigits: function(string) {
        if (/^[a-zA-Z0-9]+$/g.test(string)) {
            return true;
        }
        else {
            return false;
        }
    },

    isInstanceOf: function(childInstance, parentClass) {
        if (childInstance instanceof parentClass) {
            return true;
        }
        else {
            return false;
        }
    },

    isValidUsername: function(username) {
        try{
            if(!Validator.isNullOrUndefined(username) &&
                    Validator.isString(username) &&
                    Validator.stringLengthIsInRange(username, 4, 20) &&
                    Validator.containsOnlyLettersAndDigits(username)) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
    },

    isValidPassword: function(password) {
        try{
            if((!Validator.isNullOrUndefined(password)) &&
                    Validator.isString(password) &&
                    Validator.stringLengthIsInRange(password, 6, 30) &&
                    Validator.containsOnlyLettersAndDigits(password)) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
    },

    stringsMatch: function(string1, string2) {
        try{
            if(string1 === string2) {
                return true;
            }
            else {
                return false;
            }
        }
        catch(e) {
            return false;
        }
    }
} 