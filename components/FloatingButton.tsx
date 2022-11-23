import styled from 'styled-components';
import { zIndex } from '../theme/zIndex';
import { Button } from './Button';

const StyledButton = styled(Button)`
  position: fixed;
  margin: 0;
  bottom: 40px;
  right: 40px;
  z-index: ${zIndex[100]};
`;

export const FloatingButton = ({ title, onClick }: { title: string; onClick: () => void }) => {
  return <StyledButton onClick={onClick}>{title}</StyledButton>;
};
