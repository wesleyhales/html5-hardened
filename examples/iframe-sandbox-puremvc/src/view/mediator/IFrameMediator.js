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
					demo.AppConstants.IFRAME,
					demo.AppConstants.SEND
					]
		},
		
		/** @override */
		handleNotification: function (note)
		{
			switch ( note.getName() )
			{
				case demo.AppConstants.PALINDROME_DETECTED:
                     // console.log('Sending post message: pallindrome');
					break;

				case demo.AppConstants.SEND:
                     console.log('recived Send ' + note.getBody());
                     window.top.postMessage(note.getBody(), "*"); 
                    break;
				case demo.AppConstants.IFRAME:
                     // console.log('Sending post message:');
                   //  window.top.postMessage(note.toString(), "*"); 
					break;
			}
		},
	
		/** @override */
		onRegister: function ()
		{
                      console.log('Registed iframe proxy succesfully');
		},					
		
		/** @override */
		onRemove: function ()
		{

		},
		
		/**
		 * Handle the W3CTextComponent.TEXT_CHANGED event
		 * @param {Event} textChangedEvent
		 * @return {void}
		 */
		handleEvent: function (textChangedEvent)
		{
			this.sendNotification( demo.AppConstants.PROCESS_TEXT, textChangedEvent.text );
		}
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
