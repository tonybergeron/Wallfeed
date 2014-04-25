'use strict';

/* Directives */

angular.module('wallfeed.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])

  //==================================================
  // RSS Feed Directive. Gets a Feed URL and an amount to fetch
  //==================================================
  .directive('feed', ['$timeout', 'FeedService', function($timeout, Feed) {

  	return {
      restrict: 'E',
      replace: true, 
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

        function updateLater() {
            setTimeout(function() {
              loadFeed(); // update DOM
              updateLater(); // schedule another update
            }, 120000);
        }
        
        loadFeed();
        updateLater();
      }

    };
  }])

  //==================================================
  // Current Time
  //==================================================
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
	        
          updateTime(); 
	        updateLater();
    	}
    };
  })

  //==================================================
  // HTML5 Video Player
  //==================================================
  .directive("videoRepeat", ['$sce', function($sce) {
  	return {
      restrict: 'E',
      scope: {
        videourl: '@videourl',
        width: '@playerWidth',
        height: '@playerHeight'
      },
      //autoplay off for now  
      template: '<video width"{{width}}" class="img-rounded" height="{{height}}" src="{{videourl}}" autoplay autobuffer controls></video>',
      link: function (scope, element) {
        //do nothing
      }
  	}
  }])



  //==================================================
  // CTA Bus Tracker
  //==================================================
  .directive('ctaBus', [function() {

    return {
      restrict: 'A',
      scope: {
        route: '@route',
        stop: '@stop'
      },
      templateUrl: 'partials/bus-time.html',
      link: function(scope, element, attrs) {

        scope.differenceInMinutes = differenceInMinutes;

        //Watch the parents information.  If any of it changes, bring it into the directive
        scope.$parent.$watch('busTimes', function() {
          scope.busTimes = scope.$parent.busTimes;
        });

      }
    };
  }])


  //==================================================
  // CTA Train Tracker
  //==================================================
  .directive('ctaTrain', [function() {

    return {
      restrict: 'A',
      scope: {
        stop: '@stop'
      },
      templateUrl: 'partials/train-time.html',
      link: function(scope, element, attrs) {

        scope.differenceInMinutes = differenceInMinutes;

        //Watch the parents information.  If any of it changes, bring it into the directive
        scope.$parent.$watch('trainTimes', function() {
          scope.trainTimes = scope.$parent.trainTimes;
          //console.log(scope.trainTimes);
        });

      }
    };
  }]);


var differenceInMinutes = function(date1, date2) {
  var minutes = 0;

  var a = moment.unix(date1 / 1000);
  var b = moment.unix(date2 / 1000);
  minutes = a.diff(b, 'minutes');
  //console.log(a);
  //console.log(minutes);

  return minutes;
};











