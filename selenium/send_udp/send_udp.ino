/*
This code reads analog data from pin A0 and sends it via UDP to a specified IP address and port.
server.js is a node.js server that listens for incoming UDP packets and sends the data to protopie connect using Selenium.
*/

//#include config.h


void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
  digitalWrite(LED_BUILTIN, HIGH);  // turn the LED on (HIGH is the voltage level)
  delay(1000);                      // wait for a second
  digitalWrite(LED_BUILTIN, LOW);   // turn the LED off by making the voltage LOW
  delay(1000);                      // wait for a second
}
