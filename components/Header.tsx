import styled from 'styled-components';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { useState } from 'react';
import { zIndex } from '../theme/zIndex';
import { typography } from '../theme/typography';
import Link from 'next/link';
import { useUser } from '../services/auth/useUser';

const Container = styled.header`
  background: ${colors.primary};
  padding: ${spacing.sm};
  margin-bottom: 40px;
  text-align: center;
  padding-top: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;

const MenuButton = styled(HiOutlineMenuAlt3).attrs({ size: 30 })`
  fill: ${colors.white};
  position: absolute;
  right: 20px;
  top: 20px;
`;

const LeftActionButton = styled.span`
  position: absolute;
  left: 20px;
  top: 20px;
`;

const Menu = styled.div<{ show?: boolean }>`
  text-align: left;
  position: fixed;
  inset: 0;
  height: 100%;
  width: 100%;
  background: ${colors.white};
  color: ${colors.primary};
  z-index: ${zIndex[50]};
  padding: ${spacing.lg};
  transition: 0.3s;
  opacity: 0;
  visibility: hidden;
  z-index: -1;

  ${({ show }) =>
    show &&
    `
    opacity: 1;
    visibility: visible;
    z-index: 100;
  `}
`;

const CloseButton = styled(HiOutlineX).attrs({ size: 30 })`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const MenuList = styled.ul`
  list-style: none;
  font-size: ${typography.size.xl};
  margin-top: 50px;
`;

const MenuItem = styled.li`
  margin-bottom: 15px;
`;

export const Header = ({ pageTitle, leftActionButton }: { pageTitle: string; leftActionButton?: React.ReactNode }) => {
  const { logout } = useUser();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <Container>
      {leftActionButton && <LeftActionButton>{leftActionButton}</LeftActionButton>}
      <Title>{pageTitle}</Title>
      <MenuButton onClick={() => setMenuVisible(!menuVisible)} />
      <Menu show={menuVisible}>
        <CloseButton onClick={() => setMenuVisible(false)} />
        <MenuList>
          <MenuItem>
            <Link href="/">Home</Link>
          </MenuItem>
          <MenuItem>
            <Link href="/expenses">Expenses</Link>
          </MenuItem>
          <MenuItem>
            <Link href="/income">Income</Link>
          </MenuItem>
          <MenuItem>
            <Link href="/settings">Settings</Link>
          </MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Container>
  );
};
