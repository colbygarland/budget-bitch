import styled from 'styled-components';
import { HiDotsHorizontal } from 'react-icons/hi';
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
  margin-bottom: 80px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;

const MenuButton = styled(HiDotsHorizontal)`
  fill: ${colors.white};
  position: absolute;
  right: 30px;
  top: 30px;
`;

const Menu = styled.div`
  text-align: left;
  position: fixed;
  inset: 0;
  height: 100%;
  width: 100%;
  background: ${colors.white};
  color: ${colors.primary};
  z-index: ${zIndex[50]};
  padding: ${spacing.lg};
`;

const CloseButton = styled.button`
  position: fixed;
  top: 25px;
  right: 30px;
`;

const MenuList = styled.ul`
  list-style: none;
  font-size: ${typography.size.xl};
`;

const MenuItem = styled.li``;

export const Header = ({ pageTitle }: { pageTitle: string }) => {
  const { logout } = useUser();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <Container>
      <Title>{pageTitle}</Title>
      <MenuButton onClick={() => setMenuVisible(!menuVisible)} />
      {menuVisible && (
        <Menu>
          <CloseButton onClick={() => setMenuVisible(false)}>✖</CloseButton>
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
      )}
    </Container>
  );
};
