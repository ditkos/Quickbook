import { createClient } from 'redis';

// Función para crear y devolver una conexión al cliente Redis
const cache = createClient({
  password: 'ZnugXEytcyYnpvwqjOcoVWb1yI0XF71j',
  socket: {
    host: 'redis-12695.c8.us-east-1-3.ec2.cloud.redislabs.com',
    port: 12695
  }
});

cache.on('error', (err) => {
  console.log("Error " + err);
})

if (!cache.isOpen) {
  cache.connect()
}

export { cache }