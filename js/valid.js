var Validator = {
	
	validate: function(field)
	{
		var type =  '';
		var valid = false;
		var message = '';
		

		var input_val = '';
		if(field.attr('data-mask') != undefined)
			input_val =  field.inputmask('unmaskedvalue');
		else
			input_val = field.val();
		
		if(field.attr('data-valid') != undefined)
			type = field.attr('data-valid');

		if(field.attr('data-mask') != undefined)
		{
			if(field.inputmask("isComplete"))
				valid = true;
			else
			{
				valid = false;
				message = 'Заповніть коректно поле';
				if(field.prop('disabled') == true)
					valid = true;
			}
		}
		else
		{
			switch (type)
			{
				case 'name':
				var patt = new RegExp("^[А-Яа-яЁёЇїІіЄєҐґ']+$");
								valid = patt.test(input_val);
				console.log(valid);
				break;
				case 'email':
				var patt = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g);
				valid = patt.test(input_val);
				message = 'Введіть корректний e-mail';
				break;
				case 'phone':
				var patt = new RegExp(/[0-9]{1}\d{2}[0-9]{1}\d{2}[0-9]{1}\d{1}[0-9]{1}\d{1}/g);
				valid = patt.test(input_val);
				message = 'Введіть корректний номер';
				break;
				case 'birthdate':
				var patt = new RegExp(/[0-9]{1}\d{1}\.[0-9]{1}\d{1}\.[0-9]{1}\d{3}/g);
				valid = patt.test(input_val);
				break;
				case 'requiered':
				if(field.prop('disabled') == true)
					valid = true;
				else
				{	
					message = 'Необхідно заповнити';
					if(field[0].tagName == 'SELECT'){
						if(field.hasClass('select2-hidden-accessible')){
							if(parseInt(field.select2("val"))){
								valid = true;
							}
						}else{
							if(field.find('option:selected').length && field.find('option:selected').val() !== '')
								valid = true;
							if(field.find('option:selected').length && field.find('option:selected').val() == 0)
								valid = false;
						}
						
					}else if(field.attr('type') =='radio' || field.attr('type') == 'checkbox'){
						if(field.parents('form').find('[name="' + field.attr('name') + '"]:checked').length){
							valid = true;
						}
						
						message = 'Виберіть один з варіантів';
					}
					else{
						var patt = new RegExp(/^(?!\s*$).+/g);
						valid = patt.test(input_val);
						
					}
					
				}
				break;
				case "mask":
				if(!field.data("mask"))
					valid = true;
				else
				{
					var patt = new RegExp("/"+ field.data("mask") +"/g");
					valid = patt.test(input_val);
					message = 'Введіть корректний номер';
				}
				break;
				default :
				valid = true;
				break;
			}
		}
		
		if(field.attr('data-inn') != undefined){
			
			var check = field.val().substr(8,1);
			if(check != '_' && parseInt(check)%2 != field.attr('data-inn')){
				if(field.attr('data-inn') == 1){
					message = 'Введіть  ІНН нареченого';
				}else{
					message = 'Введіть  ІНН нареченої';

				}
				valid = false;
			}
		}
		if(valid == true && field.attr('data-lang') == 'ua'){
			var patt = new RegExp("^[А-Яа-яЁёЇїІіЄєҐґ']+$");
			valid = patt.test(input_val);
			message = 'Необхідно заповнити українською мовою';
		}
		
		if(field.parents('[data-validation="false"]').length > 0){
			valid = true;
		}
		
		if(field.attr('data-min') != undefined && field.val().length < field.attr('data-min')){
			valid = false;
			message = "Поле не може бути меньшим ніж 8 символів";
		}
		
		if(field.attr('data-max') != undefined && field.val().length > field.attr('data-max')){
			valid = false;
			message = "Поле не може бути більшим ніж 10 символів";
		}
		
		
		//valid = true;
		if (valid){
			if(field.attr('type') =='radio'){
				field.parents('form').find('[name="' + field.attr('name') + '"]').each(function() {
					$( this ).removeClass('error-input');
					$( this ).parent().find('valid-messages').remove();
				});
			}else{
				field.removeClass('error-input');
				field.parent().find('valid-messages').remove();
			}
			
		} else {
			field.removeClass('valid-messages');
			field.addClass('error-input');
			if(field.parent().find('.valid-messages').length > 0){
				field.parent().find('.valid-messages').html(message);
			}else{
				// field.parent().append('<div class="valid-messages">' + message + '</div>');
			}
		}

	}
}
