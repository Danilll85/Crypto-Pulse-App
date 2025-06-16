import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

const NavigationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 7rem;
`;

const NavItem = styled.div`
  position: relative;
`;

const StyledNavLink = styled(NavLink)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-size: 1.5rem;
  font-weight: 500;
  text-decoration: none;
  color: var(--text-secondary, #64748b);
  border-radius: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.025em;

  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    color: var(--text-primary, #1e293b);
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05);
  }

  &.active {
    color: var(--accent-color, #3b82f6);
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.15) 100%);
    border-color: rgba(59, 130, 246, 0.3);
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  &.active:hover {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(147, 51, 234, 0.25) 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  animation: slideIn 0.5s ease-out;

  &:focus-visible {
    outline: 2px solid var(--accent-color, #3b82f6);
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`;

const slideIn = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export { NavigationWrapper, NavItem, StyledNavLink };
