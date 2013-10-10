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
