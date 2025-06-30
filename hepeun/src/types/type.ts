export interface Facility {
    id: string;
    name: string;
    address: string;
    phone: string;
    type: string;
    service: string;
}

export interface Props {
    facility: Facility;
}

export interface facilities {
    facilities: Facility[];
    onSelect: (facility: Facility) => void;
}