export type Language = 'en-US' | 'zh-CN'

export interface TableField {
  field: string
  label: string
  sortable?: boolean
  truncate?: boolean
  formatter?: (row?: Record<string, any>, column?: string, cellValue?: any, index?: number) => any
  defaultHidden?: boolean
}
