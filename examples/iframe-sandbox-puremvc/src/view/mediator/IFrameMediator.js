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
                console.log('Parent:dispatched to iframe \n' + note.getBody());
                s
                break;
            }
        },
        /** @override */
        onRegister: function ()
        {
            var iframes = [];
            var numFrames = 0;
            addListener();

            function addListener() {

                window.addEventListener("message", function (e)
                    {
                        console.log('Parent: recived msg:\n', e.data);
                        var data = e.data;
                        switch (data.type) {

                        case "subscription" :
                            iframes[numFrames] = new Object();
                            iframes[numFrames].name = data.origin;
                            iframes[numFrames].node = document.getElementById(data.origin);
                            iframes[numFrames].subs = data.body
                            numFrames++;
                             break;
                        case "removed" :
                            iframes.splice(iframes.indexOf(data.origin), 1);
                            numFrames--;
                            break;

                        case "data" :
                            for (i = 0; i < numFrames; i++)
                                {
                                    for (n = 0; n < numFrames; n++)
                                    {
                                        if (iframes[i].subs[n] = data.notification)
                                        {
                                            iframes[i].node.contentWindow.postMessage(data.body, "*");
                                        }
                                    }
                                }
                            break; 
                        }

                }, false);
        }
    },
    /** @override */
    onRemove: function ()
    {
        frame.contentWindow.postMessage("REMOVED", "*");
    },
// STATIC MEMBERS
/**
 * @static
 * @type {string}
 */
NAME: 'IFrameMediator'
});
