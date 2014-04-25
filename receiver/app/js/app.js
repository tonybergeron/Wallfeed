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
.config(['$httpProvider', function ($httpProvider) {
	//Enable cross domain calls
	$httpProvider.defaults.useXDomain = true;

	//Remove the header used to identify ajax call  that would prevent CORS from working
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])
.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
   'self',
   'http://192.168.**',
   "http://www.youtube.com/embed/**"
  ]);
})
.config(['$stateProvider', '$urlRouterProvider', 
	function($stateProvider, $urlRouterProvider) {

		//Entry
		$stateProvider
			.state('entry', {
				template: '<br>Chromecast Initializing...',
				url: "", //Landing!
				controller: 'entryCtrl'
			});

		//Dashboard
		$stateProvider
			.state('dashboard', {
				templateUrl: 'partials/dashboard.html'
			})
			.state('dashboard.all', {
				url: "/",
				views: {
				  'note': {
				    templateUrl: 'partials/note.html',
				    controller: 'noteCtrl'
				  },
				  'cnn': {
				    templateUrl: 'partials/cnn.html'
				  },
				  'cnn-money': {
				    templateUrl: 'partials/cnn-money.html'
				  },
				  'verge': {
				    template: "<h3>The Verge</h3><feed feedurl='http://www.theverge.com/rss/index.xml' number='3'></feed>"
				  },
				  'weather': {
				    templateUrl: 'partials/weather.html',
				    controller: 'weatherCtrl'
				  },
				  'reddit': {
				    templateUrl: 'partials/reddit.html'
				  },
				  'video': {
				  	template: '<video-repeat id="video" videourl="{{currentVideo}}" playerWidth="360" playerHeight="240"></video-repeat>',
				  	controller: 'videoCtrl'
				  },
				  'youtube': {
				  	templateUrl: 'partials/youtube.html',
				  	controller: 'youtubeCtrl'
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
				  },
				  'sports-blackhawks': {
				  	template: "<h3>NHL: Blackhawks</h3><feed feedurl='http://sports.yahoo.com/nhl/teams/chi/rss.xml' number='3'></feed>"
				  }
				}
			});

		// Morning View
		$stateProvider
			.state('morning', {
				templateUrl: 'partials/morning.html'
			})
			.state('morning.all', {
				url: "/morning",
				views: {

				  // News
				  'verge': {
				    template: "<h3>The Verge</h3><feed feedurl='http://www.theverge.com/rss/index.xml' number='3'></feed>"
				  },
				  'sports-blackhawks': {
				  	template: "<h3>NHL: Blackhawks</h3><feed feedurl='http://sports.yahoo.com/nhl/teams/chi/rss.xml' number='3'></feed>"
				  },

				  // Weather
				  'weather': {
				    templateUrl: 'partials/weather.html',
				    controller: 'weatherCtrl'
				  },

				  // CTA Train
				  'cta-train': {
				  	templateUrl: 'partials/ctaTrain.html',
				  	constroller: 'ctaTrainCtrl'
				  },

				  // CTA Bus
				  'cta-bus': {
				  	templateUrl: 'partials/ctaBus.html',
				  	controller: 'ctaBusCtrl'
				  },

				  // Metra
				  'metra': {
				  	templateUrl: 'partials/metra.html',
				  	controller: 'metraCtrl'
				  }
				}
			});
		
		//Fullscreen Video
		$stateProvider
			.state('youtube', {
				url: "/youtube",
				templateUrl: 'partials/youtubeFull.html',
			    controller: 'youtubeFullCtrl' 
			});

		//Fullscreen Video
		$stateProvider
			.state('ctaBus', {
				url: "/ctaBus",
				templateUrl: 'partials/ctaBus.html',
			    controller: 'ctaBusCtrl' 
			});
	

		//Fullscreen Video
		$stateProvider
			.state('localVideo', {
				url: "/local",
				template: '<video-repeat id="video" videourl="{{currentVideo}}" playerWidth="1200" playerHeight="700"></video-repeat>',
			    controller: 'videoCtrl' 
			});

}])
.run(function(Chromecast) {
	//Chromecast.initialize();
	//console.log('run');
});










