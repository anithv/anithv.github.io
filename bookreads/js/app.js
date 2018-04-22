(function() {
	var app = angular.module('bookReads', ['book-directives']);

	//AngularJS Services
	app.controller('ReadController', ['$http', function($http) {
		var booksrd = this;
		booksrd.reads = []; //Init books to empty array, since page will render before our data returns from our GET request.

		$http.get('./js/books.json').success(function(data) {
			booksrd.reads = data;
		});
		//We cannot write "this.books" inside the callback as it will refer to the $http!
	}]);

	app.controller('ReviewController', function() {
		this.review = {}; //initialization

		this.addReview = function(book) {
			this.review.createdOn = Date.now();
			book.reviews.push(this.review);

			this.review={};
		};
	});
})();