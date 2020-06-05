document.getElementsByTagName('body')[0].innerHTML = `
	<header>
		<div id="backgroundImg" class="background"></div>
		<div class="items">
			<div>
				<nav>
					<div class="logo">
						<a href="#">Sport life</a>
					</div>
					<div class="links">
						<input type="text" class="searchInput" name="t1" id="searchWindow" placeholder="Поиск"/>
						<a class="link" href="./pageCustomer.html">Личный кабинет</a>
						<!--<a class="link" href="./pricesCustomer.html">Абонементы</a>-->
						<a class="link" href="./coachesCustomer.html">Тренера</a>
						<a class="link" href="./aboutCustomer.html">О клубе</a>
						<a class="link" href="/">Выйти</a>
					</div>
				</nav>
				<div class="address">
					<a href="./aboutCustomer.html" class="address"><img class="address_icon" src="../img/icons/place.png">ЖК «Дуэт», спуск Крутогорний, 28</a>
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
        case 'pricesCustomer.html':
		case 'prices.html':
			pTitle = document.getElementsByClassName('p_title')[0];
			pTitle.textContent = 'Абонементы';
            break;
        case 'aboutCustomer':
		case 'about.html':
			pTitle = document.getElementsByClassName('p_title')[0];
			pTitle.textContent = 'О клубе';
            break;
        case 'coachesCustomer.html':
		case 'coaches.html':
			pTitle = document.getElementsByClassName('p_title')[0];
			pTitle.textContent = 'Наши тренера';
			break;

	}
}


setActivePage();
setPageTitle();