function GueparForm_Initialize() {
    var arr_forms = document.querySelectorAll('[data-guepar-form]');
    for(var i = 0;i < arr_forms.length;i++) {
        GueparForm_Binder(arr_forms[i]);
    }
}

function GueparForm_Binder(form) {
    var arr_form_trigger = form.querySelectorAll('[data-guepar-trigger]');
    for(var i = 0;i < arr_form_trigger.length;i++) {
        arr_form_trigger[i].addEventListener('change', GueparForm_Worker);
    }
}

function GueparForm_Worker(e) {
    e.preventDefault();
    var GueparForm_xhr = new XMLHttpRequest();

    var trigger = e.target;
    var form_parent = trigger.parentNode;
    var xhr_form = new FormData(form_parent);

    GueparForm_xhr.onreadystatechange = function() {
        form_parent.classList.remove('guepar-form-error');

        if(GueparForm_xhr.readyState === 4) {
            if(GueparForm_xhr.status != 200) {
                form_parent.classList.add('guepar-form-error');
            }
            else {
                form_parent.classList.add('guepar-form-success');

                window.setTimeout(function() {
                    form_parent.classList.remove('guepar-form-success');
                }, 2000);
            }
        }
    }

    GueparForm_xhr.open('POST', form_parent.getAttribute('action'), true);
    GueparForm_xhr.send(xhr_form);
}