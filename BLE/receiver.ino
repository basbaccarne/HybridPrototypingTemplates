// BLE receiver (central): connects and prints incoming float values

#include <ArduinoBLE.h>

const char* targetName = "Nano Signal Sender";
const char* charUuid = "95ff7bf8-aa6f-4671-82d9-22a8931c5388";

void setup() {
  Serial.begin(9600);

  if (!BLE.begin()) {
    Serial.println("Starting BLE failed!");
    while (1);
  }

  BLE.scan();  // scan all, filter by name in code
  Serial.println("Scanning...");
}

void loop() {
  BLE.poll();

  BLEDevice peripheral = BLE.available();

  if (peripheral) {
    Serial.print("Found: ");
    Serial.print(peripheral.localName());
    Serial.print(" (");
    Serial.print(peripheral.address());
    Serial.println(")");

    if (peripheral.localName() != targetName) return;  // skip non-targets

    BLE.stopScan();

    if (peripheral.connect()) {
      Serial.println("Connected");

      if (peripheral.discoverAttributes()) {
        BLECharacteristic characteristic = peripheral.characteristic(charUuid);

        if (characteristic && characteristic.subscribe()) {
          while (peripheral.connected()) {
            BLE.poll();
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

    BLE.scan();  // restart scan after disconnect
  }
}
