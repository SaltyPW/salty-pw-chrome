window.addEventListener('load', event =>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	const activeTab = tabs[0];
	const url = new URL(activeTab.url);

	const basePasswordInput = document.getElementById('base-password-input');
	const saltInput = document.getElementById('salt-input');

	function populate(){
	    makePass(basePasswordInput.value,
		     saltInput.value).then(password =>
			 chrome.tabs.sendMessage(activeTab.id,
						 {'event' : 'populate',
						  'password' : password}));

	}
	
	saltInput.value = url.hostname;

	document.getElementById('btn-insert').addEventListener('click', event => populate());

	function onKey(event) {
	    if (event.keyCode == 13)
		populate();
	};
	basePasswordInput.addEventListener('keyup', onKey);
	saltInput.addEventListener('keyup', onKey);

	basePasswordInput.focus();
    });

});
