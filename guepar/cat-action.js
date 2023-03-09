function CatAction_Initialize() {
    var arr_link = document.querySelectorAll('[data-cat-action]');
    for(var i = 0;i < arr_link.length;i++) {
        CatAction_Binder(arr_link[i]);
    }
}

function CatAction_Binder(trigger) {
    trigger.addEventListener('click', CatAction_Worker);
}

function CatAction_Worker(e) {
    e.preventDefault();
    var CatAction_xhr = new XMLHttpRequest();
    var trigger = e.target;
    var trigger_link;

    var url = null;
    var params = null;

    if(trigger.nodeName === 'A') {
        var url = trigger.getAttribute('href');
        var params = trigger.getAttribute('data-cat-action');
        trigger_link 
    }
    else {
        var url = trigger.parentNode.getAttribute('href');
        var params = trigger.parentNode.getAttribute('data-cat-action');
    }



    var params = JSON.parse(params);

    if(params.reload === true) {
        window.setTimeout(function() {
            location.reload();
        }, 200);
    }

    console.log(url);

    CatAction_xhr.open('POST', url, true);
    CatAction_xhr.send();
}