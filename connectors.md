# Connecting cables in a clean way
Life can be so much more beautifyl when you have clean, well-organized and sturdy cable connections. Here are some tips to achieve that:

**color coding**
* <font color="red">red</font> = power (highest voltage, e.g. 5V)
* <font color="orange">orange</font> = power (lower voltage, e.g. 3.3V)
* <font color="black">black</font> = ground (always connect all grounds to avoid floating grounds and noise)
* <font color="orange">yellow</font>, <font color="grey">white</font>, <font color="green">green</font>, <font color="blue">blue</font> = signals (use different colors for different signals to easily identify them, and label the cables if needed)
* UART usually uses <font color="orange">yellow</font> for TX and <font color="green">green</font> for RX
* I²C usually uses <font color="grey">white</font> for SDA and <font color="blue">blue</font> for SCL
* Buttons and switches can use any color, but try to be consistent

**cable management**
* use cable ties, velcro straps, or cable clips to bundle and secure cables together
* avoid crossing cables over each other, especially power and signal cables, to reduce interference
* keep cables away from heat sources or moving parts
* use cable sleeves to protect cables from abrasion and to give a neat appearance

**connectors**
There are different types of connectors you can use to make your connections more reliable and easier to disconnect if needed. 
Three things define a connector: 
1. the pitch (the distance between the pins or holes), 
2. the pin count (amount of pins or holes), and 
3. the enclosure type (snap fit, orientation groove, ...). 

Some common types are:

* **Dupont connectors**: These are simple and cheap connectors that can be used for breadboard connections or for prototyping (pitch: 2.54 mm or 0.1 inch). Handy for testing circuits, but come loose easily.

<div align="center">
    <img src="/img/dupont.jpg" height="300">
</div>   

* **Servo motors**: These use a variation of the dupont connector, in an encosed plactic housing. This system is called JR/Futaba.

<div align="center">
    <img src="/img/futaba.jpg" height="300">
</div>   

* **JST (Japan Solderless Terminals) connectors**: These are small and compact connectors that are often used for battery connections, some arcade buttons or for small sensors. They often have a groove or a snap to ensure proper orientation and secure connection.This means you always need to combine a male and a female (no breadboard connection). JST connectors come in 3 variants and different pin counts:
    * ```JST PH``` (pitch: 2.0 mm) = most common, used for **battery connections** and small sensors
    * ```JST XH``` (pitch: 2.54 mm) = Dupont connectors with a snap. Very common for **stepper motors** (e.g. NEMA 17).
    * ```JST SH``` (pitch: 1.0 mm) = very small, used for tiny sensors and modules (used in the Sparkfun/Modulino **Qwiic system**)

<div align="center">
    <img src="/img/jst.png" height="300">
</div>   


* **Screw terminals** (also called terminal blocks): These are connectors that allow you to secure wires by tightening a screw. They are often used for power connections or for high-current applications. They can be a bit bulky, but they provide a very secure connection. They come in different pitches and sizes depending on the amount of power you need to connect. They are often soldered to a PCB or solderable breadboard, but you can also find them as standalone connectors. Pins come in various pitches.

<div align="center">
    <img src="/img/screwterminal.jpg" height="300">
</div>   

* **Header pins** or pin headers: These are connectors that consist of a row of pins that can be soldered to a PCB or used with a breadboard. They are often used for signal connections or for prototyping. They come in different sizes and pin counts, so choose the right one for your application. Both the male pins at the bottom of the arduino nano and the female rows on an arduino are header pins. You can use them to connect various pitches and connections in a fairly sturdy way. Perfect for modular and reusable prototypes.

<div align="center">
    <img src="/img/headerpin.jpg" height="300">
</div>   



