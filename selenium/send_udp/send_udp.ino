/*
This code reads analog data from pin A0 and sends it via UDP to a specified IP
address and port. server.js is a node.js server that listens for incoming UDP
packets and sends the data to protopie connect using Selenium.
*/

// Libraries
#include <WiFi.h>

#include "config.h"

void setup() {
  Serial.begin(9600);

  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.print("Establishing connection to WiFi..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(1000);
  }
  Serial.println("\nConnected to network");
}

void loop() {
  // Read analog data from pin A0
  int sensorValue = analogRead(A0);
  Serial.print("sensor||");
  Serial.println(sensorValue);
  delay(100);
}
