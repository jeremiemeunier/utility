function MorsseAction_Initialize() {
    var arr_actionner = document.querySelectorAll('[data-morsse-action]');
    for(var i = 0;i < arr_actionner.length;i++) {
        arr_actionner[i].addEventListener('click', MorsseAction_Worker);
    }

    var arr_form = document.querySelectorAll('form[data-morsse-action-form]');
    for(var i = 0;i < arr_form.length;i++) {
        arr_form[i].addEventListener('submit', function(e) {
            e.preventDefault();
        })
    }
}

function MorsseAction_Worker(e) {
    e.preventDefault();

    var arr_form = document.querySelectorAll('form[data-morsse-action-form]');

    for(var i = 0;i < arr_form.length;i++) {
        let actionForm_xhr = new XMLHttpRequest();
        let actionUrl = arr_form[i].getAttribute('action');
        let actionForm_formData = new FormData(arr_form[i]);

        actionForm_xhr.open('POST', actionUrl, true);
        actionForm_xhr.send(actionForm_formData);

        actionForm_xhr.onreadystatechange = function() {
            if(actionForm_xhr.readyState === 4 && actionForm_xhr.status === 200) {
                window.setTimeout(function() {
                    location.reload();
                }, 200);
            }
        };
    }
}