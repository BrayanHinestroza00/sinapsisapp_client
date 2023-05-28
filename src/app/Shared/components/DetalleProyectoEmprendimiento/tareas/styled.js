import { Form } from "react-bootstrap";
import styled from "styled-components";

export const Label = styled(Form.Label)`
  color: ${({ theme }) => theme.colors.primaryTextColor};
  font-size: 1.2rem;
`;

export const Table = styled.table`
  background-color: ${({ theme }) => theme.colors.white};
`;
