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
        listNotificationInterests: function ()
        {
            return [
                demo.AppConstants.SEND]
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
            if(self==top) {
                console.log(demo.AppConstants.ID + 'top added\n');
                addParent(demo.AppConstants.SUBSCRIPTIONS);
                addParentListener(this);
            } else {
                console.log(demo.AppConstants.ID + 'added\n');
                addIframelistener(this);
                subscribe(demo.AppConstants.SUBSCRIPTIONS);
            }
        },

        /** @override */
        onRemove: function ()
        {
            remove(demo.AppConstants.ID);
        },
        // STATIC MEMBERS
        /**
         * @static
         * @type {string}
         */
        NAME: 'IFrameMediator'
    });
