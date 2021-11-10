import React from "react";
import { Container } from "./style";

interface noteProps {
  name: string;
  selected: boolean
}
export const Note = ({ name, selected }: noteProps) => {
  return <Container data-testid="note" selected={selected}>{name}</Container>;
};
