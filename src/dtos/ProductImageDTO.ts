import { ProductDTO } from "./ProductDTO";

export type ProductImageDTO = {
    id: string;
    path: string;
    product_id: string;
    product: ProductDTO;
}
