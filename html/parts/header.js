document.getElementsByTagName('body')[0].innerHTML = `
	<header>
		<div id="backgroundImg" class="background"></div>
		<div class="items">
			<div>
				<nav>
					<div class="logo">
						<a href="./index.html">Sport life</a>
					</div>
					<div class="links">					
						<input type="text" class="searchInput" name="t1" id="searchWindow" placeholder="Поиск"/>					
						<a class="link" href="./prices.html">Абонементы</a>
						<a class="link" href="./coaches.html">Тренеры</a>
						<a class="link" href="./about.html">О клубе</a>
						<a class="link" href="./login.html">Войти</a>
					</div>
				</nav>
				<div class="address">
					<a href="./about.html" class="address"><img class="address_icon" src="../img/icons/place.png">ЖК «Дуэт», спуск Крутогорний, 28</a>
				</div>
			</div>
			<div class="shortinfo">
				<div class="title">
					<p class="p_title"></p>
				</div>
			</div>
		</div>
	</header>
`;

function setActivePage() {
	const links = document.getElementsByClassName('link');

	const url = window.location.href.split('/').reverse()[0];

	for (let item of links) {
		if(url === item.href.split('/').reverse()[0]) {
			item.classList.add('activeLink');
		}
	}

	
}

function setIndexBackground() {
	const url = window.location.href.split('/').reverse()[0];
	switch(url){
		case 'login.html':
		case '':
		case 'index.html':
			document.getElementById('backgroundImg').classList.add('background_all');
			break;
	}
}

function setPageTitle() {
	const url = window.location.href.split('/').reverse()[0];
	let pTitle;
	switch(url){
		case '':
		case 'index.html':
			pTitle = document.getElementsByClassName('p_title')[0];
			pTitle.innerHTML = 'Не откладывай-<br>Присоединяйся сейчас';

			const items = document.getElementsByClassName('items')[0];
			let div = document.createElement('div');
			div.setAttribute('class','button');

			const a = document.createElement('a');
			a.setAttribute('class','a_button');
			a.setAttribute('href','./prices.html');
			a.textContent = 'Выбрать абонемент';

			div.append(a);
			items.append(div);

			div = document.createElement('div');
			items.append(div);

			break;
		case 'prices.html':
			pTitle = document.getElementsByClassName('p_title')[0];
			pTitle.textContent = 'Абонементы';
			break;
		case 'about.html':
			pTitle = document.getElementsByClassName('p_title')[0];
			pTitle.textContent = 'О клубе';
			break;
		case 'coaches.html':
			pTitle = document.getElementsByClassName('p_title')[0];
			pTitle.textContent = 'Наши тренеры';
			break;
		case 'gallery.html':
			pTitle = document.getElementsByClassName('p_title')[0];
			pTitle.textContent = 'Галерея';
			break;

	}
}


setActivePage();
setIndexBackground();
setPageTitle();