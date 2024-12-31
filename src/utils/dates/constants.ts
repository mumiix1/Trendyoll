// Date format constants
export const DATE_FORMATS = {
  default: 'dd MMMM yyyy HH:mm:ss',
  selector: 'yyyy-MM-dd',
  short: 'dd MMM yyyy',
  time: 'HH:mm:ss',
  api: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  product: 'dd MMM yyyy HH:mm',
  order: 'dd MMMM yyyy HH:mm'
} as const;

export type DateFormat = keyof typeof DATE_FORMATS;