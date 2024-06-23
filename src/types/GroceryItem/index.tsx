import { OneRequired } from '../utility/OneRequired'

export interface IGroceryItem {
  id: string
  name: string
  bought: boolean
  quantity: number
}

export type TGroceryItemNoId = Omit<IGroceryItem, 'id'>
export type TGroceryItemOptionalId = Partial<Pick<IGroceryItem, 'id'>> & TGroceryItemNoId
export type TGroceryItemRequiredId = OneRequired<IGroceryItem, 'id'>
