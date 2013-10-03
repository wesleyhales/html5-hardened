//Array of frames, includes the parent.
var iframes = [];
//number of frames
var numFrames = 0;


/* DEVELOPER IMPLMENTED
 * Handles the notification recived from the parent using pureMVC notifications.
 * @param data: the notification object recived from the parent.
 */

function handlePost(context, data)
{
    switch (data.notification)
    {
    case "palindromeDetected":
        context.sendNotification(demo.AppConstants.PROCESS_TEXT, data.body, "internal");
        break;
    case "fiveormore":
        context.sendNotification(demo.AppConstants.PROCESS_TEXT, data.body, "internal");
        break;
    case "sevenormore":
        context.sendNotification(demo.AppConstants.PROCESS_TEXT, data.body, "internal");
        break;
    }
}

function subscribe(subsriptionList)
{
    var data = new Object();
    data.type = demo.AppConstants.SUBSCRIBE;
    data.origin = demo.AppConstants.ID;
    data.body = subsriptionList.split(',');
    window.top.postMessage(data, "*");
}

/*
 * Removes the frame from the list of iframes.
 */

function remove(id)
{
    var data = new Object;
    data.type = demo.AppConstants.REMOVED;
    data.origin = id;
    window.top.postMessage(data, "*");
}
/*
 * Uses the HTML5 post message api to send a notification to the parent window.
 * @param note: the data to be sent
 * @param notification: the type of notification, should correspond with a subscription
 */

function postMsg(note, notifiction)
{
    var data = new Object();
    data.type = demo.AppConstants.DATA;
    data.origin = demo.AppConstants.ID;
    data.body = note;
    data.notification = notifiction;
    window.top.postMessage(data, "*");
    console.log(demo.AppConstants.ID + ': dispatched ' + data);
}
/*
 * Adds this window to the list of frames to be notifed.
 * @param subsriptionList: A comma seperated list of notifcation types to subscribe to
 */

function addParent(subscriptionList)
{
    var parent = new Object;
    parent.name = demo.AppConstants.ID;
    parent.node = this;
    parent.subs = subscriptionList.split(',');
    iframes[numFrames] = parent;
    numFrames++;
}
/*
 * Adds an event listner for messages sent via post message.
 */

function addIframelistener(context)
{
    window.addEventListener("message", function (e)
    {
        console.log(demo.AppConstants.ID + ':recived msg:\n', e.data);
        handlePost(context, e.data);
    }, false);
}

/*
 * Removes the iframe from the dom and the array of frames. 
 * @param a iframe object from the iframes[] 
 */
function removeFrame(frame) {
    console.log(demo.AppConstants.ID + ': removed:\n', frame.origin);
    var index = 0;
    for(var i = 0; i < numFrames; i++) {
        if (iframes[i].name == frame.origin) {
            index = i;
            break;
        }
    }
   var removed = iframes.splice(index, 1);
   var node = removed[0].node;
   node.parentNode.removeChild(node);
   numFrames--;
}

/*
 * Adds a event listner to the parent window, handles distribution of notifications and the list of iframes.
 */

function addParentListener(context)
{
    window.addEventListener("message", function (e)
    {
        var data = e.data;
        switch (data.type)
        {
        case demo.AppConstants.SUBSCRIBE:
            console.log(demo.AppConstants.ID + ': recived subscription:\n', e.data);
            iframes[numFrames] = new Object();
            iframes[numFrames].name = data.origin;
            iframes[numFrames].node = document.getElementById(data.origin);
            iframes[numFrames].subs = data.body
            numFrames++;
            break;
        case demo.AppConstants.REMOVED:
            removeFrame(data);
            break;
        case demo.AppConstants.DATA:
            for (i = 0; i < numFrames; i++)
            {
                if (iframes[i].name != data.origin)
                {
                    var len = iframes[i].subs.length;
                    for (n = 0; n < len; n++)
                    {
                        if (iframes[i].subs[n] == data.notification)
                        {
                            if (i != 0)
                            {
                                iframes[i].node.contentWindow.postMessage(data, "*");
                            }
                            else
                            {
                                handlePost(context, data);
                            }
                        }
                    }
                }
            }
            break;
        }
    }, false);
}
