import styled from 'styled-components';

export const Container = styled.div``;

interface NoteCircleInterface {
    selected: boolean
}
export const NoteCircle = styled.span<NoteCircleInterface>`
color: ${ (props) => props.selected && 'teal'};
`;