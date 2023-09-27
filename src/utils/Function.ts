import { DetailsProductDTO } from "@dtos/DetailsProductDTO";

export function FormatInputNameImage(name: string): string {
    return name.replace(" ", "-").trim();
};

export function FormatInputPrice(price: number): number {
    const numberString = price.toString();

    if (numberString.includes(".")) {
        return price;
    }

    return parseFloat(price.toFixed(2));
}

export function FormatTelephone(phone: string): string {
    const cleaned = phone.replace(/\D/g, "");
    const formatted = `(${cleaned.slice(0, 2)})${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;

    return formatted;
}

export function ConcatPaymentMethods(payment_methods: string[]): string {
    let paymentMethodsQuery = "";

    payment_methods.map((method) => {
        paymentMethodsQuery += `payment_method=${method}&`;
    });

    return paymentMethodsQuery.substring(0, paymentMethodsQuery.length - 1);
}

export function QueryFilterProducts(is_new: boolean | undefined, accept_trade: boolean | undefined, payment_methods: string[]): string{
    let queryString = "";

    if(!(typeof is_new === "undefined")) {
        queryString += `is_new=${is_new}`;
    }

    if(!(typeof accept_trade === "undefined")) {
        queryString += `accept_trade=${accept_trade}`;
    }

    if (payment_methods) {
        queryString += ConcatPaymentMethods(payment_methods);
    }

    return queryString;
}

export function FormatProductData(products_data: DetailsProductDTO[]) {
    return products_data.map((product: DetailsProductDTO) => {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            is_new: product.is_new,
            price: product.price,
            is_active: product.is_active,
            accept_trade: product.accept_trade,
            payment_methods: product.payment_methods,
            product_images: product.product_images,
            user: {
                avatar: product.user.avatar,
                name: product.user.name,
                tel: product.user.tel
            },
            user_id: product.user_id
        }
    });
}

export function FormatTelephoneNumber(tel: string) {
  return tel.replace(/\D/g, '');
}
