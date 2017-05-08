SystemJS.config({
    transpiler: 'plugin-babel',

    map: {
        'plugin-babel': './libs/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './libs/systemjs-plugin-babel/systemjs-babel-browser.js',
        // libs
        //'sammy': './bower_components/sammy/lib/sammy.js',
        //'bootstrap': './bower_components/bootstrap/dist/js/bootstrap.js',
        //'jquery': './bower_components/jquery/dist/jquery.js',
        //'handlebars': './bower_components/handlebars/handlebars.js',
        //'toastr': './bower_components/toastr/toastr.js',
        //'moment':'./bower_components/moment/moment.js',
        // scripts
        'app': './scripts/app.js',
        'data': './scripts/data.js',
        'date': './scripts/date.js',
        'validator': './scripts/validator.js',
        'connector': './scripts/connector.js',
        'info': './scripts/info.js',
        'template': './scripts/template.js',
        'user-manager': './scripts/users-manager.js'
    }
});

System.import('app');