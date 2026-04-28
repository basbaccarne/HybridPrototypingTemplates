// BLE receiver (central): connects and prints incoming float values

#include <ArduinoBLE.h>

const char* serviceUuid = "95ff7bf8-aa6f-4671-82d9-22a8931c5387";
const char* charUuid = "95ff7bf8-aa6f-4671-82d9-22a8931c5388";

void setup() {
  Serial.begin(9600);

  if (!BLE.begin()) {
    Serial.println("Starting BLE failed!");
    while (1);
  }

  BLE.scanForUuid(serviceUuid);
  Serial.println("Scanning...");
}

void loop() {
  BLEDevice peripheral = BLE.available();

  if (peripheral) {
    Serial.print("Found: ");
    Serial.println(peripheral.localName());
    BLE.stopScan();

    if (peripheral.connect()) {
      Serial.println("Connected");

      if (peripheral.discoverAttributes()) {
        BLECharacteristic characteristic = peripheral.characteristic(charUuid);

        if (characteristic && characteristic.subscribe()) {
          while (peripheral.connected()) {
            if (characteristic.valueUpdated()) {
              float value;
              characteristic.readValue(&value, sizeof(value));
              Serial.print("Received: ");
              Serial.println(value);
            }
          }
        }
      }

      Serial.println("Disconnected");
    }

    BLE.scanForUuid(serviceUuid);
  }
}
