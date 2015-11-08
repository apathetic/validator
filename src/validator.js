/**
 * Form validator
 *
 * @return {object}
 */
function Validator() {

	var failureEvent = new CustomEvent('validation:failure', {'bubbles': true});
	var successEvent = new CustomEvent('validation:success', {'bubbles': true});
	var rules = {
		email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		dob: /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/,			// mm-dd-yyyy
		phone: /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/,
		zip: /^\d{5}$/,
		count: function(val) { return val.length <= 90; }
	};

	return {
		/**
		 * Checks all fields within the given section
		 *
		 * @param  {string} ruleName
		 * @param  {regex} updatedRule
		 * @return {void}
		 */
		updateRule: function(ruleName, updatedRule) {
			rules[ruleName] = updatedRule;
		},

		/**
		 * Checks all fields within the given section
		 *
		 * @param  {HTMLELement} panel    Section of the form to validate
		 * @param  {function} callback
		 * @return {void}
		 */
		check: function(section, successCallback) {
			var fields = section.querySelectorAll('input, select, textarea');
			var pass = true;									// form is valid until we discover otherwise

			Array.prototype.forEach.call(fields, function(field) {
				checkField.call(field);
				field.addEventListener('change', checkField.bind(field));
			});

			if (pass) {
				// section.classList.remove('has-error');
				section.dispatchEvent(successEvent);
				if (successCallback) { successCallback.call(); }
			} else {
				// section.classList.add('has-error');
				section.dispatchEvent(failureEvent);
			}

			return pass;

			/**
			 * Checks that the field contains valid data
			 *
			 * @return {boolean}
			 */
			function checkField() {
				var required = this.getAttribute('required') !== null,
					validate = this.getAttribute('data-validate'),
					valid,
					radios,
					radioName;

				// check if field is even visible, do nothing if not
				if (this.offsetParent === null) {
					return;
				}

				// Check if empty / selected
				if (required) {
					if (this.getAttribute('type') === 'radio') {
						radioName = this.getAttribute('name');
						radios = section.querySelectorAll('input[name="'+radioName+'"]:checked');
						valid = (radios.length < 1) ? false : true;
					} else {
						valid = (this.value.length > 0) ? true : false;
					}
				} else {
					valid = true;
				}

				// check for valid data
				if (validate) {
					if (typeof rules[validate] === 'function') {
						valid = rules[validate](this.value) && valid;
					}
					else if (this.value.match(rules[validate]) === null) {						// we don't check if rules[validate] fails to get the regex we're after
						valid = false;
					}
				}

				if (valid) {
					if (radioName) {
						radios = section.querySelectorAll('input[name="'+radioName+'"]');
						Array.prototype.forEach.call(radios, function(radio) { radio.classList.remove('has-error'); });
					} else {
						this.classList.remove('has-error');			// reset the field
					}
				} else {
					this.classList.add('has-error');
					pass = false;
				}



			}
		}
	};
}
