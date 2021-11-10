import styled from 'styled-components';

interface ContainerInterface {
    selected: boolean
}
export const Container = styled.div<ContainerInterface>`
width: 33px;
height: 33px;
border-radius: 50%;
line-height: 33px;
background: ${props => props.selected ? 'blue' : 'teal'};
z-index: 2;
color: #eee;
opacity: 1;
text-align: center;
cursor: pointer;
`;
