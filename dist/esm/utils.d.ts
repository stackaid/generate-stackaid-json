import { Ecosystem, FileTypes } from './constants.js';
export declare const matches: (file: string, fileTypes: string[], glob?: string) => boolean;
export declare const isFileType: (filename: string, fileType: (typeof FileTypes)[Ecosystem]) => boolean;
