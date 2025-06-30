import FavoriteButton from "./FavoriteButton";
import type { facilities } from "../types/type";
import styled from '@emotion/styled';

export default function FacilityList({ facilities, onSelect }: facilities) {
    return (
        <Container>
            {facilities.map((f) => (
                <Key
                key={f.id}
                onClick={() => onSelect(f)}
                >
                <h3>{f.name}</h3>
                <p>{f.address}</p>
                <FavoriteButton facility={f} />
                </Key>
            ))}
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
`;

const Key = styled.div`
    border: 1px solid #ccc;
    margin-bottom: 1rem;
    padding: 10px;
    cursor: pointer;

    &:hover {
        background-color: #f9f9f9;
    }
`;