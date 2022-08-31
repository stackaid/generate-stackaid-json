import minimatch from 'minimatch'

export const matches = (file: string, fileTypes: string[], glob: string = '') =>
  minimatch(file.toLowerCase(), `${glob}*(${fileTypes.join('|')})`)
