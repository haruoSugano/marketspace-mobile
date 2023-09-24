
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
