import styled from "@emotion/styled";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  outline: 1px solid grey;
  border-radius: 0.5rem;
`;

const Title = styled.div`
  font-size: 1rem;
`;

const CurrencyWrapper = styled.div`
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Currency = styled.div`
    display: flex;
    justify-content: flex-around;
`

const Data = styled.div`
    display: flex;
`


export { CardWrapper, Title, CurrencyWrapper, Currency, Data };
