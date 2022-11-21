import minimatch from 'minimatch'
import { Ecosystem, FileTypes } from './constants.js'

export const matches = (file: string, fileTypes: string[], glob: string = '') =>
  minimatch(file.toLowerCase(), `${glob}*(${fileTypes.join('|')})`)

export const isFileType = (
  filename: string,
  fileType: typeof FileTypes[Ecosystem]
) => matches(filename, fileType, '**/')
