import styled from "@emotion/styled";

const ThemeWrapper = styled.div`
  outline: 1px solid black;
  font-size: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ThemeImage = styled.img`
  width: 50px;
  height: 50px;
`;

export { ThemeWrapper, ThemeImage };
