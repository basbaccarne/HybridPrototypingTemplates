/*
This code reads analog data from pin A0 and sends it via UDP to a specified IP
address and port. server.js is a node.js server that listens for incoming UDP
packets and sends the data to protopie connect using Selenium.
*/

// Configuration (change to server IP for your project)
IPAddress server_ip(192, 168, 0, 206);

// Libraries
#include <WiFi.h>
#include <WiFiUdp.h>

#include "config.h"

// UDP setup
WiFiUDP udp;                  // instance of the UDP library
const int localPort = 8887;   // port on ESP32
const int remotePort = 8888;  // Node.js server port

void setup() {
  Serial.begin(9600);

  // Connect to WiFi
  delay(10);
  Serial.println("");
  WiFi.begin(ssid, password);
  Serial.print("\nConnecting to to WiFi network ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(2000);
  }
  Serial.println("\nConnected to network.");
  IPAddress ip = WiFi.localIP();
  Serial.print("The IP address of this device is  ");
  Serial.println(WiFi.localIP());
  Serial.println("");

  // Start UDP
  udp.begin(localPort);
}

void loop() {
  // Read analog data from pin A0
  int sensorValue = analogRead(A0);
  Serial.print("sensor:");
  Serial.println(sensorValue);
  sendUDPMessage("sensor:" + String(sensorValue));
  delay(50);
}

void sendUDPMessage(String message) {
  if (WiFi.status() == WL_CONNECTED) {
    udp.beginPacket(server_ip, remotePort);
    udp.print(message);
    udp.endPacket();
  } else {
    Serial.println("WiFi not connected, cannot send UDP.");
  }
}