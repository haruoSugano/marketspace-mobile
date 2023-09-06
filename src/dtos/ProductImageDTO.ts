import { ProductDTO } from "./ProductDTO";

export type ProductImageDTO = {
    id: string;
    uri: string;
    product_id: string;
    product: ProductDTO;
}
