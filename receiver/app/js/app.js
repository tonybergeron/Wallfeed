'use strict';


// Declare app level module which depends on filters, and services
angular.module('wallfeed', [
	'ui.router',
	'wallfeed.filters',
	'wallfeed.services',
	'wallfeed.directives',
	'wallfeed.controllers',
	'wallfeed.chromecast'
])
.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
   'self',
   'http://192.168.**',
   "http://www.youtube.com/embed/**"
  ]);
})
.config(['$stateProvider', '$urlRouterProvider', 
	function($stateProvider, $urlRouterProvider) {

		 $stateProvider
		  .state('entry', {
		  	template: 'Routing...',
		  	url: "",
		  	controller: 'entryCtrl'
		  })
		  .state('dashboard', {
		    templateUrl: 'partials/dashboard.html'
		  })
		  .state('dashboard.all', {
    		url: "/all", // Note the empty URL
		    views: {
		      'cnn': {
		        templateUrl: 'partials/cnn.html'
		      },
		      'cnn-money': {
		        templateUrl: 'partials/cnn-money.html'
		      },
		      'verge': {
		        templateUrl: 'partials/verge.html'
		      },
		      'weather': {
		        templateUrl: 'partials/weather.html',
		        controller: 'weatherCtrl'
		      },
		      'reddit': {
		        templateUrl: 'partials/reddit.html'
		      },
		      'video': {
		      	templateUrl: 'partials/video.html',
		      	controller: 'videoCtrl'
		      },
		      'cta-train': {
		      	templateUrl: 'partials/ctaTrain.html',
		      	controller: 'ctaTrainCtrl'
		      },
		      'cta-bus': {
		      	templateUrl: 'partials/ctaBus.html',
		      	controller: 'ctaBusCtrl'
		      },
		      'metra': {
		      	templateUrl: 'partials/metra.html',
		      	controller: 'metraCtrl'
		      }
		    }
		  });

	/*
		var home = {
			name: 'state1',
			url: '/',
			views: {
				'': {
					template: 'Hello {{name}}',
					controller: ['$scope',
						function($scope) {
							$scope.name = "World";
						}
					]
				},
				'foo': {
					templateUrl: 'partials/partial1.html'
				}
			}
		};

		var news = {
			name: 'state2',
			url: '/news',
			template: 'test template',
			views: {
				'list': {
					templateUrl: 'partials/partial2.html'
				}
			}
		};

		$stateProvider.state(home);
		$stateProvider.state(news);
*/
	
}])
.run(function(Chromecast) {
	Chromecast.initialize();
	console.log('run');
});