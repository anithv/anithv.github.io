(function() {
	var app = angular.module('book-directives', []); //Different closure means different app variable.

	/* Directives */ 
	//Book Description Directive
	app.directive("bookDescription", function() {
		return {
			restrict: 'E',
			templateUrl: "book-description.html"
		};
	});

	//Book Details Directive
	app.directive("bookDetails", function() {
		return {
			restrict: 'A', //attribute directive
			templateUrl: "book-details.html"
		};
	});

	//Book Reviews Directive
	app.directive("bookReviews", function() {
		return {
			restrict: 'E',
			templateUrl: "book-reviews.html"
		};
	});

	//Controllers in Directives
	app.directive("bookTabs", function() {
		return {
			restrict: 'E',
			templateUrl: "book-tabs.html",
			//Tab Controller function
			controller: function() { 
				this.tab = 1; //initialization

				this.isSet = function(checkTab) {
					return this.tab === checkTab;
				};

				this.selectTab = function(setTab) {
					this.tab = setTab;
				};
			},
			controllerAs: "tabs"
		};
	});

	app.directive("bookGallery", function() {
		return {
			restrict: 'E',
			templateUrl: "book-gallery.html",
			controller: function() {
				this.current = 0;

				this.setCurrent = function(imageNumber) {
					this.current = imageNumber || 0;
				};
			},
			controllerAs: "gallery"
		};
	});
})();