import { defineStore } from "pinia";
import axios from "axios";
export const useUserStore = defineStore("users", {
    state: () => ({
        users: [] as UserObj[],
    }),

    getters: {
        get(state) {
            return state.users;
        },
    },

    actions: {
        async create(user: UserObj) {
            try {
                await axios.post(`${window.location.origin}/api/users`, user);
            } catch (error) {
                console.log(error);
            }
        },

        async read() {
            try {
                const response = await axios.get(
                    `${window.location.origin}/api/users`,
                );
                console.log(response);
                this.users = response.data;
            } catch (error) {
                console.log(error);
            }
        },

        async changeRole(email: UserObj["email"], newRole: UserObj["role"]) {
            try {
                await axios.put(`${window.location.origin}/api/users/role`, {
                    email,
                    newRole,
                });
            } catch (error) {
                console.error("Error changing role", error);
            }
        },

        async delete(email: UserObj["email"]) {
            try {
                await axios.delete(
                    `${window.location.origin}/api/users/${email}`,
                );
            } catch (error) {
                console.error(`Error deleting user ${email}`, error);
            }
        },
    },
});
