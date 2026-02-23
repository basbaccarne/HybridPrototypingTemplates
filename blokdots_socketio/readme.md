# Integrating blokdots in socket.io
Blokdots allows you easy access to componentes if you're working with one of the [supported microcontrollers](https://blokdots.com/documentation/hardware/). Especially the pro version has a lot of features that are very usefull for hybrid prototyping. You can [apply for an educational discount](https://blokdots.com/documentation/pro/#educational-discount) or ask a key to Bas. 

([see full documentation](https://blokdots.com/documentation/components/integrations/socketio))   

**Specifications**
* Blokdots runs Socket.IO v4, but clients with a minimum of v2 should work.
* Only websocket transport is supported.
* The integration sets up a Socket.IO server you can connect with.
* This runs on `http://localhost:8777`

**Message Protocol**
* the first argument of the message should always be `blokdots`
* The second parameter in the message is an object with two parameters `msg` and `val`.
* See [simple node.js example](example.js) that sends count + value every second and prints things it received from blokdots.

**p5 examples**
* [See this repo](https://editor.p5js.org/olivierbrcknr/collections/FqyDil60k)

**Vibecoding in Figma & Figma Make**
1. Step 1: design   

    * Design the app interface in Figma (buttons, layout, content, etc.)
    * Import the Figma frame into Figma Make

2. Step 2: prompt that includes the technical parameters   

    *  Right click the frame you designed > send to Figma Make   

    * Example prompt
        ```
        Implement a Socket.IO client on this existing design without modifying
        any visual elements, layout, animations, or styling. Preserve all Figma
        components exactly as designed.

        Socket.IO connection details:

        * Server: http://localhost:8777/blokdots
        * Transport: websocket only
        * Protocol: Socket.IO v4 (v2+ compatible)
        * Auto-connect on load

        Message protocol: 
        * emit with first argument 'blokdots' and second argument 
          { msg: 'clicked', val: true } when the button is clicked.
        * Wire up only the interaction logic — keep all existing 
          component props, CSS, animations, and structure untouched.

          Ensure all code is wired into App.tsx as the entry point. Do 
          not create orphaned utility files — all Socket.IO logic 
          should be imported and active within the main rendered 
          component tree so the UI is visible on load.
        ```
3. Step 3: Refine
    * Add design requirements in Settings > Adjust guidelines > them prompt: “check against guidelines”
    * Use click and describe for edits
