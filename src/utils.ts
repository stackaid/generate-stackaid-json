import minimatch from 'minimatch'
import { FileTypes } from './constants'

export const matches = (file: string, fileTypes: string[], glob: string = '') =>
  minimatch(file.toLowerCase(), `${glob}*(${fileTypes.join('|')})`)

export const isFileType = (
  filename: string,
  fileType: typeof FileTypes[keyof typeof FileTypes]
) => matches(filename, fileType, '**/')
