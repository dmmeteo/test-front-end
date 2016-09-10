(function() {
	'use strict';
	angular
		.module('UserApp')
		.factory('UserFactory', UserFactory);
		function UserFactory () {
			return [ //нет возможности добавить json в переменную
{
    "id": 0,
    "register": "30/08/2016",
    "firstName": "John",
    "lastName": "Doe", 
    "birth": "02/06/1985", 
    "sex": "male", 
    "photo": "assets/img/male1.png", 
    "about": "Hypster"
},
{
    "id": 1,
    "register": "30/08/2016",
    "firstName": "Bob",
    "lastName": "Kartman", 
    "birth": "25/02/1992", 
    "sex": "male", 
    "photo": "assets/img/male2.png", 
    "about": "Student"
},
{
    "id": 2,
    "register": "30/08/2016",
    "firstName": "Bill", 
    "lastName": "Rich", 
    "birth": "07/07/1977", 
    "sex": "male", 
    "photo": "assets/img/male3.png", 
    "about": "Businessman"
},
{
    "id": 3,
    "register": "30/08/2016",
    "firstName": "Jack", 
    "lastName": "Bond", 
    "birth": "08/03/1964", 
    "sex": "male", 
    "photo": "assets/img/male4.png", 
    "about": "Police"
},
{
    "id": 4,
    "register": "30/08/2016",
    "firstName": "Ninja", 
    "lastName": "Lee", 
    "birth": "02/12/1984", 
    "sex": "male", 
    "photo": "assets/img/male5.png", 
    "about": "Ninja"
},
{
    "id": 5,
    "register": "30/08/2016",
    "firstName": "Anton", 
    "lastName": "Uncovered", 
    "birth": "17/05/1994", 
    "sex": "male", 
    "photo": "assets/img/male6.png", 
    "about": "Operator"
},
{
    "id": 6,
    "register": "30/08/2016",
    "firstName": "Steve", 
    "lastName": "McCormick", 
    "birth": "29/02/1967", 
    "sex": "male", 
    "photo": "assets/img/male7.png", 
    "about": "Manager"
},
{
    "id": 7,
    "register": "30/08/2016",
    "firstName": "Sasha", 
    "lastName": "Grey", 
    "birth": "14/03/1988", 
    "sex": "female", 
    "photo": "assets/img/female1.png", 
    "about": "Pornstar"
}
]

		}

})();