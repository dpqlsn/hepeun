import type { Props } from "../types/type";
import styled from "@emotion/styled";

export default function FacilityDetail({ facility }: Props) {
    return (
        <Container>
        <h2>{facility.name}</h2>
        <p>주소: {facility.address}</p>
        <p>전화: {facility.phone}</p>
        </Container>
    );
}

const Container = styled.div`
    border: 1rem solid #333;
    padding: 10rem;
    margin-top: 15rem;
    border-radius: 4rem;
    background-color: #fafafa;
`;