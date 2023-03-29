const MorsseForm_Initialize = (api_key = '') => {
    let arr_forms = document.querySelectorAll('[data-morsse-form]');
    let MorsseForm_xhr = new XMLHttpRequest();

    for(let i = 0; i < arr_forms.length; i++) {
        let form = arr_forms[i];
        MorsseForm_Worker(form, api_key, MorsseForm_xhr);
    }
}

const MorsseForm_Worker = (form, api_key, MorsseForm_xhr) => {
    let form_config = form.getAttribute('data-morsse-form');
        form_config = JSON.parse(form_config);
    let message_dock = form.querySelector('[data-morsse-form-msg]');
    let after_next = form_config.next;
    let action_url = form.getAttribute('action');

    let submit_element = form.querySelector('[data-morsse-submit]');
    let submit_origins = submit_element.innerHTML;
    let submit_load = form_config.loading;
        if(!submit_load) { submit_load = '<span class="load mini">&nbsp;</span>'; }

    let form_restart = false;
    if(form.getAttribute('data-morsse-restart') !== null) { form_restart = true; }

    form.addEventListener('submit', (e) => {
        let xhr_form = new FormData(form);

        e.preventDefault();
        let arr_error_msg = form.querySelectorAll('p.morsse-form-error');
        let arr_error_dock = form.querySelectorAll('[data-morsse-form-reference].morsse-form-error');
        for(let i = 0;i < arr_error_msg.length;i++) {
            let error_msg = arr_error_msg[i];
            let error_parent = error_msg.parentNode;
            error_parent.removeChild(error_msg);
        }
        for(let i = 0;i < arr_error_dock.length;i++) {
            arr_error_dock[i].classList.remove('morsse-form-error');
        }

        MorsseForm_xhr.onreadystatechange = () => {
            submit_element.disabled = true;
            submit_element.classList.add('morsse-form-load');
            submit_element.innerHTML = submit_load;

            message_dock.classList.remove('morsse-form-success', 'morsse-form-error', 'morsse-form-info');
            message_dock.innerHTML = null;

            if(MorsseForm_xhr.readyState === 4) { 
                submit_element.classList.remove('morsse-form-load');
                submit_element.innerHTML = submit_origins;

                let MorsseForm_response = MorsseForm_xhr.response; 
                    MorsseForm_response = JSON.parse(MorsseForm_response);
                
                if(MorsseForm_xhr.status !== 200 || MorsseForm_xhr.status === 200 && form_restart === true) {
                    submit_element.disabled = false;
                }

                if(MorsseForm_xhr.status === 200) {
                    if(MorsseForm_response.form_message !== undefined) {
                        message_dock.classList.add(['morsse-form-success']);
                        message_dock.innerHTML = '<p>' + MorsseForm_response.form_message + '</p>';
                    }
                    
                    if(form_restart === false && after_next !== null && after_next !== undefined) {
                        window.setTimeout(() => {
                            window.location.href = after_next;
                        }, 2000);
                    }
                    else if(form_restart === true) {
                        window.setTimeout(() => {
                            let arr_input = form.querySelectorAll('input, textarea, select');
                            for(let i = 0; i < arr_input.length;i++) {
                                arr_input[i].value = null;
                            }
                            message_dock.classList.remove('morsse-form-success', 'morsse-form-error', 'morsse-form-info');
                            message_dock.innerHTML = null;
                        }, 2000);
                    }
                }
                else {
                    if(MorsseForm_response.form_message !== undefined) {
                        message_dock.classList.add(['morsse-form-error']);
                        message_dock.innerHTML = '<p>' + MorsseForm_response.form_message + '</p>';
                    }

                    if(MorsseForm_response.references !== undefined) {
                        let arr_references = MorsseForm_response.references;

                        for(let reference in arr_references) {
                            let reference_dock = form.querySelector('[data-morsse-form-reference="' + reference + '"]');
                                reference_dock.classList.add('morsse-form-error');
                                let reference_text = document.createElement('p');
                                reference_text.classList.add('morsse-form-error', 'morsse-form-dock');
                                reference_text.innerHTML = arr_references[reference].message;
                                reference_dock.appendChild(reference_text);
                        }
                    }
                }
            }
        }

        MorsseForm_xhr.open('POST', action_url, true);
        if(api_key !== null || api_key !== '') { MorsseForm_xhr.setRequestHeader('X-PooksAPI-Key', api_key); }
        MorsseForm_xhr.send(xhr_form);
    });
}