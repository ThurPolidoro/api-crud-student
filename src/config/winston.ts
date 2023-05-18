import winston from 'winston'


// configuração de log para o modo produção
const transports = {
  console: new winston.transports.Stream({
    stream: process.stdout,
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.json(),
    ),
  }),
}

const logger = winston.createLogger({
  level: 'debug',
  transports: [transports.console],
  defaultMeta: {
    appName: process.env.APP_NAME,
    version: process.env.VERSION || 'DEV',
  },
})

// configuração de log para o modo de desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  transports.console.level = 'debug';
  transports.console.format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize({ all: true }),
    winston.format.simple(),
  );
}

export default logger;
