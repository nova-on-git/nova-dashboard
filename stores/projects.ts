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
        },

        async read() {
            const { data } = await useFetch<Project[]>("/api/projects")
            if (!data.value) return
            this.projects = data.value
        },

        async create(project: Omit<Project, "id">) {
            await useFetch("/api/projects", {
                method: "POST",
                body: {
                    project: project,
                },
            })
        },

        async updateStatus(projectId: string, phase: ProjectPhase) {
            await useFetch("/api/projects/status", {
                method: "PUT",
                body: {
                    id: projectId,
                    phase: phase,
                },
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
    action: "none",
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
