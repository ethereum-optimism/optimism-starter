import { Buffer } from "buffer";
import process from "process";

/**
 * Polyfills necessary modules to use ethers.js
 */
window.global = window;
window.process = process;
window.Buffer = Buffer;
