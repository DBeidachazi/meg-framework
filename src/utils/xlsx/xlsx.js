import { utils, writeFile } from 'xlsx'

export const handleExport  = (columns, data, filename) => {
  if (!data?.length) return $message.warning('没有数据')
  const columnsData = columns.filter((item) => !!item.title && !item.hideInExcel)
  const thKeys = columnsData.map((item) => item.key)
  const thData = columnsData.map((item) => item.title)
  const trData = data.map((item) => thKeys.map((key) => item[key]))
  const sheet = utils.aoa_to_sheet([thData, ...trData])
  const workBook = utils.book_new()
  utils.book_append_sheet(workBook, sheet, '数据报表')
  writeFile(workBook, filename + ".xlsx")
}