html5-hardened
==============

Examples of practices to harden HTML5

Iframe-sandbox-puremvc

A pure MVC proxy that enables cross iframe comunication. To use add a IframeMeidator to your parent and all iframes.

You are resonsible for:
* Defining the id in appConstants.js this must match the id you assign in HTML.
* Writing the handlePost method in IframeMediatorCommon 
* Writing the send method of each IframeMediator
