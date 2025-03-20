import mqtt from 'mqtt';


const client = mqtt.connect('wss://mqtt.zimolong.eu', {
  username: 'dhbw',
  password: 'dhbw'
});

client.on('connect', () => {
  console.log('MQTT Subscriber verbunden');
  
  client.subscribe('WWI23B3_Huber/#', (err) => {
    if (err) {
      console.error('Fehler beim Abonnieren des Topics:', err);
    } else {
      console.log('Erfolgreich abonniert: WWI23B3_Huber/#');
    }
  });
});


client.on('message', (topic, message) => {
 
  const msg = message.toString();
  console.log(`Neue Nachricht auf ${topic}: ${msg}`);
});
