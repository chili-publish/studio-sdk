# STUDIO-SDK GUIDELINES

This README includes guides about SDK development.

## General Structure

SDK consist of controllers which are individual Javascript classes and methods of these classes.
Currently there are 6 different controllers:

-   AnimationController
-   FrameController
-   LayoutsController
-   UtilsController
-   SubscriberController
-   DocumentController

These controllers have their own methods within them.SubscriberController's methods are methods of children(Flutter-Editor).These methods required by flutter and without these methods you can't initialize SDK.

## Naming a new method

A method can be a getter,setter,listener or custom type.
If a method is for getting some properties from another source,if its a getter method, the name of the method must be start with "get".For example name of a method for getting latest state from flutter must be written like this:
`getLatestState`
If its a set method we must use "set" at the beginning of the method.For example name of a method for setting a frame's height property must be written like this:
`setFrameHeight`
If its a listener method,It must start with "on" and end with "changed".
For example for listening state changes at flutter level we should name our method like this:
`onStateChanged`
If a method requires different names from these names,It must be descriptive.For example method for playing an animation can be named :
`playAnimation`

### Adding a new controller

When a new controller required, a new controller must be added to src/controllers folder. Name of the file must be descriptive.The new controller must be initialized at index.ts file so that this controller and its methods will be available from the SDK.
After new controller created and initialized at index.ts file,test cases of this new controller and its methods must be added too.
