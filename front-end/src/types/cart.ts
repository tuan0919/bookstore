
export interface CartItemResponseDTO {
    code: number;
    result: string;
} 
export interface CartItemPropertyResponseDTO {
  productId: number;
  quantity: number;
  title: string;
  price: number;
  discountedPrice: number;
  discountPercentage: number;
  imageUrl: string;
}
export interface CartPropertyResponseDTO {
    userId: string;
    items: CartItemPropertyResponseDTO[],
    lastModified: string;
}
export interface CartResponseDTO {
    code: number;
    result: CartPropertyResponseDTO;
}