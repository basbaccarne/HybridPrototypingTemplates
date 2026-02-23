# Integrating blokdots in socket.io
Blokdots allows you easy access to componentes if you're working with one of the [supported microcontrollers](https://blokdots.com/documentation/hardware/). Especially the pro version has a lot of features that are very usefull for hybrid prototyping. You can [apply for an educational discount](https://blokdots.com/documentation/pro/#educational-discount) or ask a key to Bas. 

([see full documentation](https://blokdots.com/documentation/components/integrations/socketio))   

**Specifications**
* Blokdots runs Socket.IO v4, but clients with a minimum of v2 should work.
* Only websocket transport is supported.
* The integration sets up a Socket.IO server you can connect with.

**Message Protocol**
* the first argument of the message should always be `blokdots`
* The second parameter in the message is an object with two parameters `msg` and `val`.
