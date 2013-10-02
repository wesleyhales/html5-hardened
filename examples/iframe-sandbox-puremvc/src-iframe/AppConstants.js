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

        /**
		 * A ',' sperated list of notifications that the IFrameproxy should be notified for
		 */

        SUBSCRIPTIONS : 'palindromeDetected,fiveormore',

        /**
		 * The id of the iframe MUST match the dom id of the iframe
		 */

        ID : 'iframe1',

        REMOVED : 'removed',

        SEND : 'send',

        RECIVE : 'recive',

        SUBSCRIBE: 'subscribe',

        DATA : 'data'

	}
};
