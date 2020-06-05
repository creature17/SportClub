function drawFooter() {
	const body = document.getElementsByTagName('body')[0];

	const footer = document.createElement('footer');

	let div = document.createElement('div');
	div.setAttribute('class', 'footer_since');

	let p = document.createElement('p');
	p.setAttribute('class', 'since');
	p.textContent = 'Sport life 2019';

	div.append(p);

	footer.append(div);

	div = document.createElement('div');
	div.setAttribute('class', 'footer_item');

	p = document.createElement('p');
	p.setAttribute('class', 'center_img');

	let image = document.createElement('img');
	image.setAttribute('src', '../img/icons/place1.png');
	image.setAttribute('class', 'contacts callAdmin');
	image.setAttribute('onclick',`window.location = './about.html'`)

	p.append(image);	

	div.append(p);

	a = document.createElement('a');
	a.setAttribute('class', 'since address_footer');
	a.setAttribute('href','./about.html');
	a.innerHTML = 'г. Днепр<br>пр. Карла Маркса, 23'

	div.append(a);

	footer.append(div);

	div = document.createElement('div');
	div.setAttribute('class', 'footer_item');

	p = document.createElement('p');
	p.setAttribute('class', 'center_img');

	image = document.createElement('img');
	image.setAttribute('src', '../img/icons/phone1.png');
	image.setAttribute('class', 'contacts callAdmin');

	p.append(image);	

	div.append(p);

	p = document.createElement('p');
	p.setAttribute('class', 'since');
	p.textContent = '0956362726';

	div.append(p);

	p = document.createElement('p');
	p.setAttribute('class', 'since');
	p.textContent = '0976538264';

	div.append(p);

	footer.append(div);

	div = document.createElement('div');
	div.setAttribute('class', 'footer_item');

	p = document.createElement('p');
	p.setAttribute('class', 'center_img');

	image = document.createElement('img');
	image.setAttribute('src', '../img/icons/inst.png');
	image.setAttribute('class', 'contacts callAdmin');

	p.append(image);	

	div.append(p);

	p = document.createElement('p');
	p.setAttribute('class', 'since');
	p.textContent = '@sport_life_dp';

	div.append(p);

	footer.append(div);

	div = document.createElement('div');
	div.setAttribute('class', 'footer_item');

	p = document.createElement('p');
	p.setAttribute('class', 'center_img');

	image = document.createElement('img');
	image.setAttribute('src', '../img/icons/message.png');
	image.setAttribute('class', 'contacts callAdmin');
	image.setAttribute('onclick','openMessageToAdmin()');

	p.append(image);	

	div.append(p);

	p = document.createElement('p');
	p.setAttribute('class', 'since');
	p.textContent = 'Свяжитесь с нами';

	div.append(p);
	footer.append(div);

	//message to admin form
	const transparentDiv = document.createElement('div');
	transparentDiv.setAttribute('class', 'transparentDiv');
	transparentDiv.setAttribute('onclick','closeMessageToAdmin()');
	transparentDiv.setAttribute('id','messageToAdminMail');

	const messageDiv  = document.createElement('div');
	messageDiv.setAttribute('class','messageToAdmin');
	messageDiv.setAttribute('id','messageToAdminBox');

	let inputLabel = document.createElement('label');
	inputLabel.textContent = 'Ваш email';

	let input = document.createElement('input');
	input.setAttribute('id','senderEmail');
	input.setAttribute('onblur','checkEmail()');
	input.setAttribute('onfocus','uncheckEmail()');

	messageDiv.append(inputLabel);
	messageDiv.append(input);

	inputLabel = document.createElement('label');
	inputLabel.textContent = 'Сообщение';

	input = document.createElement('textarea');
	input.setAttribute('id','senderText');
	input.setAttribute('onfocus','uncheckText()');

	messageDiv.append(inputLabel);
	messageDiv.append(input);

	const send = document.createElement('button');
	send.setAttribute('class', 'systemButton');
	send.setAttribute('onclick','sendMessageToAdmin()');
	send.textContent = 'Отправить';

	messageDiv.append(send);
	body.append(messageDiv);
	//
	body.append(transparentDiv);
	body.append(footer);
}

drawFooter();