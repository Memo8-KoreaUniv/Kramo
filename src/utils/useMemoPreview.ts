import _ from 'lodash'
import parse from 'node-html-parser'

const PREVIEW_TITLE_MAX_LENGTH = 25
const PREVIEW_DETAIL_MAX_LENGTH = 100

const cutTextByLength = (text: string, max: number) => {
  if (text.length > max) {
    return `${text.substring(0, max)}...`
  }
  return text
}

export const useMemoPreview = (text: string) => {
  const getMemoPreviewTitle = () => {
    const parsed = parse(text.split('\n')[0])
    if (parsed.text) return parsed.text
    return text.split('\n')[0]
  }

  const memoPreviewTitle = cutTextByLength(
    getMemoPreviewTitle(),
    PREVIEW_TITLE_MAX_LENGTH,
  )

  const getMemoPreviewDetail = () => {
    const texts = _.filter(text.split('\n'), (str) => {
      return !!str
    })
    if (texts.length >= 2) {
      return parse(text).text
    }
    return getMemoPreviewTitle() ? getMemoPreviewTitle().trim() : '에러 발생'
  }

  const memoPreviewDetail = cutTextByLength(
    getMemoPreviewDetail(),
    PREVIEW_DETAIL_MAX_LENGTH,
  )

  return {
    memoPreviewTitle,
    memoPreviewDetail,
  }
}
