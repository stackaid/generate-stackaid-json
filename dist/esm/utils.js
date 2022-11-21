import minimatch from 'minimatch';
export const matches = (file, fileTypes, glob = '') => minimatch(file.toLowerCase(), `${glob}*(${fileTypes.join('|')})`);
export const isFileType = (filename, fileType) => matches(filename, fileType, '**/');
