# Audio and video on Raspberry Pi
## Audio
General:
* Defaults to HDMI audio (requires a monitor with speakers)
* Newer Raspi's don't have a jack connection for audio and perfer digital audio (e.g. USB devices)   

There are several players for Raspi:   

* **OMXPlayer**
(Depricated but still a good) lighweight player for older Raspberry Pi models (Pi 1–4)
Processing is done by the GPU core (saving CPU power).
Usage (-o sets the output of the audio e.g. local HDMI, ...):
```omxplayer -o local myvideo.mp4```
* **mpv** 
Recommended from raspi 4 and beyond.
Use ```mpv --hwdec=auto video.mp4``` to uses GPU, if supported.
* **gstreamer**
* **ffplay / ffmpeg** 

General sound settings are managed by the **alsamixer**
* Open it manually with ```alsamixer```
* You can also manipulate the volume in the execution command; e.g. ```omxplayer -o hdmi --vol 500 myvideo.mp4``` (vol = millibels, from -4000 to 500, 0 being 'normal')


