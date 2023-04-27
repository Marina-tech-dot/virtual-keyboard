export function windowParametrs() {
  let monicWidth
  let monicHeight
  let textareaWidth
  let textareaHeight

  if (window.innerWidth >= 920) {
    monicWidth = '860px'
    textareaWidth = '830px'
  }

  if (window.innerWidth < 920 && window.innerWidth >= 720) {
    monicWidth = '688px'
    textareaWidth = '660px'
  }

  if (window.innerWidth < 720) {
    monicWidth = '452px'
    textareaWidth = '425px'
  }

  if (window.innerHeight >= 800) {
    monicHeight = '368px'
    textareaHeight = '277px'
  }

  if (window.innerHeight < 800) {
    monicHeight = '230px'
    textareaHeight = '130px'
  }

  return {
    monicWidth,
    monicHeight,
    textareaWidth,
    textareaHeight,
  }
}

export function css(styles = {}) {
  const cssStylesString = Object.entries(styles).map(([key, value]) => `${key}:${value}`).join(';')
  return `${cssStylesString}`
}

export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function unCapitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toLowerCase() + string.slice(1)
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  return localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}
