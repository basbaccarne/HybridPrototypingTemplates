// BLE sender (peripheral): broadcasts a random float every second

#include <ArduinoBLE.h>

BLEService signalService("95ff7bf8-aa6f-4671-82d9-22a8931c5387");
BLEFloatCharacteristic signalChar("95ff7bf8-aa6f-4671-82d9-22a8931c5388",
                                  BLERead | BLENotify);

bool wasConnected = false;
unsigned long lastSent = 0;

void setup() {
  Serial.begin(9600);
  randomSeed(analogRead(0));

  if (!BLE.begin()) {
    Serial.println("Starting BLE failed!");
    while (1);
  }

  BLE.setLocalName("Nano Signal Sender");
  BLE.setAdvertisedService(signalService);
  signalService.addCharacteristic(signalChar);
  BLE.addService(signalService);
  signalChar.writeValue(0.0);
  BLE.advertise();

  Serial.println("Advertising...");
}

void loop() {
  BLEDevice central = BLE.central();

  if (central && central.connected()) {
    wasConnected = true;
    if (millis() - lastSent >= 1000) {
      lastSent = millis();
      float value = random(0, 10000) / 100.0;  // random float 0.00 - 99.99
      signalChar.writeValue(value);
      Serial.print("Sent: ");
      Serial.println(value);
    }
  } else if (wasConnected) {
    Serial.println("Disconnected");
    wasConnected = false;
  }

  BLE.poll();
}
