const { createLogger, format, transports } = require("winston");
const { combine, label, printf, timestamp } = format;

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} : [${label}] : ${level} : ${message}`;
});

const logger = createLogger({
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    label({ label: "right meow!" }),
    customFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "combined.log" }),
  ],
});

module.exports = logger;
