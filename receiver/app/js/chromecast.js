'use strict';

/**
 * ChromeCast Javascript for setting up the CastReceiverManager
 */

var chromecast = angular.module('wallfeed.chromecast', []);


//Chromecase Factory for Cast Methods
chromecast.factory('Chromecast', ['$state', function($state) {

  var castReceiverManager;
  var messageBus;

  var chromecast = {};

  chromecast.test = function() {
    console.log('chromecast function test');
  };

  chromecast.initialize = function() {
    cast.receiver.logger.setLevelValue(0);
    castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    console.log('Starting Receiver Manager');

    // handler for the 'ready' event
    castReceiverManager.onReady = function(event) {
      console.log('Received Ready event: ' + JSON.stringify(event.data));
      castReceiverManager.setApplicationState("Application status is ready...");
      //Sender is connected and now we can push to the dashboard.all state
      $state.go('dashboard.all');
    };

    // handler for 'senderconnected' event
    castReceiverManager.onSenderConnected = function(event) {
      console.log('Received Sender Connected event: ' + event.data);
      console.log(castReceiverManager.getSender(event.data).userAgent);
    };

    // handler for 'senderdisconnected' event
    castReceiverManager.onSenderDisconnected = function(event) {
      console.log('Received Sender Disconnected event: ' + event.data);
      if (castReceiverManager.getSenders().length == 0) {
        //window.close();
        //TODO Eventually make it so the user can stop the cast. 
      }
    };

    // handler for 'systemvolumechanged' event
    castReceiverManager.onSystemVolumeChanged = function(event) {
      console.log('Received System Volume Changed event: ' + event.data['level'] + ' ' +
        event.data['muted']);
    };

    // create a CastMessageBus to handle messages for a custom namespace
    messageBus = castReceiverManager.getCastMessageBus('urn:x-cast:com.tony.bergeron.wallfeed');

    // handler for the CastMessageBus message event
    messageBus.onMessage = function(event) {
      console.log('Message [' + event.senderId + ']: ' + event.data);
      // display the message from the sender

      displayText(event.data);

      // inform all senders on the CastMessageBus of the incoming message event
      // sender message listener will be invoked
      messageBus.send(event.senderId, event.data);
    }

    // initialize the CastReceiverManager with an application status message
    castReceiverManager.start({
      statusText: "Application is starting"
    });
    console.log('Receiver Manager started');
  };

  // utility function to display the text message in the input field
  chromecast.displayText = function(text) {
    console.log(text);
    document.getElementById("message").innerHTML = text;
    castReceiverManager.setApplicationState(text);
  };

  //TODO: Change state by user

  return chromecast;
}]);









