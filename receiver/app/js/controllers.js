'use strict';

/* Controllers */

angular.module('wallfeed.controllers', ['wallfeed.feed'])
  .controller('entryCtrl', ['$state', function($state) {
  	setTimeout(function() {
  		//$state.go('dashboard.all');
  	}, 5000);
  }])
  .controller('redditCtrl', ['$scope', '$timeout', 'FeedService', function ($scope, $timeout, Feed) {

  }])
  .controller('cnnCtrl', ['$scope', '$timeout', 'FeedService', function ($scope, $timeout, Feed) {  

  }])
  .controller('ctaTrainCtrl', ['$scope', function ($scope) {  

  }])
  .controller('ctaBusCtrl', ['$scope', function ($scope) {  

  }])
  .controller('weatherCtrl', ['$scope', '$timeout', function ($scope, $timeout) {  
  	
  	$scope.lastUpdated = '';

  	$scope.forecastUrl = 'https://www.forecast.io/embed/#lat=41.8819&lon=-87.6278&name=Downtown Chicago';
  	function refreshIframe() { 
	    var iFrame = document.getElementById("forecast_embed_iframe");
	    //console.log(iFrame);
	    iFrame.setAttribute("src", '');
	    iFrame.setAttribute("src", $scope.forecastUrl);
	    $scope.lastUpdated = Date.now();
	};

	document.getElementById("forecast_embed_iframe").setAttribute('src', $scope.forecastUrl);
	$scope.lastUpdated = Date.now();

	function updateLater() {
	    $timeout(function() {
	      refreshIframe(); // Get Metra Times
		//getAnnouncements();
          updateLater(); // schedule another update
	    }, 3600000);
    }

    updateLater();


  }])
  .controller('videoCtrl', ['$scope', function ($scope) {  
  	//on the end of the video, load next video

  	$scope.currentVideo = '';

  	$scope.fileList = [
  		'http://192.168.1.100/videos/sample2.mp4',
  		'http://192.168.1.100/videos/sample3.mp4',
  		'http://192.168.1.100/videos/sample4.mp4'
  	];
  	$scope.nextVideoIndex = 0;

  	//Get the next video from the filelist
	  function getVideo() {

	  	//console.log('getVideo');

	    var path = $scope.fileList[$scope.nextVideoIndex];

	    //console.log(path);

	    $scope.nextVideoIndex++;
	    if ($scope.nextVideoIndex >= $scope.fileList.length) {
	      $scope.nextVideoIndex = 0;
	    }
	    return path;
	  };

	  //Load in the videos to the stash
	  //function loadVideos(data) {
	    //var parsed = JSON.parse(data);
	  function playVideos() {

		$scope.nextVideoIndex = 0;

		var video = document.getElementById('video').firstChild;
		video.pause();
		$scope.currentVideo = getVideo();
		video.play();

		$("#video video").bind("ended", function() {
			video.pause();
			video.src = getVideo();
			video.play();
		});

	  }
		
	  playVideos();

  }])
  .controller('metraCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {  
  	$scope.times = [];
  	$scope.lastUpdated = '';
  	$scope.payload = {
		Corridor: 'UP-N',
		Destination :'OTC',
		Origin : 'RAVENSWOOD',
		timestamp : ''
		//timestamp : '/Date(1397679001139-0000)/'
  	};


  	//Get Train Times
  	function getTimes() {
  		$http({
		    url: 'http://12.205.200.243/AJAXTrainTracker.svc/GetAcquityTrainData',
		    method: "POST",
		    headers: {
		    	'Content-Type': 'application/json; charset=UTF-8'
		    },
		    data: {
		    	'stationRequest' : {
			    	'Corridor' : $scope.payload.Corridor,
			    	'Destination' : $scope.payload.Destination,
			    	'Origin' : $scope.payload.Origin,
			    	'timestamp' : '/Date(' + Date.now() + '-0000)/'
		    	}
		    }
		})
		.then(function(response) {

			//Clear old times
			$scope.times.length = 0;

			var d = JSON.parse(response.data.d);

	        //Add to scope!
	        $scope.lastUpdated = cleanTrainTimes(d.responseTime);
	        
	        //Push those times into our scope!
	        angular.forEach(d, function(value, key){
	        	if(key.indexOf('train') !== -1) {
	        		this.push(value);
	        	}
		     }, $scope.times);

	        //Sanitize those damn train times!
	        angular.forEach($scope.times, function(value, key) {
	        	//$scope.times[key].estimated_dpt_time = cleanTrainTimes(value.estimated_dpt_time);
	        	//console.log(value);
	        	value.estimated_dpt_time = cleanTrainTimes(value.estimated_dpt_time);
	        	value.scheduled_dpt_time = cleanTrainTimes(value.scheduled_dpt_time);
	        	value.timestamp = cleanTrainTimes(value.timestamp);

	        	//special calculations
	        	value.difference = $scope.getDifferenceInMinutes(value.estimated_dpt_time, value.scheduled_dpt_time);
	        	value.time_to_arrival = $scope.getDifferenceInMinutes(value.estimated_dpt_time, Date.now());
	        	
	        });

	        //console.log($scope.lastUpdated);
	        //console.log($scope.times);
	    }, 
	    function(response) { 
	        console.log('Failure! Metra Times');
	        console.log(response);
	    });
  	}

  	$scope.getDifferenceInMinutes = function(later, earlier) {
  		var minutes = -0;

  		var diff = later - earlier;

  		minutes = Math.ceil(diff / 1000 / 60);

  		return minutes;
  	}

  	function cleanTrainTimes(dateString) {
  		return +dateString.replace(/[A-Za-z$-\/]/g, "").trim();
  	}

  	$scope.returnDate = function(dateString) {
  		var millis = cleanTrainTimes(dateString);
  		var date = new Date(millis);
  		return date;
  	};

  	/*
  	// Get Metra Service Announcments
  	function getAnnouncements() {
  		$http({
		    //url: 'http://www.metrarail.com/content/trainTracker.serviceannouncements.html',
		    url: 'http://174.143.102.131:80/content/metra/en/home/jcr:content/trainTracker.serviceannouncements.html',
		    method: "GET",
		    params: {
		    	//trackerIndex: 0,
		    	trainLineId: 'UP-N'
		   	}
		})
		.then(function(response) {
			console.log('announcemnet success');
			console.log(response);
	    }, 
	    function(response) { 
	        console.log('Failure! Metra Announcments');
	        console.log(response);
		});
  	}*/


    
	getTimes();
	//getAnnouncements();
    updateLater();

	function updateLater() {
	    $timeout(function() {
	      getTimes(); // Get Metra Times
		//getAnnouncements();
          updateLater(); // schedule another update
	    }, 30000);
    }

	


  }]);











