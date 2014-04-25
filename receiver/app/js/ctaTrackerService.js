'use strict';

/**
 * ctaTracker getter
 */

var ctaTracker = angular.module('wallfeed.ctaTracker', []);


//==================================================
// CTA Bus Service: Gets times from CTA
//==================================================
ctaTracker.factory('CTABusService', ['$http', '$q', function($http, $q) {


	// Example Call
	// http://ctatimes.herokuapp.com/bustime/api/v1/getpredictions?rt=22&stpid=1811,1937

	var baseUrl = "http://ctatimes.herokuapp.com/bustime/api/v1/";

    return {
        getPredictions : function(rt, stpid) {
        	
        	var deferred = $q.defer();

        	//console.log(deferred);

			var method = 'getpredictions';

        	$http({
	        		method: 'GET',
	        		url: baseUrl + method,
	        		params: {
	        			rt: rt,
	        			stpid: stpid
	        		},
	        	})
			    .success(function(data, status, headers, config) {
			    	//console.log('response cta bus service');
			    	//console.log(data);
			    	deferred.resolve(data);
			    })
			    .error(function(data, status, headers, config) {
			      	// called asynchronously if an error occurs
			      	// or server returns response with an error status.
			    	deferred.reject(data);
			    });

            return deferred.promise;
        }
    }
}]);

//==================================================
// CTA Bus Service: Gets times from CTA
//==================================================
ctaTracker.factory('CTATrainService', ['$http', '$q', function($http, $q) {

	// Example Call
	// http://ctatimes.herokuapp.com/traintime/api/1.0/ttarrivals?stpid=30019&max=2

	var baseUrl = "http://ctatimes.herokuapp.com/traintime/api/1.0/";

    return {
        getArrivals : function(stpid) {
        	
        	var deferred = $q.defer();

			var method = 'ttarrivals';

        	$http({
	        		method: 'GET',
	        		url: baseUrl + method,
	        		params: {
	        			stpid: stpid,
	        			max: '5'
	        		},
	        	})
			    .success(function(data, status, headers, config) {
			    	//console.log('response cta train service');
			    	//console.log(data);
			    	deferred.resolve(data);
			    })
			    .error(function(data, status, headers, config) {
			      	// called asynchronously if an error occurs
			      	// or server returns response with an error status.
			    	deferred.reject(data);
			    });

            return deferred.promise;
        }
    }
}]);