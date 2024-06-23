import type { IGroceryItem, TGroceryItemNoId } from '../../types/GroceryItem'
import type { AtLeastOne } from '../../types/utility/AtLeastOne'
import BaseService from '../BaseService'

class GroceryService extends BaseService {
  async fetchGroceryList (): Promise<IGroceryItem[]> {
    return await this.get<IGroceryItem[]>('/items').then((res) => res.data)
  }

  async addItem (item: TGroceryItemNoId): Promise<IGroceryItem> {
    return await this.post<IGroceryItem, TGroceryItemNoId>('/items', item).then((res) => res.data)
  }

  async updateItem (id: string, item: AtLeastOne<TGroceryItemNoId>): Promise<IGroceryItem> {
    return await this.patch<IGroceryItem, TGroceryItemNoId>(`/items/${id}`, item).then((res) => {
      return res.data
    })
  }

  async deleteItem (id: string): Promise<IGroceryItem> {
    return await this.delete<IGroceryItem>(`/items/${id}`).then((res) => res.data)
  }
}

export default new GroceryService()
