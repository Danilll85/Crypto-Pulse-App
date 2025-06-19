import styled from "@emotion/styled";

const ThemeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:hover img {
    transform: scale(1.1);
  }
  
  font-size: 0.875rem;
  font-weight: 500;
  color: inherit;
  text-transform: capitalize;
`;

const ThemeImage = styled.img`
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
`;

export { ThemeWrapper, ThemeImage };
