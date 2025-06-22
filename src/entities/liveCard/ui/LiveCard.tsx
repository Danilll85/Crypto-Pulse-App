import { getPriceDirectionSymbol, formatPrice, formatChange } from "../../../features/liveUpdates/lib/helpers";
import { FavouriteButton } from "@features/liveUpdates/ui/styles";
import heart from "@assets/heart.svg";
import heartFill from "@assets/heart-fill.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@shared/lib/hooks/useTheme";
import { getChangeColor } from "@features/liveUpdates/lib/helpers/getChangeColor";
import type { PriceData } from "@features/liveUpdates/ui/LiveUpdates.types";

export const LiveCard = ({
  symbol,
  priceDirection,
  price,
  change24h,
  changePercent24h,
  volume24h,
  high24h,
  low24h,
  vwap24h,
  bid,
  ask,
  spread,
  spreadPercent,
}: PriceData) => {
  const { theme } = useTheme();
  const [heartPicture, setHeartPicture] = useState(heart);

  useEffect(() => {
    setHeartPicture(localStorage.getItem(symbol) ? heartFill : heart);
  }, [symbol]);

  let navigate = useNavigate();

  const addToFavourites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (heartPicture == heart) {
      setHeartPicture(heartFill);
      localStorage.setItem(symbol, "" + price);
    } else {
      setHeartPicture(heart);
      localStorage.removeItem(symbol);
    }
  };

  const showHistory = () => {
    navigate(`/history/${symbol}`);
  };

  return (
    <tr
      key={symbol}
      style={{
        cursor: "pointer",
      }}
      onClick={showHistory}
    >
      <td>
        <FavouriteButton onClick={addToFavourites}>
          <img src={heartPicture} width="20px" />
        </FavouriteButton>
      </td>
      <td>
        <div>
          <span>{symbol}</span>
          <span>{getPriceDirectionSymbol(priceDirection)}</span>
        </div>
      </td>
      <td>{formatPrice(price)}</td>
      <td>{formatChange(change24h)}</td>
      <td style={{ color: getChangeColor(changePercent24h, theme) }}>{formatChange(changePercent24h, true)}</td>
      <td>{volume24h.toLocaleString()}</td>
      <td>{formatPrice(high24h)}</td>
      <td>{formatPrice(low24h)}</td>
      <td>{formatPrice(vwap24h)}</td>
      <td>{formatPrice(bid)}</td>
      <td>{formatPrice(ask)}</td>
      <td>{formatPrice(spread)}</td>
      <td>{spreadPercent.toFixed(3)}%</td>
    </tr>
  );
};
