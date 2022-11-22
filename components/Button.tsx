import styled from 'styled-components';
import { colors } from '../theme/colors';

const PrimaryButton = styled.button`
  color: #844c78;
  background-color: ${colors.tertiary};
  border-radius: 30px;
  padding: 8px 20px;
  font-size: 18px;
  font-weight: 700;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 8px;
`;

const OutlineButton = styled(PrimaryButton)`
  background-color: transparent;
  border: 2px solid ${colors.tertiary};
`;

export const Button = ({
  children,
  onClick,
  type = 'primary',
  ...props
}: {
  children: any;
  onClick: () => void;
  type?: 'primary' | 'outline';
}) => {
  let Btn = PrimaryButton;
  switch (type) {
    case 'outline':
      Btn = OutlineButton;
      break;
  }

  return (
    <Btn onClick={onClick} {...props}>
      {children}
    </Btn>
  );
};
