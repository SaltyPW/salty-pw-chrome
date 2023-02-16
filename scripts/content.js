chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
	if (!sender.tab && request.event == 'populate')	{
	    const password = request.password;
	    document.querySelectorAll('input[type=password]').forEach(input =>
		{
		    input.focus({focusVisible:true});	    

		    // This is instead of input.value = password in case setter is overloaded such as when using React  
		    const prototype = Object.getPrototypeOf(input);
		    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
		    prototypeValueSetter.call(input, password);

		    input.dispatchEvent(new Event('input', { bubbles: true }));
		    input.dispatchEvent(new Event('keyup', { bubbles: true }));
		    input.dispatchEvent(new Event('change', { bubbles: true }));
		    
		    
		});
	}
    }
);
