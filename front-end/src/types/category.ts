export interface CategoryItem {
  id: number;
  name: string;
}

export interface CategoryChainDTO {
  fullChain: string;
  list: CategoryItem[];
}
