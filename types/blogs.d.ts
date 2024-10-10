export {};
declare global {
    interface Blog {
        id?: string;
        title: string;
        description: string;
        author: string;
        openForComments: boolean;
        slug: string;
        status: "published" | "hidden" | "draft";

        /** Blog content stored as html */
        html?: string;

        /** Link to HTML doc stored in firestore bucket */
        htmlUrl?: string;
        tags?: string[];
    }
}
