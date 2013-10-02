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
    {
        /** @override */
        listNotificationInterests: function ()
        {
            return [
                demo.AppConstants.PALINDROME_DETECTED,
                demo.AppConstants.SEND
            ]
        },

        /** @override */
        handleNotification: function (note)
        {
            switch (note.getName())
            {
            case demo.AppConstants.SEND:
                postMsg(note.getBody(), "palindromeDetected");
                break;
            }
        },

        /** @override */
        onRegister: function ()
        {
            subscribe(demo.AppConstants.SUBSCRIPTIONS);
            addIframelistener(this);     
        },

        /** @override */
        onRemove: function ()
        {
            remove(demo.AppConstants.ID);
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
