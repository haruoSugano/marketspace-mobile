import { ProductImageDTO } from "./ProductImageDTO";

export type ProductDTO = {
    id?: string;
    name: string;
    description: string;
    is_new: boolean;
    price: number;
    is_active: boolean;
    accept_trade: boolean;
    payment_methods: string[];
    product_images: ProductImageDTO[];
}
