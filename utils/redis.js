import { createClient } from 'redis';

// Función para crear y devolver una conexión al cliente Redis
const cache = createClient({
  password: process.env.NEXT_REDIS_PASSWORD,
  socket: {
    host: process.env.NEXT_REDIS_HOST,
    port: process.env.NEXT_REDIS_PORT
  }
});

cache.on('error', (err) => {
  console.log("Error " + err);
})

if (!cache.isOpen) {
  cache.connect()
}

export { cache }