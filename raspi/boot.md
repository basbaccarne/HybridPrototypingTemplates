# Booting
If you have a Raspi dedicated to a specific task (in this example: *play a looping video file full screen*) there are serveral options to start scripts on boot (and restart if they fail)/
  
* [good extra resource](https://www.dexterindustries.com/howto/run-a-program-on-your-raspberry-pi-at-startup/)

These are your options
1. ```rc.local```: low level, simple, for lightwait startup scripts without GUI. Runs the script before all other services (oldschool, depricated - you might still find it in old tutorials but it's not worth retroreconfiguring this).
2.  ```.bashrc```: runs after login, starts only if a terminal session starts
3.  ```init.d```: well documented, Unix classic, good for background processes
4.  ```Systemd```: go to method in most cases. advanced error logging and allows GUI targetting
5.  ```Crontab```: simple, good for lightweight tasks and recurring tasks (sheduling), or e.g. clean shutdowns.   
   
``⚠️WARNING:  remember to never just cut the power from a raspberry pi``

## Systemd
* Create a new ```systemd``` service file:
  ()
  ```console
  sudo nano /etc/systemd/system/videoplayer.service
  ```

* Add the following code
 (change Restart=always to Restart=no if you want to work on the prototype)
  ```ini
  [Unit]
  Description=Autostart Video Player
  After=graphical.target
  Wants=graphical.target
  
  [Service]
  User=pi
  Group=pi
  Environment=DISPLAY=:0
  Type=idle
  ExecStart=/usr/bin/python3 /home/pi/videoplayer.py
  WorkingDirectory=/home/pi
  StandardOutput=file:/home/pi/Desktop/videoplayer.log
  StandardError=file:/home/pi/Desktop/videoplayer.log
  Restart=always
  RestartSec=5
  
  [Install]
  WantedBy=graphical.target
  ```
  
* enable this service:
  
  ```console
  sudo systemctl daemon-reload
  sudo systemctl enable videoplayer.service
  ```

* start this service to test it:
  
  ```console
  sudo systemctl start videoplayer.service
  ```

* to stop the service:
  ```console
  sudo systemctl disable videoplayer.service
  ```

* To monitor the logs
  ```console
  journalctl -u videoplayer.service --no-pager --reverse | less
  ```
  > status
  ```console
  sudo systemctl status videoplayer.service
  ```

## Disabling sleep
If the screen runs for a long time, the auto sleep function might cause the screen to blank.

* Edit the cmdline.txt file: sudo nano /boot/firmware/cmdline.txt.
* Add consoleblank=0 at the end of the line.

## Power management
You might want to set-up a cleaner way to shutdown and restart the pi, since just powering it down might damage the SD card over time.
* Option 1: add a shutdown script that shuts the pi down before the power is cut (check [crontabguru](https://crontab.guru/) for set-up)
  
  ```console
  sudo crontab -e
  ```

    e.g. shutdown at 23:00 every day (* = "every")
  ```
  0 23 * * * sudo shutdown -h now
  ```

    Manual
    ```
    # ┌───────────── minute (0 - 59)
    # │ ┌───────────── hour (0 - 23)
    # │ │ ┌───────────── day of month (1 - 31)
    # │ │ │ ┌───────────── month (1 - 12)
    # │ │ │ │ ┌───────────── day of week (0 - 6) (Sunday = 0 or 7)
    # │ │ │ │ │
    # │ │ │ │ │
    # * * * * *  command to execute
    ```

* Option 2: use a power management HAT such as the [Pimeroni OnOff SHIM](https://shop.pimoroni.com/products/onoff-shim?variant=41102600138)
