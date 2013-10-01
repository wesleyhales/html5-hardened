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
					demo.AppConstants.PALINDROME_DETECTED,
					demo.AppConstants.RECIVE,
					demo.AppConstants.SEND
					]
		},
		
		/** @override */
		handleNotification: function (note)
		{
			switch ( note.getName() )
			{
				case demo.AppConstants.SEND:
                     console.log('Iframe2: dispatched ' + note.getBody());
                    window.top.postMessage( "1|" + note.getBody(), "*"); 
                    break;
				case demo.AppConstants.RECIVE:
                     console.log('Recived post message:');
                   //  window.top.postMessage(note.toString(), "*"); 
					break;
			}
		},
	
		/** @override */
		onRegister: function ()
		{
        window.top.postMessage(demo.AppConstants.ID + "|" + demo.AppConstants.SUBSCRIPTIONS, "*"); 
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
        var that = this; 
        eventer(messageEvent,function(e) {
         console.log('Iframe2:recived msg:\n',e.data);
			that.sendNotification( demo.AppConstants.PROCESS_TEXT, e.data, "internal" );
            },false);
		},					
		
		/** @override */
		onRemove: function ()
		{
             window.top.postMessage(demo.AppConstants.REMOVED, "*"); 
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
