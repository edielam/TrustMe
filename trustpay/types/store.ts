// types/store.ts
export interface StoreItem {
    id?: number;
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface Store {
    id: number;
    name: string;
    unique_id: string;
    items: StoreItem[];
  }