class LoginForm  {
    constructor(parent) {
        const self = this;
        this.fragment = document.createDocumentFragment();
        this.form = document.createElement('div');
        this.form.width = '250px';

        this.loginLabel = document.createElement('label');
        this.loginLabel.innerText = 'Login:';
        this.loginLabel.style.display = 'block';
        this.form.appendChild(this.loginLabel);

        this.usernameField = document.createElement('input');
        this.usernameField.type = 'text';
        this.usernameField.style.display = 'block';
        //usernameField.size = '40';
        this.usernameField.placeholder="Username";
        this.form.appendChild(this.usernameField);

        this.passwordField = document.createElement('input');
        this.passwordField.type = 'password';
        this.passwordField.style.display = 'block';
        //passwordField.size = '40';
        this.passwordField.placeholder="******";
        this.form.appendChild(this.passwordField);

        this.loginButton = document.createElement('button');
        this.loginButton.style.display = 'block';
        this.loginButton.innerText = 'Login';
        this.loginButton.addEventListener('click', function(){
            UsersManager.login(
                    self.usernameField.value,
                    self.passwordField.value, 
                    self.hideFailedLoginLabel, 
                    self.showFailedLoginLabel);
        });
        this.form.appendChild(this.loginButton);

        this.failedLoginLabel = document.createElement('label');
        this.failedLoginLabel.style.display = 'none';
        this.failedLoginLabel.innerText = 'Invalid username or password.';
        this.failedLoginLabel.style.visibility = "false";
        this.failedLoginLabel.style.color = 'red';

        this.showFailedLoginLabel = function() {
        self.failedLoginLabel.style.display = 'block';
        self.failedLoginLabel.style.visibility = "true";
        };

        this.hideFailedLoginLabel = function() {
        self.failedLoginLabel.style.display = 'none';
        self.failedLoginLabel.style.visibility = "true";
        };
        this.form.appendChild(this.failedLoginLabel);

        // Debug button
        // this.check = document.createElement('button');
        // this.check.innerText = 'check';
        // this.check.addEventListener('click', function(e){
        // console.log(Kinvey.User.getActiveUser().toSource());
        // });
        // this.form.appendChild(this.check);
        //--------------
                
        this.fragment.appendChild(this.form);
        parent.appendChild(this.fragment);
    };

    hide() {
        this.form.style.display = 'none';
        console.log(usernameField.value);
    };
    
    show() {
        this.form.style.display = 'block';
    }
} 

class RegisterForm  {
    constructor(parent) {
        const self = this;
        this.fragment = document.createDocumentFragment();
        this.form = document.createElement('div');
        this.form.width = '250px';

        this.registerLabel = document.createElement('label');
        this.registerLabel.innerText = 'Register:';
        this.registerLabel.style.display = 'block';
        this.form.appendChild(this.registerLabel);

        this.usernameField = document.createElement('input');
        this.usernameField.type = 'text';
        this.usernameField.style.display = 'block';
        //usernameField.size = '40';
        this.usernameField.placeholder="Username";
        this.form.appendChild(this.usernameField);

        this.passwordField = document.createElement('input');
        this.passwordField.type = 'password';
        this.passwordField.style.display = 'block';
        //passwordField.size = '40';
        this.passwordField.placeholder="******";
        this.form.appendChild(this.passwordField);

        this.registerButton = document.createElement('button');
        this.registerButton.style.display = 'block';
        this.registerButton.innerText = 'Register';
        this.registerButton.addEventListener('click', function(e){
            UsersManager.register(
                    self.usernameField.value, 
                    self.passwordField.value, 
                    self.hideFailedRegisterLabel, 
                    self.showFailedRegisterLabel);
        });
        this.form.appendChild(this.registerButton);

        this.failedRegisterLabel = document.createElement('label');
        this.failedRegisterLabel.style.display = 'none';
        this.failedRegisterLabel.innerText = 'Username is invalid or already in use.';
        this.failedRegisterLabel.style.visibility = "false";
        this.failedRegisterLabel.style.color = 'red';

        this.showFailedRegisterLabel = function() {
        self.failedRegisterLabel.style.display = 'block';
        self.failedRegisterLabel.style.visibility = "true";
        };

        this.hideFailedRegisterLabel = function() {
        self.failedRegisterLabel.style.display = 'none';
        self.failedRegisterLabel.style.visibility = "true";
        };
        this.form.appendChild(this.failedRegisterLabel);

        // Debug button
        // this.check = document.createElement('button');
        // this.check.innerText = 'check';
        // this.check.addEventListener('click', function(e){
        // console.log(Kinvey.User.getActiveUser().toSource());
        // });
        // this.form.appendChild(this.check);
        //--------------
                
        this.fragment.appendChild(this.form);
        parent.appendChild(this.fragment);
    };

    hide() {
        this.form.style.display = 'none';
    };
    
    show() {
        this.form.style.display = 'block';
    }
} 