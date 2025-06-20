import { useEffect } from "react";
import { CardWrapper, CurrencyWrapper, Title, Currency, Data } from "./styles";

export const LiveCard = ({ categoryTitle, currencyTitle, data }: any) => {
  return (
    <CardWrapper>
      <Title>{categoryTitle}</Title>
      <CurrencyWrapper>
        <Currency>
          {currencyTitle}
          <Data>{data}</Data>
        </Currency>
      </CurrencyWrapper>
    </CardWrapper>
  );
};
