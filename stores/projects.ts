import axios from "axios"
import { collection, onSnapshot } from "firebase/firestore"
import { snapshot } from "node:test"
import { defineStore } from "pinia"

export const useProjectStore = defineStore("projects", {
    state: () => ({
        projects: {} as Project[],
    }),

    getters: {
        get(state) {
            return state.projects
        },

        getByEmail: (state) => (email: string) => {
            return state.projects.filter((project) => {
                for (email in project.emails) return email === email
            })
        },

        getProjectById: (state) => (id: string) => {
            const match = state.projects.filter((project) => {
                return project.id === id
            })

            return match[0]
        },

        getNextProjectPhase: (state) => (phase: ProjectPhase) => {
            const index = projectPhases.indexOf(phase)
            return projectPhases[index + 1]
        },
    },

    actions: {
        async init() {
            this.read()

            const $db = useDb()

            const colRef = collection($db, "projects")

            onSnapshot(colRef, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    const projectData = change.doc.data() as Project
                    projectData.id = change.doc.id // Ensure each project has its Firestore ID

                    if (change.type === "added") {
                        // Add new projects to the state
                        this.projects.push(projectData)
                    }

                    if (change.type === "modified") {
                        // Find and update the modified project in the state
                        const index = this.projects.findIndex(
                            (project) => project.id === change.doc.id
                        )
                        if (index !== -1) {
                            this.projects[index] = projectData
                        }
                    }

                    if (change.type === "removed") {
                        // Remove deleted projects from the state
                        this.projects = this.projects.filter(
                            (project) => project.id !== change.doc.id
                        )
                    }
                })
            })
        },

        async read() {
            const { data } = await useFetch<Project[]>("/api/projects")
            if (!data.value) return
            this.projects = data.value
        },

        async create(project: Omit<Project, "id" | "action">) {
            await useFetch("/api/projects", {
                method: "POST",
                body: {
                    project: project,
                },
            })
        },

        async updatePhase(projectId: string, phase: ProjectPhase) {
            await useFetch("/api/projects/status", {
                method: "PUT",
                body: {
                    id: projectId,
                    phase: phase,
                },
            })
        },

        async setPaymentPlan(projectId: string, paymentPlan: Project["paymentPlan"]) {
            await useFetch("/api/projects", {
                method: "PUT",
                body: {
                    id: projectId,
                    key: "paymentPlan",
                    value: paymentPlan,
                },
            })
        },

        async meetingScheduled(projectId: Project["id"], meetingUrl: string, clientUrl: string) {
            const meeting = await this.getCalendlyMeetingDetails(meetingUrl, clientUrl)

            await useFetch("/api/projects", {
                method: "PUT",
                body: {
                    id: projectId,
                    key: "meeting",
                    value: meeting,
                },
            })

            await useFetch("/api/projects", {
                method: "PUT",
                body: {
                    id: projectId,
                    key: "action",
                    value: "none",
                },
            })
        },

        async getCalendlyMeetingDetails(meetingUrl: string, clientUrl: string): Promise<Meeting> {
            const config = useRuntimeConfig()

            const meetingDetails = await axios.get(meetingUrl, {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${config.public.CALENDLY_AUTH}`,
                },
            })

            const clientDetailsResponse = await axios.get(clientUrl, {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${config.public.CALENDLY_AUTH}`,
                },
            })

            const calendlyMeeting = meetingDetails.data
            const clientDetails = clientDetailsResponse.data

            const meeting: Meeting = Object.assign(
                {},
                {
                    name: calendlyMeeting.resource.name as string,
                    startTime: calendlyMeeting.resource.start_time as string,
                    meetingUrl: calendlyMeeting.resource.location.join_url as string,
                    cancelUrl: clientDetails.resource.cancel_url as string,
                    rescheduleUrl: clientDetails.resource.reschedule_url as string,

                    clients: [
                        {
                            name: clientDetails.resource.name as string,
                            email: clientDetails.resource.email as string,
                        },
                    ],
                }
            )

            return meeting
        },

        async uploadQuote(projectId: string, quote: ProjectQuote) {
            await useFetch("/api/projects", {
                method: "put",
                body: {
                    id: projectId,
                    key: "quote",
                    value: quote,
                },
            })
        },

        async updateAmountPaid(projectId: string, amountPaid: number) {
            await $fetch("/api/projects/update-amount-paid", {
                method: "PUT",
                body: { id: projectId, amountPaid },
            })
        },

        async requestMeeting(id: string) {
            await useFetch("/api/projects", {
                method: "put",
                body: {
                    id: id,
                    key: "action",
                    value: "meeting",
                },
            })
        },

        async delete(id: string) {
            await useFetch(`/api/projects/${id}`, {
                method: "delete",
            })
        },

        /**A testing function */
        async createDummy() {
            this.create(DummyProject)
        },
    },
})

const DummyProject: Omit<Project, "id"> = {
    name: "Test Project",
    emails: ["codypwakeford@gmail.com"],
    phase: "onboarding",
    action: "meeting",
    paymentPlan: "noneSelected",
}

/**List of project phases in order for reference. */
const projectPhases: ProjectPhase[] = [
    "onboarding",
    "discovery",
    "design",
    "development",
    "final approval",
    "testing",
    "launch",
    "completed",
]
