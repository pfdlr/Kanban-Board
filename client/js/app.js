//Mustache template
function generateTemplate(name, data, basicElement) {
	var template = document.getElementById(name).innerHTML;
	var element = document.createElement(basicElement || 'div');

	Mustache.parse(template);
	element.innerHTML = Mustache.render(template, data);

	return element;
}
// OGÓLNA FUNKCJA
/* var prefix = "https://cors-anywhere.herokuapp.com/";
var baseUrl = prefix + 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
	'X-Client-Id': '4241',
	'X-Auth-Token': '9f363cc65e90f9994ff68a36893eff0c',
	'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
}; */
var baseUrl = 'http://127.0.0.1:3000';
var myHeaders = {
	'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
};

//query API data
fetch(baseUrl + '/board', { headers: myHeaders })
	.then((resp) => resp.json())
	.then((resp) =>  setupColumns(resp))
	.catch((error) => console.log(error))

//set up colums from API data
function setupColumns(columns) {
	columns.forEach((column) => {
		var col = new Column(column._id, column.name);
		board.addColumn(col);
		setupCards(col, column.cards);
	});
}
//set up cards from API data
function setupCards(col, cards) {
	cards.sort((a, b) => (a.order < b.order ? -1 : Number(a.order > b.order)));
	cards.forEach((card) => {
    var cardObj = new Card(card._id, card.name, col.id, card.order);
  	col.addCard(cardObj);
	});
}
/* const setupCards = (col, cards) => {
	cards.sort((a, b) =>) { a.order - b.order}
} */
