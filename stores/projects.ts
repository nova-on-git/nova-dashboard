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

            
        }
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

        async create(project:  Omit<Project, "id"> ) {
            await useFetch('/api/projects', {
                method: "POST",
                body: {
                    project: project
                }
            })
        },

        /**A testing function */
        async createDummy() {
            this.create(DummyProject)
        }
    },
})

const DummyProject: Omit<Project, "id"> = {
    name: "Test Project",
    emails: [
        "codypwakeford@gmail.com",
    ],
    status: "discovery"
}