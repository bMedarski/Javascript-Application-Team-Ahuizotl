const Template = (function () {
    class Template {
        constructor() {
        }
        get(name) {
            if (window.sessionStorage[name]) {
                return new Promise((resolve, reject) => {
                    let cacheTemplate = window.sessionStorage[name];
                    resolve(cacheTemplate);
                })
            } else {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: `templates/${name}`,
                        method: 'GET',
                        success:function(html){
                            window.sessionStorage[name] = html;
                            resolve(html);
                        }
                    })
                })
            }
        }
    }
    return Template;
} ());

export {Template};