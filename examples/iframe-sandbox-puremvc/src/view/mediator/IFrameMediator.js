/**
 * @class demo.view.IFrameMediator
 * @extends puremvc.Mediator
 */
puremvc.define
(
	// CLASS INFO
	{
		name: 'demo.view.mediator.IFrameMediator',
		parent: puremvc.Mediator
	},

	// INSTANCE MEMBERS
	{
		/** @override */
		listNotificationInterests: function ()
		{
			return [
					demo.AppConstants.SEND
					]
		},
		
		/** @override */
		handleNotification: function (note)
		{
			switch ( note.getName() )
			{
				case demo.AppConstants.SEND:
                     console.log('Parent:dispatched to iframe \n' + note.getBody());
                     var frames = new Array();
  frames[0] = document.getElementById("iframe");
  frames[1] = document.getElementById("iframe2");
                    for(i =0;  i< frames.length; i++ ) {
                      frames[i].contentWindow.postMessage(note.getBody(), "*"); 
                    }
                    break;
			}
		},
	
		/** @override */
		onRegister: function ()
		{
                  console.log('Registed iframe proxy succesfully');
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
        var that = this; 
        eventer(messageEvent,function(e) {
         console.log('Parent: recived msg:\n',e.data);
			that.sendNotification( demo.AppConstants.PROCESS_TEXT, e.data, "internal" );
            },false);
		},					
		
		/** @override */
		onRemove: function ()
		{
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
	}
);
