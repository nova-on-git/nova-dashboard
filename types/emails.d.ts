export {}

declare global {
    interface email {
        to: string | string[]
        subject: string
        text?: string
        html?: string
    }
}
