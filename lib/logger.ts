/**
 * Winston Logger Configuration
 * Replaces console.log with structured logging
 */

import winston from 'winston';
import path from 'path';

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

// Add colors to winston
winston.addColors(colors);

// Define log format
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Define console format for development
const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// Define transports
const transports = [
  // Console transport (always active)
  new winston.transports.Console({
    format: process.env.NODE_ENV === 'production' ? format : consoleFormat,
  }),
];

// Add file transports in production (server-side only)
// Check if we're in a Node.js environment (not browser)
if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
  transports.push(
    // Error log file
    new winston.transports.File({
      filename: path.join(process.cwd(), 'logs', 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Combined log file
    new winston.transports.File({
      filename: path.join(process.cwd(), 'logs', 'combined.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  );
}

// Create logger instance
export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  levels,
  format,
  transports,
  // Don't exit on uncaught exceptions (let Next.js handle it)
  exitOnError: false,
});

// Stream for HTTP request logging (can be used with Morgan)
export const stream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

// Helper functions for common logging patterns
export const logError = (message: string, error?: Error | unknown, meta?: object) => {
  const errorData = error instanceof Error ? {
    message: error.message,
    stack: error.stack,
    ...meta,
  } : { error, ...meta };

  logger.error(message, errorData);
};

export const logInfo = (message: string, meta?: object) => {
  logger.info(message, meta);
};

export const logWarn = (message: string, meta?: object) => {
  logger.warn(message, meta);
};

export const logDebug = (message: string, meta?: object) => {
  logger.debug(message, meta);
};

// API request logger
export const logApiRequest = (
  method: string,
  path: string,
  statusCode: number,
  duration: number,
  meta?: object
) => {
  logger.http('API Request', {
    method,
    path,
    statusCode,
    duration,
    ...meta,
  });
};

// Database query logger
export const logDbQuery = (
  query: string,
  duration: number,
  meta?: object
) => {
  logger.debug('Database Query', {
    query,
    duration,
    ...meta,
  });
};

// Default export
export default logger;
