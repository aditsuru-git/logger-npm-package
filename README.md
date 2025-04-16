<a id="readme-top"></a>

<div align="center">
  <p align="center">
    <img src="https://github.com/aditsuru-git/logger-npm-package/blob/main/icons/icon.png?raw=true" alt="Logo" width="80" height="80">
    <h3 align="center">Node Logger</h3>
    <p align="center">
      <a href="https://github.com/aditsuru-git/logger-npm-package">View Demo</a>
      ·
      <a href="https://github.com/aditsuru-git/logger-npm-package/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
      ·
      <a href="https://github.com/aditsuru-git/logger-npm-package/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
    </p>
  </p>
</div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![License][license-shield]][license-url]

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About

<div align="center">
  <img src="https://github.com/aditsuru-git/logger-npm-package/blob/main/icons/demo.png?raw=true" alt="Product Screenshot" width="100%" style="max-width: 800px;">
</div>

A lightweight, colorful console logger for Node.js with support for error stacks, metadata, and customizable log levels.

## Getting Started

To get started with the logger, follow these simple steps:

## Installation

```sh
npm install @aditsuru/logger
```

## Usage

### Basic Usage

```javascript
import { logger } from "@aditsuru/logger";
// Or using CommonJS
// const { logger } = require('@aditsuru/logger');

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

### Log Levels

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

### Custom Logger Instance

You can create a custom logger instance with a specific log level:

```javascript
import { Logger } from "@aditsuru/logger";

const customLogger = new Logger("info");
```

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<h1></h1>

<div align="center">
  <img src="https://ik.imagekit.io/aditsuru/Personal/footer.png?updatedAt=1744794750533" alt="Footer Banner" width="100%" style="max-width: 1200px;">
</div>

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/aditsuru-git/logger-npm-package.svg?style=for-the-badge
[contributors-url]: https://github.com/aditsuru-git/logger-npm-package/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/aditsuru-git/logger-npm-package.svg?style=for-the-badge
[forks-url]: https://github.com/aditsuru-git/logger-npm-package/network/members
[stars-shield]: https://img.shields.io/github/stars/aditsuru-git/logger-npm-package.svg?style=for-the-badge
[stars-url]: https://github.com/aditsuru-git/logger-npm-package/stargazers
[issues-shield]: https://img.shields.io/github/issues/aditsuru-git/logger-npm-package.svg?style=for-the-badge
[issues-url]: https://github.com/aditsuru-git/logger-npm-package/issues
[license-shield]: https://img.shields.io/github/license/aditsuru-git/logger-npm-package.svg?style=for-the-badge
[license-url]: https://github.com/aditsuru-git/logger-npm-package/blob/master/LICENSE.txt
