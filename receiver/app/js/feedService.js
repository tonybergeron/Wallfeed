'use strict';

/**
 * Feed getter
 */

var feed = angular.module('wallfeed.feed', []);

feed.factory('FeedService',['$http',function($http){
    return {
        parseFeed : function(url, num){
        	if(num == null || num == undefined) {
        		var num = 10;
        	}
            return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=' + num + '&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
    }
}]);