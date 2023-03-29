const PaonSelect_Initialize = () => {
	let arr_paon_select = document.querySelectorAll('[data-paon-select]');
	for(let i = 0;i < arr_paon_select.length; i++) {
		PaonSelect_Worker(arr_paon_select[i]);

        let paon_value = arr_paon_select[i].querySelector('[data-paon-value]');
        let paon_selected = arr_paon_select[i].querySelector('ul li.paon--selected');
        let paon_selected_value = paon_selected.innerHTML;

        paon_value.innerHTML = paon_selected_value;
	}
}

const PaonSelect_Worker = (item) => {
    let paon_view = item.querySelector('[data-paon-view]');
    let arr_paon_options = item.querySelectorAll('li.paon--option');
    let paon_list = item.querySelector('ul');

    paon_list.addEventListener('mouseleave', (e) => {
        let block = e.target;
        
        block.parentNode.classList.remove('paon--list-active');
        block.parentNode.classList.add('paon--list-inactive');
    });

	paon_view.addEventListener('click', (e) => {
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

    for(let i = 0;i < arr_paon_options.length; i++) {
        if(!arr_paon_options[i].classList.contains('paon--selected')) {
            arr_paon_options[i].addEventListener('click', (e) => {
                let list = e.srcElement.offsetParent.offsetParent;
                let view = list.parentNode.querySelector('[data-paon-value]');
                let selected = list.querySelector('li.paon--selected');
                let option = '';
                
                if(e.target.tagName != 'LI') {
                    option = e.target.parentNode;
                }
                else { option = e.target; }

                let value = option.innerHTML;

                selected.classList.remove('paon--selected');
                option.classList.add('paon--selected');
                view.innerHTML = value;

                PaonFunctionBridge(e);
            });
        }
    }
}
