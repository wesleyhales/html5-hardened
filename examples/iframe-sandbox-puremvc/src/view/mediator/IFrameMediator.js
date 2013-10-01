/**
 * @class demo.view.IFrameMediator
 * @extends puremvc.Mediator
 */
puremvc.define(
// CLASS INFO
{
    name: 'demo.view.mediator.IFrameMediator',
    parent: puremvc.Mediator
},
// INSTANCE MEMBERS
{ /** @override */
    listNotificationInterests: function() {
        return [
        demo.AppConstants.SEND]
    },
    /** @override */
    handleNotification: function(note) {
        switch (note.getName()) {
        case demo.AppConstants.SEND:
            console.log('Parent:dispatched to iframe \n' + note.getBody());
           
            for (i = 0; i < frames.length; i++) {
               // frames[i].contentWindow.postMessage(note.getBody(), "*");
            }
            break;
        }
    },
    /** @override */
    onRegister: function() {
        getSubs();
       function addListener() {
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
        var that = this;
        eventer(messageEvent, function(e) {
            console.log('Parent: recived msg:\n', e.data);
   
            framess[0] = document.getElementById("iframe");
            framess[1] = document.getElementById("iframe2");
            var data = e.data.split("|");
            if(data[0] = 0) {
                that.sendNotification(demo.AppConstants.PROCESS_TEXT, "internal");
            } else {
                frames[data[0]].contentWindow.postMessage(data[1], "*");
            }

        }, false);
    }

  function getSubs() {
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
        var that = this;
        eventer(messageEvent, function(e) {
            console.log('Parent: recived msg:\n', e.data);

           var data = e.data.split("|");
           var iframes = [];
            var numFrames = 0;
            iframes[numFrames] = new Object();
           iframes[numFrames].name = data[0];
            iframes[numFrames].node = document.getElementById(data[0]);
           iframes[numFrames].subs = [];
           for (i =1; i < data.length ; i++) {
                iframes[numFrames].subs[i-1] = data[i];
            }
            numFrames++;
        }, false);
    }
    },
    /** @override */
    onRemove: function() {
        frame.contentWindow.postMessage("PARENT_REMOVED", "*");
    },

    
},
// STATIC MEMBERS
{
    /**
     * @static
     * @type {string}
     */
    NAME: 'IFrameMediator'
});
