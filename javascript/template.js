const Template = (function () {
    class Template {
        constructor() {
        }
        get(name) {
            if (window.sessionStorage[name]) {
                return new Promise((resolve, reject) => {
                    var cacheTemplate = window.sessionStorage[name];
                    resolve(cacheTemplate);

                })

            } else {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: `templates/${name}.handlebars`,
                        method: 'GET',
                        success:function(html){
                            resolve(html);
                        }
                    })
                })
                    //.then((html) => {
                    //    window.sessionStorage[name] = html;
                    //    return html;
                    //})
            }
        }
    }
    return Template;
} ());

export {Template};