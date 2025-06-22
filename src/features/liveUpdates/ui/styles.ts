import styled from "@emotion/styled";
import { colors } from "@shared/ui/styleColors";

const LiveUpdatesWrapper = styled.div<{ $theme: string }>`
  background-color: ${({ $theme }) => ($theme === "light" ? colors.backgroundLight : colors.backgroundDark)};
  color: ${({ $theme }) => ($theme === "light" ? colors.textColorLight : colors.textColorDark)};
  padding: 24px;
  border-radius: 16px;
  margin: 30px 5% 30px 5%;

  @media (min-width: 769px) {
    margin: 30px 10% 30px 10%;
  }
`;

const HeadingText = styled.h1`
  font-size: 18px;
`;

const Heading = styled.div`
  display: flex;
  gap: 12px;
`;

const ConnectionStatus = styled.div<{ $theme: string }>`
  font-size: 12px;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  border-radius: 4px;
  color: ${({ $theme }) => ($theme === "light" ? colors.textColorLight : colors.textColorDark)};
  text-transform: lowercase;
  font-weight: bold;
`;

const InfoTable = styled.table<{ $theme: string }>`
  border-collapse: collapse;
  width: 100%;
  overflow-x: auto;
  font-size: 16px;

  td {
    text-align: center;
    padding: 10px 10px;
    color: ${({ $theme }) => ($theme === "light" ? colors.textColorLight : colors.textColorDark)};
  }
`;

const FavouriteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const LastUpdate = styled.div`
  font-weight: bold;
  text-align: right;
`;

const InfoTableContainer = styled.div`
  overflow-x: auto;
`;

const SearchBlock = styled.div<{ $theme: string }>`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 6px 0;
  flex-wrap: wrap;

  select,
  input,
  button {
    color: ${({ $theme }) => ($theme === "light" ? colors.textColorLight : colors.textColorDark)};
    background-color: transparent;
    border: 1px solid #959596;
    border-radius: 4px;
    padding: 2px 4px;
  }
`;
export {
  LiveUpdatesWrapper,
  HeadingText,
  LastUpdate,
  Heading,
  InfoTable,
  InfoTableContainer,
  ConnectionStatus,
  SearchBlock,
  FavouriteButton,
};
