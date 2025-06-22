import { FavouriteButton } from "@features/liveUpdates/ui/styles";
import type { FavouritesCardProps } from "./FavouritesCard.types";
import heart from "@assets/heart.svg";
import heartFill from "@assets/heart-fill.svg";
import { useState } from "react";
import { CurrencyName, FavouritesContainer } from "./styles";

export const FavouritesCard = ({ currencyName, price }: FavouritesCardProps) => {
    const [heartPicture, setHeartPicture] = useState(heartFill);

    const addToFavourites = () => {
        if (heartPicture == heart) {
            setHeartPicture(heartFill);
            localStorage.setItem(currencyName, "" + price);
        } else {
            setHeartPicture(heart);
            localStorage.removeItem(currencyName);
        }
    };

    return (
        <FavouritesContainer>
            <div>
                <CurrencyName>{currencyName}</CurrencyName>
                <p>${price}</p>
            </div>
            <FavouriteButton onClick={addToFavourites}>
                <img src={heartPicture} width="20px" />
            </FavouriteButton>
        </FavouritesContainer>
    );
};
