# Getting the XIAO mini ESP32 C3 to work
**Adding boards**   

Add the following links in File > Settings > Additional board manager URLs
```
https://files.seeedstudio.com/arduino/package_seeeduino_boards_index.json
https://raw.githubusercontent.com/damellis/attiny/ide-1.6.x-boards-manager/package_damellis_attiny_index.json
https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_dev_index.json
https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
https://www.pjrc.com/teensy/package_teensy_index.json
```
This also adds the links voor teensy should you even want to use these.   

The C3 has no built in led, to test with hello world:
```
void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println("Hello world!");
  delay(1000);                      
}
```
