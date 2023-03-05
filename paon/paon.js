function PaonSelect_Initialize() {
	var arr_paon_select = document.querySelectorAll('[data-paon-select]');
	for(var i = 0;i < arr_paon_select.length; i++) {
		PaonSelect_Worker(arr_paon_select[i]);

        var paon_value = arr_paon_select[i].querySelector('[data-paon-value]');
        var paon_selected = arr_paon_select[i].querySelector('ul li.paon--selected');
        var paon_selected_value = paon_selected.innerHTML;

        paon_value.innerHTML = paon_selected_value;
	}
}

function PaonSelect_Worker(item) {
    var paon_view = item.querySelector('[data-paon-view]');
    var arr_paon_options = item.querySelectorAll('li.paon--option');
    var paon_list = item.querySelector('ul');

    paon_list.addEventListener('mouseleave', function(e) {
        var block = e.target;
        
        block.parentNode.classList.remove('paon--list-active');
        block.parentNode.classList.add('paon--list-inactive');
    });

	paon_view.addEventListener('click', function(e) {
		e.preventDefault();
		
		if(item.classList.contains('paon--list-inactive')) {
			item.classList.remove('paon--list-inactive');
			item.classList.add('paon--list-active');
		}
		else {
			item.classList.remove('paon--list-active');
			item.classList.add('paon--list-inactive');
		}
	});

    for(var i = 0;i < arr_paon_options.length; i++) {
        if(!arr_paon_options[i].classList.contains('paon--selected')) {
            arr_paon_options[i].addEventListener('click', function(e) {
                var list = e.srcElement.offsetParent.offsetParent;
                var view = list.parentNode.querySelector('[data-paon-value]');
                var selected = list.querySelector('li.paon--selected');
                var option = '';
                
                if(e.target.tagName != 'LI') {
                    option = e.target.parentNode;
                }
                else { option = e.target; }

                var value = option.innerHTML;

                selected.classList.remove('paon--selected');
                option.classList.add('paon--selected');
                view.innerHTML = value;

                PaonFunctionBridge(e);
            });
        }
    }
}
