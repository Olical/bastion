import winston from 'winston'

const log = new (winston.Logger)({
  level: process.env.BASTION_LOG_LEVEL || 'info',
  transports: [
    new (winston.transports.Console)({
      prettyPrint: true,
      colorize: true,
      timestamp: true
    })
  ]
})

export default log
