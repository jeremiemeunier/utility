function MorsseForm_Initialize(api_key = '') {
    var arr_forms = document.querySelectorAll('[data-morsse-form]');
    var MorsseForm_xhr = new XMLHttpRequest();

    for(var i = 0; i < arr_forms.length; i++) {
        var form = arr_forms[i];
        MorsseForm_Worker(form, api_key, MorsseForm_xhr);
    }
}

function MorsseForm_Worker(form, api_key, MorsseForm_xhr) {
    var form_config = form.getAttribute('data-morsse-form');
        form_config = JSON.parse(form_config);
    var message_dock = form.querySelector('[data-morsse-form-msg]');
    var after_next = form_config.next;
    var action_url = form.getAttribute('action');

    var submit_element = form.querySelector('[data-morsse-submit]');
    var submit_origins = submit_element.innerHTML;
    var submit_load = form_config.loading;
        if(!submit_load) { submit_load = '<span class="load mini">&nbsp;</span>'; }

    var form_restart = false;
    if(form.getAttribute('data-morsse-restart') !== null) { form_restart = true; }

    form.addEventListener('submit', function(e) {
        var xhr_form = new FormData(form);

        e.preventDefault();
        var arr_error_msg = form.querySelectorAll('p.morsse-form-error');
        var arr_error_dock = form.querySelectorAll('[data-morsse-form-reference].morsse-form-error');
        for(var i = 0;i < arr_error_msg.length;i++) {
            var error_msg = arr_error_msg[i];
            var error_parent = error_msg.parentNode;
            error_parent.removeChild(error_msg);
        }
        for(var i = 0;i < arr_error_dock.length;i++) {
            arr_error_dock[i].classList.remove('morsse-form-error');
        }

        MorsseForm_xhr.onreadystatechange = function () {
            submit_element.disabled = true;
            submit_element.classList.add('morsse-form-load');
            submit_element.innerHTML = submit_load;

            message_dock.classList.remove('morsse-form-success', 'morsse-form-error', 'morsse-form-info');
            message_dock.innerHTML = null;

            if(MorsseForm_xhr.readyState === 4) { 
                submit_element.classList.remove('morsse-form-load');
                submit_element.innerHTML = submit_origins;

                var MorsseForm_response = MorsseForm_xhr.response; 
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
                        window.setTimeout(function() {
                            window.location.href = after_next;
                        }, 2000);
                    }
                    else if(form_restart === true) {
                        window.setTimeout(function() {
                            var arr_input = form.querySelectorAll('input, textarea, select');
                            for(var i = 0; i < arr_input.length;i++) {
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
                        var arr_references = MorsseForm_response.references;

                        for(var reference in arr_references) {
                            var reference_dock = form.querySelector('[data-morsse-form-reference="' + reference + '"]');
                                reference_dock.classList.add('morsse-form-error');
                            var reference_text = document.createElement('p');
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