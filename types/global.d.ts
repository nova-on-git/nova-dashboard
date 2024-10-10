export {};

declare global {
    interface Address {
        name: string;
        postcode: string;
        city: string;
        street: string;
        country: string;
        county: string;
    }
}
