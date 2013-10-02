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
                demo.AppConstants.RECIVE,
                demo.AppConstants.SEND
            ]
        },
        /** @override */
        handleNotification: function (note)
        {
            switch (note.getName())
            {
            case demo.AppConstants.SEND:
                console.log('Iframe2: dispatched ' + note.getBody());
                var data = new Object();
                data.type = "note";
                data.origin = "iframe1";
                data.body = note.getBody();
                window.top.postMessage(data, "*");
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
            var data = new Object();
            data.type = "subscription"
            data.origin = demo.AppConstants.ID;
            data.body = ["fiveormore", "sevenormore"]
            window.top.postMessage(data, "*")
            var that = this;
            window.addEventListener("message", function (e)
            {
                console.log('Iframe2:recived msg:\n', e.data);
                that.sendNotification(demo.AppConstants.PROCESS_TEXT, e.data, "internal");
            }, false);
        },
        /** @override */
        onRemove: function ()
        {
            var data = new Object;
            data.type = "removed";
            data.origin = demo.AppConstants.ID;
            window.top.postMessage(data, "*");
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
