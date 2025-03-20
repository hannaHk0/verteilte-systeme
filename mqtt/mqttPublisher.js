import mqtt from 'mqtt';

// Verbinden mit Broker
const client = mqtt.connect('wss://mqtt.zimolong.eu', {
 
  username: 'dhbw',
  password: 'dhbw'
});

client.on('connect', () => {
  console.log('MQTT Publisher verbunden');
});
client.on('error', (err) => {
    console.error('MQTT Fehler:', err);
  });

export function publishMessage(topic, message) {
  
  client.publish(topic, message, (err) => {
    if (err) {
      console.error('Fehler beim Veröffentlichen:', err);
    } else {
      console.log(`Nachricht an Topic ${topic} veröffentlicht: ${message}`);
    }
  });
}

