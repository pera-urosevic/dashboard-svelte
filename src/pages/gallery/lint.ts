import type { PhotoRecord } from '@pages/gallery/types'
import { caseTitle } from '@services/text'
import dayjs from 'dayjs'

const safeChars = (test: string) => {
  return test.match(/^[0-9a-zA-Z ',-]+$/)
}

const lowercase = (test: string) => {
  return test === test.toLowerCase()
}

const needsTrim = (test: string) => {
  return test.startsWith(' ') || test.endsWith(' ')
}

export const lintTitle = (title: string) => {
  if (!title) return 'Title is required'
  if (!safeChars(title)) return 'Title contains invalid characters'
  if (lowercase(title)) return 'Title is lowercase'
  if (needsTrim(title)) return 'Title contains extra space(s)'
}

export const lintDescription = (description: string, title: string) => {
  if (!description) return 'Description is required'
  if (!lowercase(description)) return 'Description is not lowercase'
  if (needsTrim(description)) return 'Description contains extra space(s)'
  if (description.toLowerCase() === title.toLowerCase()) return 'Description needs to be different than title'
}

export const lintKeywords = (keywords: string) => {
  if (!keywords) return 'Keywords are required'
  const keywordsList = keywords.split(' | ')
  if (keywordsList.length < 3) return 'Keywords must have at least 3 items'
  for (const keyword of keywordsList) {
    if (!safeChars(keyword)) return 'Keywords contains invalid characters'
    if (needsTrim(keyword)) return 'Keywords contains extra space(s)'
  }
}

export const lintDatetime = (datetime: string) => {
  if (!datetime) return 'Datetime is required'
  if (!datetime.match(/^[0-9]{14}$/)) return 'Datetime is malformed'
}

export const lintCopyright = (copyright: string) => {
  if (!copyright) return 'Copyright is required'
  if (!copyright.match(/^Copyright [0-9]{4} Pera Urosevic, all rights reserved.$/)) return 'Copyright is malformed'
}

export const lint = (record: PhotoRecord) => {
  const errors = {
    title: lintTitle(record.title ?? ''),
    description: lintDescription(record.description ?? '', record.title ?? ''),
    keywords: lintKeywords(record.keywords ?? ''),
    datetime: lintDatetime(record.datetime),
    copyright: lintCopyright(record.copyright ?? ''),
  }
  return errors
}

export const isValid = (record: PhotoRecord) => {
  if (lintTitle(record.title ?? '')) return false
  if (lintDescription(record.description ?? '', record.title ?? '')) return false
  if (lintKeywords(record.keywords ?? '')) return false
  if (lintDatetime(record.datetime)) return false
  if (lintCopyright(record.copyright ?? '')) return false
  return true
}

export const fixTitle = (record: PhotoRecord) => {
  record.title = caseTitle(record.title).trim()
  return record
}

export const fixDescription = (record: PhotoRecord) => {
  record.description = record.description.toLowerCase().trim()
  return record
}

export const fixKeywords = (record: PhotoRecord) => {
  record.keywords = record.keywords.toLowerCase().trim()
  record.keywords = record.keywords.split('|').map(keyword => keyword.trim()).join(' | ')
  return record
}

export const fixDatetime = (record: PhotoRecord) => {
  if (record.datetime) return record
  record.datetime = dayjs().format('YYYYMMDDHHmmss')
  return record
}

export const fixCopyright = (record: PhotoRecord) => {
  record.copyright = `Copyright ${record.datetime.slice(0, 4)} Pera Urosevic, all rights reserved.`
  return record
}

