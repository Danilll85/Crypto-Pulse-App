export const formatPrice = (price: number): string => {
    if (price >= 1) {
        return `$${price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    } else {
        return `$${price.toLocaleString("en-US", {
            minimumFractionDigits: 4,
            maximumFractionDigits: 6,
        })}`;
    }
};