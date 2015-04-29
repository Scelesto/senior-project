/*
Uploads without redirecting the page.
Works on all modern browsers.

Just upload form:
extSubmit(form_element);
extSubmit("form_id");

Upload form and then do something:
extSubmit({form:element_or_id, done:function(){...}});

Wait until finished processing this function to move on:
extSubmit(something,true);
*/
function extSubmit(value, wait) {
    if (typeof(wait) == 'undefined') {
        wait = false;
    }
    var func = function() {
        var upl = function(object) {
            if (object['form'].constructor == String) {
                object['form'] = document.getElementById(object['form']);
            }
            if (!window.FormData) {
                var iframe = document.createElement('iframe'),
                    loaded;
                iframe.style.display = 'none';
                iframe.src = window.location.href.replace(/[^#?]*\//, '');
                document.body.appendChild(iframe);
                loaded = document.getElementsByTagName('iframe')[0];
                loaded.onload = function() {
                    var upload = object['form'],
                        content = loaded.contentDocument,
                        allForms = content.getElementsByTagName('form'),
                        replacement,
                        i = 0;
                    for (; i < allForms.length; ++i) {
                        if (allForms[i].isEqualNode(upload.cloneNode(true))) {
                            replacement = allForms[i];
                            break;
                        }
                    }
                    upload.parentNode.replaceChild(upload.cloneNode(true), upload);
                    replacement.parentNode.replaceChild(upload, replacement);
                    content.getElementsByTagName('form')[i].submit();
                    loaded.onload = object['done'] ? object['done'] : function() {};
                }
            } else {
                var upload = object['form'],
                    ajax = new XMLHttpRequest();
                ajax.open(upload.method ? upload.method : 'post', upload.action ? upload.action : '', true);
                if (object['done']) {
                    ajax.onload = function() {
                        if (ajax.status == 200) {
                            object['done']();
                        }
                    }
                }
                ajax.send(new FormData(upload));
                upload.parentNode.replaceChild(upload.cloneNode(true), upload);
            }
        };
        if (value.constructor == Object) {
            upl(value);
        } else {
            upl({
                form: value
            });
        }
    };
    if (wait) {
        func();
    } else {
        setTimeout(func, 0);
    }
}