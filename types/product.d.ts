export {};

declare global {
    interface Product {
        name?: string;
        description: string;

        /** Price in pence */
        price: number;
        quantity: number;
        images: ProductImage[];
        [key: string]: any;
        variations?: string[];
    }
    interface ProductImage {
        preview: string;
        fullSize: string;
        localUrl?: string;
        file?: File;
    }

    interface ProductCategory {
        [key: string]: Product[];
    }
}
