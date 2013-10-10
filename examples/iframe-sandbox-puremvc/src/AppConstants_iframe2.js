// create the demo namespace
window.demo= 
{
	AppConstants: 
	{
		/**
		 * A notification that will trigger StartupCommand
		 */
		STARTUP: 'startup',			
		
		/**
		 * A notification that will trigger ProcessTextCommand
		 */
		PROCESS_TEXT: 'processText',

		/**
		 * A notification that that
		 */
		PALINDROME_DETECTED: 'palindromeDetected',
        /*
         * Developer defined
         */

        /**
		 * A ',' sperated list of notifications that the IFrameproxy should be notified for
		 */

        SUBSCRIPTIONS : 'fiveormore,palindromeDetected',

        /**
		 * The id of the iframe MUST match the dom id of the iframe
		 */
        ID : 'iframe2',

        /*
         * Iframe Mediator constants
         */

        // Used for Pure Mvc notification types.
        SEND : 'send',

        RECEIVE : 'receive',

        // Sent between iframe and parent
        SUBSCRIBE: 'subscribe',

        REMOVED : 'removed',

        DATA : 'data'

	}
};
