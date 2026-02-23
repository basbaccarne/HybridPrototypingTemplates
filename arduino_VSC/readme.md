# Arduino in Visual Studio Code

Working with Arduino in VSC can be a bit hard to work with.   
VSC is basically a wrapper around the Arduino CLI (a command line version of the well-known Arduino IDE).   

What you'll need:   

* Install or update the **Arduino CLI**.
    * On windows, the easiest way is to use [Chocolatey](https://community.chocolatey.org/)
    * Chocotaley is installed with node.js if you checked the box to install all the extra's.
    * To check if you have Chocolatey installed: ```choco -v```
    * Next, open cmd as admin and run `choco install arduino-cli` or `choco upgrade arduino-cli`
    * In the VSC terminal: check using `arduino-cli version`
    * Install the extension called `PlatformIO IDE` by `PlatformIO` (this can take a while - don't close vsc)

* Install or update the right **boards**. 
    * This is easiest to manage in the Arduino IDE ([read more](https://docs.arduino.cc/software/ide-v2/tutorials/ide-v2-board-manager/))
    * Check installed and available boards using `arduino-cli core list` in the vsc terminal.

* Install or update **libraries**.
    * This is easiest to manage in the Arduino IDE ([read more](https://docs.arduino.cc/software/ide-v2/tutorials/ide-v2-installing-a-library/))
    * See a list of installed libraties using `arduino-cli lib list`

* **Compile** the code by defining the right board.
    * Search for the name of your board (e.g. a firebeelte board) using `arduino-cli board listall | findstr firebeetle`
    * Then you can compile your code for that board (copy the name of the right board)
    * e.g. `arduino-cli compile --fqbn esp32:esp32:firebeetle32 sketch.ino`
    * `--fqbn`stands for 'Fully Qualified Board Name'

* **Upload** the code.
    * Show connected devices with `arduino-cli board list`   
    * Identify the right port
    * To upload the code, use `arduino-cli upload` + define port (-p COM11), board (--fqbn esp32:esp32:firebeetle32) and sketch (sketch.ino)
    * e.g. `arduino-cli upload -p COM11 --fqbn esp32:esp32:firebeetle32 sketch.ino`
