
// arduino ethernet with powerswitch tail talking to Xively channel
// user: incrediblemachines
// device: IM Holiday Tree
/*

this code pings the "ethernet_reset" reset channel from Xively feed #47298890
looks for a value OTHER than 0.0 -- when this is found, powerswitch tails are
turned off for 10 seconds. datastream is then updated again with 0.0

supports 2 powerswitch tails, pins 8 and 14.

*/

#include <SPI.h>
#include <Ethernet.h>
#include <HttpClient.h>
#include <Xively.h>

#define TREERESETPIN1 8
#define TREERESETPIN2 14

// MAC address for your Ethernet shield
byte mac[] = { 
  0x90, 0xA2, 0xDA, 0x0D, 0x26, 0xFA };

// Your Xively key to let you upload data
char xivelyKey[] = "aGXd377tC8XmbB3XJxVgMoh2zdl9lTV10L0hfbkOnxNzuKaa";

// Define the string for our datastream ID
char resetStream[] = "ethernet_reset";

int currentResetVal = 0;

XivelyDatastream datastreams[] = {
  XivelyDatastream(resetStream, strlen(resetStream), DATASTREAM_FLOAT),
};
// Finally, wrap the datastreams into a feed
XivelyFeed feed(47298890, datastreams, 1 /* number of datastreams */);

EthernetClient client;
XivelyClient xivelyclient(client);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(57600);

  Serial.println("Reading from Xively example");
  Serial.println();

  pinMode( TREERESETPIN1, OUTPUT);
  pinMode( TREERESETPIN2, OUTPUT );
  digitalWrite( TREERESETPIN1, HIGH );
  digitalWrite( TREERESETPIN2, HIGH );

  while (Ethernet.begin(mac) != 1)
  {
    Serial.println("Error getting IP address via DHCP, trying again...");
    delay(15000);
  }
}

void loop() {
  int ret = xivelyclient.get(feed, xivelyKey);
  Serial.print("xivelyclient.get returned ");
  Serial.println(ret);

  if (ret > 0)
  {
    Serial.println("Datastream is...");
    Serial.println(feed[0]);

    Serial.print("Reset value is: ");
    currentResetVal = feed[0].getFloat();
    Serial.println(currentResetVal);

    if(currentResetVal != 0){
      resetTree(); 
    }
  }

  Serial.println();
  delay(15000UL); //only pull from xively every 15 seconds
}

void resetTree(){
  Serial.println("\n-- TREE OFF NOW --");
  digitalWrite( TREERESETPIN1, LOW );
  digitalWrite( TREERESETPIN2, LOW );
  delay(10000);
  digitalWrite( TREERESETPIN1, HIGH );
  digitalWrite( TREERESETPIN2, HIGH );
  Serial.println("-- TREE BACK ON --\n");

  //change datastream back to 0
  datastreams[0].setFloat(0);

  Serial.println("Uploading it to Xively");
  int ret = xivelyclient.put(feed, xivelyKey);
  Serial.print("xivelyclient.put returned ");
  Serial.println(ret);

  while(ret != 200){
    ret = xivelyclient.put(feed, xivelyKey);
    Serial.print("xivelyclient.put returned ");
    Serial.println(ret);
    delay(10000);
  }
}




