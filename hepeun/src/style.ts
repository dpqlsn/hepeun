import styled from "@emotion/styled";

export const Container = styled.div`
    max-width: 50rem;
    margin: 2.5rem auto;
    padding: 0 1.25rem;
`;

export const Title = styled.h1`
    text-align: center;
    margin-bottom: 1.5rem;
`;

export const Message = styled.p`
    text-align: center;
    font-size: 1rem;
`;

export const ErrorMessage = styled(Message)`
    color: #e92565;
`;

export const List = styled.ul`
    list-style: none;
    padding: 0;
`;

export const ListItem = styled.li<{ selected: boolean }>`
    border: 0.0625rem solid #ccc;
    margin-bottom: 0.625rem;
    padding: 0.625rem;
    cursor: pointer;
    background-color: ${({ selected }) => (selected ? "#eef" : "white")};

    &:hover {
        background-color: #ddf;
    }
`;

export const Detail = styled.div`
    margin-top: 1.5rem;
    border: 0.125rem solid #333;
    padding: 1.25rem;
    border-radius: 0.375rem;
    background-color: #fafafa;
`;

export const CloseButton = styled.button`
    margin-top: 1rem;
    padding: 0.5rem 0.75rem;
    border: none;
    background-color: #333;
    color: white;
    border-radius: 0.25rem;
    cursor: pointer;

    &:hover {
        background-color: #555;
    }
`;