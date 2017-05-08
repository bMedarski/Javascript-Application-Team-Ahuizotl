SystemJS.config({
    transpiler: 'plugin-babel',

    map: {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        // libs
        'sammy': './bower_components/sammy/lib/sammy.js',
        'bootstrap': './bower_components/bootstrap/dist/js/bootstrap.js',
        'jquery': './bower_components/jquery/dist/jquery.js',
        'handlebars': './bower_components/handlebars/handlebars.js',
        'toastr': './bower_components/toastr/toastr.js',
        'moment':'./bower_components/moment/moment.js',
        // scripts
        'app': './scripts/app.js',
        'data': './scripts/data.js',
        'date': './scripts/date.js',
        'validator': './scripts/validator.js',
        'connector': './scripts/connector.js',
        'info': './scripts/info.js',
        'template': './scripts/template.js',
        'user-manager': './scripts/controllers/user-manager.js'
    }
});

System.import('app');