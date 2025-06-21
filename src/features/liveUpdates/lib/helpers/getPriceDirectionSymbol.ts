export const getPriceDirectionSymbol = (
    direction: "up" | "down" | "neutral"
) => {
    switch (direction) {
        case "up":
            return "↗";
        case "down":
            return "↘";
        default:
            return "→";
    }
};