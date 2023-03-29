function CatAction_Initialize() {
    let arr_link = document.querySelectorAll('[data-cat-action]');
    for(let i = 0;i < arr_link.length;i++) {
        CatAction_Binder(arr_link[i]);
    }
}

function CatAction_Binder(trigger) {
    trigger.addEventListener('click', CatAction_Worker);
}

function CatAction_Worker(e) {
    e.preventDefault();
    let CatAction_xhr = new XMLHttpRequest();
    let trigger = e.target;
    let trigger_link;

    let url = null;
    let params = null;

    if(trigger.nodeName === 'A') {
        url = trigger.getAttribute('href');
        params = trigger.getAttribute('data-cat-action');
    }
    else {
        url = trigger.parentNode.getAttribute('href');
        params = trigger.parentNode.getAttribute('data-cat-action');
    }



    params = JSON.parse(params);

    if(params.reload === true) {
        window.setTimeout(() => {
            location.reload();
        }, 200);
    }

    console.log(url);

    CatAction_xhr.open('POST', url, true);
    CatAction_xhr.send();
}