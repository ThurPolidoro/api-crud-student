import { app } from './config/app'
import { env } from './config/env'

app.listen({
    host: '0.0.0.0',
    port: env.PORT,
})
.then(() => {
    console.log("[SUCESSO] Servidor HTTP Iniciado!");
});
