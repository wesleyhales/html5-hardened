//Array of frames, includes the parent.
var iframes = new Array(5);
//number of frames
var numFrames = 0;

/** DEVELOPER IMPLMENTED
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

/**
 * An Iframe obejct
 * @param origin: the name of the sending frame
 * @param subscriptions: the list of notification types to be notifed for
 */
function Iframe(origin, subscriptions)
{
    this.name = origin;
    this.node = document.getElementById(this.name);
    this.subs = subscriptions;
}

/**
 * A subscriber object 
 * @parm body: the list of subscriptions
 */
function Subscriber(body)
{
    this.type = demo.AppConstants.SUBSCRIBE;
    this.origin = demo.AppConstants.ID;
    this.body = body;
}

/**
 * A Messenger object
 * @parm: body: the body of the message
 * @parm: notifcation: the type of body
 */
function Messenger(body, notification)
{
    this.type = demo.AppConstants.DATA;
    this.origin = demo.AppConstants.ID;
    this.body = body;
    this.notification = notification;
}

/**
 * A Remover object
 * @param id: the id of the frame to be removed
 */
function Remover(id)
{
    this.type = demo.AppConstants.REMOVED;
    this.origin = id;
}

/**
 * Sends a notification with the list of notifications you want to be notifed for.
 * @param subsriptionList: A comma seperated list of notifcation types to subscribe to
 */
function subscribe(subsriptionList)
{
    var list = subsriptionList.split(',');
    var data = new Subscriber(list);
    window.top.postMessage(data, "*");
}

/**
 * Removes the frame from the list of iframes.
 */
function remove(id)
{
    var data = new Remover(id);
    window.top.postMessage(data, "*");
}

/**
 * Adds this window to the list of frames to be notifed.
 * @param subsriptionList: A comma seperated list of notifcation types to subscribe to
 */
function addParent(subscriptionList)
{
    var subs = subscriptionList.split(',');
    var parent = new Iframe(demo.AppConstants.ID, subs);
    parent.node = this;
    iframes[numFrames] = parent;
    numFrames++;
}

/**
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
            console.log(demo.AppConstants.ID + ': recived subscription:\n', data);
            iframes[numFrames] = new Iframe(data.origin, data.body);
            numFrames++;
            break;
        case demo.AppConstants.REMOVED:
            removeFrame(data);
            break;
        case demo.AppConstants.DATA:
            notifyFrame(context, data);
            break;
        }
    }, false);
}

/**
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

/**
 * Uses the HTML5 post message api to send a notification to the parent window.
 * @param note: the data to be sent
 * @param notification: the type of notification, should correspond with a subscription
 */
function postMsg(note, notifcation)
{
    var data = new Messenger(note, notifcation);
    window.top.postMessage(data, "*");
    console.log(demo.AppConstants.ID + ': dispatched ' + data);
}

/**
 * Notifies the iframe that has subscribed to the notifcation type of data
 * @param data: the notifcation to be sent
 */
function notifyFrame(context,data)
{
    for (i = 0; i < numFrames; i++)
    {
        if (iframes[i].name != data.origin)
        {
            var len = iframes[i].subs.length;
            for (n = 0; n < len; n++)
            {
                if (iframes[i].subs[n] == data.notification)
                {
                    //check to see if notfication is for parent, its faster to handle here then with post message
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
}


/**
 * Removes the iframe from the dom and the array of frames.
 * @param a iframe object from the iframes[]
 */
function removeFrame(frame)
{
    console.log(demo.AppConstants.ID + ': removed:\n', frame.origin);
    var index = 0;
    for (var i = 0; i < numFrames; i++)
    {
        if (iframes[i].name == frame.origin)
        {
            index = i;
            break;
        }
    }
    var removed = iframes.splice(index, 1);
    var node = removed[0].node;
    node.parentNode.removeChild(node);
    numFrames--;
}

