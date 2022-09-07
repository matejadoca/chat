let input = document.querySelector('#type');
let iframe = document.querySelector('iframe');
let my_api = 'https://630d460053a833c5343e0e61.mockapi.io/';
let loginInp = document.querySelector('.loginInput');
let sendBtn = document.querySelector('.send');

let session = new Session();
session_id = session.getSession();

function scrollBtm() {
	setTimeout(function () {
		if (iframe) {
			iframe.contentWindow.scrollTo(0, iframe.contentDocument.body.scrollHeight);
		}
	
	}, 800)
}


function loginName() {
	let login = document.querySelector('.loginInput').value;
	let session = new Session();
	session.startSession(login);
	window.location.href = "chat.html";
}

function getMessages() {
	fetch(my_api + 'chat')
	.then(res => res.json())
	.then(data =>{

		data.forEach(msgs=>{

			let chat = document.querySelector('.chatRoom');
			
			msg = `<div class='message'>
					<div class='sender'>${msgs.sender}:</div>
					<div class='messageText'>${msgs.message}</div>
			</div>`
			chat.innerHTML += msg;
		

		});
	}).catch(error=>{});
	scrollBtm();
}


function sendMessage() {
	let chat = iframe.contentWindow.document.querySelector('.chatRoom');
			
			msg = `<div class='message'>
					<div class='sender'>${session.getSession()}:</div>
					<div class='messageText'>${input.value}</div>
			</div>`
			chat.innerHTML += msg;

	let data = {
		'message': input.value,
		'sender': session.getSession()
	};

	data = JSON.stringify(data);

	fetch(my_api + 'chat', 
	{
		method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: data
	}).then(res => res.json()).then(data=>{});

	input.value = '';
	let sendBtn = document.querySelector('.send');
	sendBtn.disabled = true;

	setTimeout(function () {
		sendBtn.disabled = false;
	},5000);

	scrollBtm();
}

if (input) {
	input.addEventListener('focusin', ()=>{
		document.addEventListener('keydown', (key)=>{

			if (key.key == 'Enter' & sendBtn.disabled == false) {
				sendMessage();
				input.value = '';
			}
		});

	});

}

if (loginInp) {
		loginInp.addEventListener('focusin', ()=>{
			document.addEventListener('keydown', (key)=>{
				if (key.key == 'Enter') {
					loginName()
				}
		});
	});
}
getMessages();
	

