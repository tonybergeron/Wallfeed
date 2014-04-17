'use strict';

/* Directives */

angular.module('wallfeed.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('feed', ['$timeout', 'FeedService', function($timeout, Feed) {

  	return {
      restrict: 'E',
      scope: {
        feedurl: '@feedurl',
        number: '@number'
      },
      templateUrl: 'partials/feed.html',
      link: function (scope, element) {

      	//console.log(scope.feedurl);

      	function loadFeed(e) {        
	        Feed.parseFeed(scope.feedurl, scope.number).then(function(res){
	            //$scope.loadButonText=angular.element(e.target).text();
	            scope.feeds=res.data.responseData.feed.entries;
	            //console.log($scope.feeds);
              scope.lastUpdated = Date.now();
	        });
	    }

	    loadFeed();
	    $timeout(function() {
	    	loadFeed();
	    }, 120000);
      }
    };
  }])
  .directive("myCurrentTime", function(dateFilter) {
  	//console.log(dateFilter);
    return {
    	link: function (scope, element) {
    		//console.log(dateFilter);

	    	function updateTime() {
	            var dt = dateFilter(new Date(), 'MMMM dd yyyy h:mm:ss a');
	            element.text(dt);
	        }
	        
	        function updateLater() {
	            setTimeout(function() {
	              updateTime(); // update DOM
	              updateLater(); // schedule another update
	            }, 1000);
	        }
	        
	        updateLater();
    	}
    };
  })
  .directive("videoRepeat", ['$sce', function($sce) {
  	return {
      restrict: 'E',
      scope: {
        videourl: '@videourl'
      },
      //autoplay off for now  
      template: '<video width"360" class="img-rounded" height="240" src="{{videourl}}" autoplay autobuffer controls></video>',
      link: function (scope, element) {
        //do nothing
      }
  	}
  }]);