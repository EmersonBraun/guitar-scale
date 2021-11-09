import React from "react";
import { Container } from "./style";

interface noteProps {
  name: string;
}
export const Note = ({ name }: noteProps) => {
  return <Container data-testid="note">{name}</Container>;
};
