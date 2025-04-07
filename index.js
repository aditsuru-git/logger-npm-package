import process from "process";
import { inspect } from "util";

const ANSI = {
  RESET: "\x1b[0m",
  BOLD: "\x1b[1m",
  FG: {
    BLACK: "\x1b[30m",
    WHITE: "\x1b[97m",
    BRIGHT_RED: "\x1b[91;1m",
    BRIGHT_YELLOW: "\x1b[93;1m",
    BRIGHT_CYAN: "\x1b[96;1m",
    BRIGHT_MAGENTA: "\x1b[95;1m",
    GRAY: "\x1b[90;1m",
  },
  BG: {
    BRIGHT_RED: "\x1b[101;1m",
    BRIGHT_YELLOW: "\x1b[103;1m",
    BRIGHT_CYAN: "\x1b[106;1m",
    BRIGHT_MAGENTA: "\x1b[105;1m",
  },
};

const levelStyles = {
  error: {
    label: " ERROR ",
    bgColor: ANSI.BG.BRIGHT_RED,
    fgColor: ANSI.FG.WHITE,
    msgColor: ANSI.FG.BRIGHT_RED,
    stackColor: ANSI.FG.GRAY,
  },
  warn: {
    label: " WARN ",
    bgColor: ANSI.BG.BRIGHT_YELLOW,
    fgColor: ANSI.FG.BLACK,
    msgColor: ANSI.FG.BRIGHT_YELLOW,
  },
  info: {
    label: " INFO ",
    bgColor: ANSI.BG.BRIGHT_CYAN,
    fgColor: ANSI.FG.BLACK,
    msgColor: ANSI.FG.BRIGHT_CYAN,
  },
  debug: {
    label: " DEBUG ",
    bgColor: ANSI.BG.BRIGHT_MAGENTA,
    fgColor: ANSI.FG.WHITE,
    msgColor: ANSI.FG.BRIGHT_MAGENTA,
  },
  default: {
    label: " LOG ",
    bgColor: "",
    fgColor: ANSI.FG.WHITE,
    msgColor: ANSI.FG.WHITE,
  },
};

class Logger {
  #logLevelInt;

  constructor(logLevel = "debug") {
    const levels = { error: 0, info: 1, warn: 2, debug: 3 };
    this.#logLevelInt = levels[logLevel?.toLowerCase()] ?? levels.debug;
  }

  #format(level, message, ...meta) {
    const style = levelStyles[level] || levelStyles.default;
    const levelTag = `${style.bgColor}${style.fgColor}${ANSI.BOLD}${style.label}${ANSI.RESET}`;

    let formattedMessage = this.#formatMessage(level, message, meta, style);
    let formattedMeta = this.#formatMeta(meta);

    try {
      process.stdout.write(`${levelTag} ${formattedMessage}${formattedMeta}\n`);
    } catch (writeError) {
      console.error("Logger failed to write to stdout:", writeError);
    }
  }

  #formatMessage(level, message, meta, style) {
    try {
      if (level === "error" && message instanceof Error) {
        if (meta.length === 0 && Object.keys(message).length > 0) {
          const { message: msg, stack, ...errorProps } = message;
          meta.push(errorProps);
        }
        return `${style.msgColor}${message.message}${ANSI.RESET}\n  ${
          style.stackColor
        }${message.stack.split("\n").slice(1).join("\n  ")}${ANSI.RESET}`;
      }
      return typeof message === "string"
        ? `${style.msgColor}${message}${ANSI.RESET}`
        : inspect(message, { depth: 3, colors: true, breakLength: 80 });
    } catch (e) {
      return `${style.msgColor}[Could not format message: ${e.message}]${ANSI.RESET}`;
    }
  }

  #formatMeta(meta) {
    if (!meta.length) return "";
    try {
      const inspectOptions = {
        depth: null,
        colors: true,
        breakLength: process.stdout.columns || 80,
      };
      const inspectedMeta =
        meta.length === 1
          ? inspect(meta[0], inspectOptions)
          : inspect(meta, inspectOptions);
      return (
        "\n" +
        inspectedMeta
          .split("\n")
          .map((line) => `  ${line}`)
          .join("\n")
      );
    } catch (e) {
      return `\n  [Could not format metadata: ${e.message}]`;
    }
  }

  #log(level, message, ...meta) {
    this.#format(level, message, ...meta);
  }

  error(errOrMessage, ...args) {
    this.#log("error", errOrMessage, ...args);
  }

  info(message, ...args) {
    if (this.#logLevelInt >= 1) this.#log("info", message, ...args);
  }

  warn(message, ...args) {
    if (this.#logLevelInt >= 2) this.#log("warn", message, ...args);
  }

  debug(message, ...args) {
    if (this.#logLevelInt >= 3) this.#log("debug", message, ...args);
  }
}

export { Logger };
export const logger = new Logger(process.env.LOG_LEVEL);
