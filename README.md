# Lightweight Simple Logger

A lightweight, colorful console logger for Node.js with support for error stacks, metadata, and customizable log levels.

## Installation

```sh
npm install @adi/logger
```

## Usage

### Basic Usage

```javascript
import { logger } from "@adi/logger";
// Or using CommonJS
// const { logger } = require('@adi/logger');

// Simple logging
logger.info("Application started");
logger.warn("Cache miss");
logger.error("Database connection failed");
logger.debug("Request payload:", { id: 123 });
```

### Logging Errors

```javascript
try {
  throw new Error("Something went wrong");
} catch (error) {
  // Automatically formats error stack
  logger.error(error);

  // With additional metadata
  logger.error(error, { userId: 123, requestId: "abc-123" });
}
```

### Logging with Metadata

```javascript
// Single metadata object
logger.info("User logged in", {
  userId: 123,
  role: "admin",
});

// Multiple metadata objects
logger.debug("Processing request", { method: "GET" }, { path: "/api/users" });
```

## Log Levels

Configure the logging level by setting the `LOG_LEVEL` environment variable:

```sh
LOG_LEVEL=debug
```

The module automatically detects this environment variable when using the default logger instance.

Available levels (in order of verbosity):

| Level | Description                 |
| ----- | --------------------------- |
| error | Only errors (least verbose) |
| warn  | Errors and warnings         |
| info  | Errors, warnings, and info  |
| debug | All messages (most verbose) |

If not specified, the default level is `debug`.

## Custom Logger Instance

You can create a custom logger instance with a specific log level:

```javascript
import { Logger } from "@adi/logger";

const customLogger = new Logger("info");
```

## License

MIT
