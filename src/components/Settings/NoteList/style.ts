import styled from 'styled-components';

export const Container = styled.div``;

interface ToneInterface {
    selected?: boolean
    weight?: number
}
export const Tone = styled.span<ToneInterface>`
color: ${ (props) => props.selected && 'teal'};
font-weight: ${(props) => props.weight ?? '100'}
`;

export const Controll = styled.span`
`;