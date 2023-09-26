import { ProductImageDTO } from "./ProductImageDTO";

export type DetailsProductDTO = {
    id: string;
    name: string;
    description: string;
    is_new: boolean;
    price: number;
    is_active: boolean;
    accept_trade: boolean;
    payment_methods: any[];
    product_images: ProductImageDTO[];
    user: {
        avatar: string;
        name: string;
    }
}
