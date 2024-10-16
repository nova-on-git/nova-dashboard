import { defineStore } from "pinia"

export const useEmailsStore = defineStore("emails", {
    state: () => ({
        emails: {} as Email[],
    }),

    getters: {
        get(state) {
            return state.emails
        },
    },

    actions: {
        async send(email: Email) {
            await useFetch("/api/emails", {
                method: "POST",
                body: { email: email },
            })
        },

        async sendClientInvitation(clientEmails: string[]) {
            for (let clientEmail in clientEmails) {
                const baseUrl =
                    process.env.NODE_ENV === "production"
                        ? "https://velorisdesigns.com/auth/register"
                        : "http://localhost:3000/auth/register"

                // Create a URL object
                const url = new URL(baseUrl)

                // Append query parameters
                url.searchParams.append("email", encodeURIComponent(clientEmail))
                url.searchParams.append("type", encodeURIComponent("client"))

                const email = {
                    to: ["codypwakeford@gmail.com"],
                    subject: "You have been invited to Veloris!",
                    html: `
                    <p>Please click the link below to sign up for an account:</p>
                    <a href="${url}">Sign Up Here</a>
                `,
                }

                this.send(email)
            }
        },
    },
})

