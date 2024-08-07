// types/store.ts
export interface CatalogueItem {
    id?: number;
    name: string;
    price: number;
    quantity?: number;
    type: 'product' | 'service';
    description: string;
  }
  
  export interface Catalogue {
    id: number;
    name: string;
    unique_id: string;
    items: CatalogueItem[];
  }
