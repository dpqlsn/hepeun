import type { Props } from "../types/type";
import styled from "@emotion/styled";

export default function FacilityDetail({ facility }: Props) {
    return (
        <Container>
        <h2>{facility.name}</h2>
        <p>주소: {facility.address}</p>
        <p>전화: {facility.phone}</p>
        <p>운영형태: {facility.operation_type}</p>
        <p>서비스: {facility.service_details}</p>
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