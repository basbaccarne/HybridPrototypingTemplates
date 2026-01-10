### Setting up a Raspi headless 
(without needing a screen)

**UART (cabled)**
* After SD card install add the following to `config.txt`
    ```
    dtparam=uart0
    dtparam=uart0_console
    ``` 

* Connect the Pi using a TTL to USB cable or this handy [Adafruit PiUART - USB Console](https://www.adafruit.com/product/3589) (this also powers Pis, but power heavier pies, starting from Pi3 from an external power source, or you'll blow the USB port).   

    * Use a Serial monitor ([VSC](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-serial-monitor), Arduino, Coolterm, Putty, ...).
    * Select the correct USB interface and use baud rate `115200`.
    * Set line ending to `LF` (new line)
    * Start monitoring and you're good to go.

**SSH (same network)**
* In the Raspberry Pi Imager, you can also directly add WiFi credentials to connect the pi to a network.
* If you need to configure the network over UART, you can do it with this block of code (change SSID and password and enter in a single go using the serial messages):
    ```sh
    sudo bash -c 'cat >> /etc/wpa_supplicant/wpa_supplicant.conf <<EOF
    network={
    ssid="YourSSID"
    psk="YourPassword"
    }
    EOF
    wpa_cli -i wlan0 reconfigure'
    ```
* If connected to a local network, and SSH is enabled 
    * Enable SSH in Raspberry Pi Imager when installing
    * OR create an empty file named `ssh` (no extension) in the boot partition on the SD card.
    * OR, using the UART connection,
        * `sudo systemctl status ssh` checks the current SSH status
        * `sudo systemctl enable ssh` enables SSH but requires restart
        * `sudo systemctl start ssh` starts SSH right away
        

 * Getting access is easiest over terminal (CMD, Powershell, VSC, Terminal, ...)
    * Use the command `ssh pi@<IP_ADDRESS>` and enter your password when prompted.
    * Change `pi` to your username if you changed that
    * To get the the IP adress of the Pi: `hostname -I`

**Raspberry Pi Connect (any network)**
* Raspberry Pi also has a good support for remote management (both terminal and GUI!)
* You'll need an account first ([make it here](https://connect.raspberrypi.com/))
* This can be set up on install in the Raspberry Pi Imager
* This can be set up in the [GUI](https://www.raspberrypi.com/documentation/services/connect.html) (top right)
* This can be set up in the [terminal](https://www.raspberrypi.com/documentation/services/connect.html) 