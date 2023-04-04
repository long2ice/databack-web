export function str2dict(str: string): Record<string, any> {
  const dict: Record<string, any> = {}
  str.split(' ').forEach((item) => {
    if (item.includes('=')) {
      const [key, value] = item.split('=')
      dict[key] = value
    } else if (item) {
      dict[item] = true
    }
  })
  return dict
}

export function dict2str(dict: Record<string, any>, exclude: string[] = []): string {
  return Object.keys(dict)
    .map((key) => {
      if (exclude.includes(key)) {
        return ''
      }
      if (dict[key] === true) {
        return key
      } else {
        return `${key}=${dict[key]}`
      }
    })
    .filter((item) => item)
    .join(' ')
}
