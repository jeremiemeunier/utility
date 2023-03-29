const GueparForm_Initialize = () => {
    let arr_forms = document.querySelectorAll('[data-guepar-form]');
    for(let i = 0;i < arr_forms.length;i++) {
        GueparForm_Binder(arr_forms[i]);
    }
}

const GueparForm_Binder = (form) => {
    let arr_form_trigger = form.querySelectorAll('[data-guepar-trigger]');
    for(let i = 0;i < arr_form_trigger.length;i++) {
        arr_form_trigger[i].addEventListener('change', GueparForm_Worker);
    }
}

const GueparForm_Worker = (e) => {
    e.preventDefault();
    let GueparForm_xhr = new XMLHttpRequest();

    let trigger = e.target;
    let form_parent = trigger.parentNode;
    let xhr_form = new FormData(form_parent);

    GueparForm_xhr.onreadystatechange = () => {
        form_parent.classList.remove('guepar-form-error');

        if(GueparForm_xhr.readyState === 4) {
            if(GueparForm_xhr.status != 200) {
                form_parent.classList.add('guepar-form-error');
            }
            else {
                form_parent.classList.add('guepar-form-success');

                window.setTimeout(() => {
                    form_parent.classList.remove('guepar-form-success');
                }, 2000);
            }
        }
    }

    GueparForm_xhr.open('POST', form_parent.getAttribute('action'), true);
    GueparForm_xhr.send(xhr_form);
}