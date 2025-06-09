export interface UserLoginResponseDTO {
    code: number;
    result: string;
    }

export interface UserDetailsResponseDTO {
    code: number;
    result: {
        "fullName": string,
        "phoneNum": string,
        "dateOfBirth": string
    }
}
export interface AddressRequestDTO {
    unitNumber :string;
    streetNumber :string;
    addressLine1 :string;
    addressLine2 :string;
    city :string;
    region :string;
    postalCode :string;
}
export interface AddressResponseDTO {
 id:number,
 address: AddressRequestDTO,
 default: boolean,
}