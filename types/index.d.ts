export interface Note {
  _id?: string
  text: string
  property?: string
  related?: string
  en_explain?: string
  others?: string
}

export interface Article {
  _id?: string
  title: string
}

export interface ActiveDateMap {
  [key: number]: { [key: number]: { [key: number]: RecordType } }
}

export interface Record {
  type: RecordType
  date: string
}

export type RecordType = 'swim' | 'tennis'
