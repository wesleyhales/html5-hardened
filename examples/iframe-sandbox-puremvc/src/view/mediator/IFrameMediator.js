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
            getSubs();

            function addListener()
            {
                var that = this;
                window.addEventListener("message", function (e)
                {
                    console.log('Parent: recived msg:\n', e.data);
                    console.log('Parent: Number of frames\n', numFrames);
                    var data = e.data.split("|");
                    if (data[0] = 0)
                    {
                        that.sendNotification(demo.AppConstants.PROCESS_TEXT, "internal");
                    }
                    else
                    {
                        iframes.node[data[0]].contentWindow.postMessage(data[1], "*");
                    }
                }, false);
            }

            function getSubs()
            {
                var that = this;
                window.addEventListener("message", function (e)
                    {
                        console.log('Parent: recived msg:\n', e.data);
                        var data = e.data.split("|");
                        if (data[0].substr(0, 4) == "iframe")
                        {
                            iframes[numFrames] = new Object();
                            iframes[numFrames].name = data[0];
                            iframes[numFrames].node = document.getElementById(data[0]);
                            iframes[numFrames].subs = [];
                            for (i = 1; i < data.length; i++)
                            {
                                iframes[numFrames].subs[i - 1] = data[i];
                            }
                            numFrames++;
                        }
                        else if (data[0].substr(0, 3) == "type")
                        {
                            switch (data[1])
                            {
                            case "fiveormore":
                                for (i = 0; i < numFrames; i++)
                                {
                                    for (n = 0; n < numFrames; n++)
                                    {
                                        if (iframes[i].subs[n] = "fiveormore")
                                        {
                                            iframes[i].node.contentWindow.postMessage(data[2], "*");
                                        }
                                    }
                                }
                                break;
                            }
                        }
                        else if (data[0].substr(0, 4) == "remove")
                        {
                            iframes.splice(iframes.indexOf(data[1]), 1);
                            numFrames--;
                        }
                }, false);
        }
    },
    /** @override */
    onRemove: function ()
    {
        frame.contentWindow.postMessage("PARENT_REMOVED", "*");
    },
// STATIC MEMBERS
/**
 * @static
 * @type {string}
 */
NAME: 'IFrameMediator'
});
