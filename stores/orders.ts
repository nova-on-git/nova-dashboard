import { defineStore } from "pinia";
import axios from "axios";
import { collection, onSnapshot } from "firebase/firestore";

export const useOrderStore = defineStore("orders", {
    state: () => ({
        orders: [] as Order[],
    }),

    getters: {
        get(state) {
            return state.orders;
        },

        search: (state) => (searchQuery: string) => {
            if (!searchQuery) {
                return state.orders;
            }

            const lowerCaseQuery = searchQuery.toLowerCase();

            return state.orders.filter((order) => {
                const matchesOrder = Object.values(order).some((value) => {
                    if (typeof value === "string") {
                        return value.toLowerCase().includes(lowerCaseQuery);
                    }
                    if (Array.isArray(value)) {
                        return value.some((item) => {
                            return Object.values(item).some((itemValue) => {
                                return String(itemValue)
                                    .toLowerCase()
                                    .includes(lowerCaseQuery);
                            });
                        });
                    }

                    if (typeof value === "object" && value !== null) {
                        return Object.values(value).some((objValue) => {
                            return String(objValue)
                                .toLowerCase()
                                .includes(lowerCaseQuery);
                        });
                    }
                    return false;
                });

                return matchesOrder; // Return true if there's a match
            });
        },

        filterByStatus: (state) => (status: OrderStatusFilter) => {
            if (status === "all") return state.orders;
            return state.orders.filter((order) => order.status === status);
        },

        getOrderById: (state) => {
            return (id: string): Order | null => {
                const order = state.orders.find((order) => order.id === id);
                return order || null;
            };
        },
    },

    actions: {
        async init() {
            if (!import.meta.client) return;

            const $db = useDb();

            const cachedOrders = localStorage.getItem("orders");

            if (cachedOrders) {
                this.orders = JSON.parse(cachedOrders);
            }

            await this.read();

            const colRef = collection($db, "orders");

            onSnapshot(
                colRef,
                (snapshot) => {
                    const orders: Order[] = [];
                    snapshot.forEach((doc) => {
                        orders.push({ id: doc.id, ...doc.data() } as Order);
                    });
                    this.orders = orders;
                },
                (error) => {
                    console.error("Error getting notifications: ", error);
                },
            );
        },

        async read() {
            try {
                const { data } = await useFetch(`/api/orders`);
                this.orders = data.value as Order[];

                localStorage.setItem("orders", JSON.stringify(this.orders));

                return this.orders;
            } catch (error) {
                console.error(error);
                return [];
            }
        },

        async updateStatus(id: string, newStatus: Order["status"]) {
            const orderIndex = this.orders.findIndex(
                (order) => order.id === id,
            );
            if (orderIndex === -1) {
                console.error("Order not found");
                return;
            }

            const originalOrder = { ...this.orders[orderIndex] };
            this.orders[orderIndex] = {
                ...this.orders[orderIndex],
                status: newStatus,
            };

            try {
                await axios.put(`${window.location.origin}/api/orders`, {
                    id: id,
                    newStatus: newStatus,
                });
            } catch (error) {
                console.error("Error updating status:", error);
                this.orders[orderIndex] = originalOrder;
            }
        },

        async createDummy() {
            const id = await this.create(testOrderObject);
            await useFetch("/api/orders/incomplete/resolve-order", {
                method: "PUT",
                body: { orderId: id },
            });
        },
    },
});
export const testOrderObject: Omit<Order, "id"> = {
    currency: "gbp",
    items: [
        {
            name: "itemName",
            price: 100,
            quantity: 1,
            description: "this is a description of the product description",
            images: [
                {
                    preview:
                        "https://www.lifewire.com/thmb/lWlCQDkZkvbWxKhkJZ6yjOJ_J4k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ScreenShot2020-04-20at10.03.23AM-d55387c4422940be9a4f353182bd778c.jpg",

                    fullSize:
                        "https://www.lifewire.com/thmb/lWlCQDkZkvbWxKhkJZ6yjOJ_J4k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ScreenShot2020-04-20at10.03.23AM-d55387c4422940be9a4f353182bd778c.jpg",
                },
            ],
        },
        {
            name: "itemName",
            price: 100,
            quantity: 1,
            description: "this is a description of the product description",
            images: [
                {
                    preview:
                        "https://www.lifewire.com/thmb/lWlCQDkZkvbWxKhkJZ6yjOJ_J4k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ScreenShot2020-04-20at10.03.23AM-d55387c4422940be9a4f353182bd778c.jpg",

                    fullSize:
                        "https://www.lifewire.com/thmb/lWlCQDkZkvbWxKhkJZ6yjOJ_J4k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ScreenShot2020-04-20at10.03.23AM-d55387c4422940be9a4f353182bd778c.jpg",
                },
            ],
        },
        {
            name: "itemName",
            price: 100,
            quantity: 1,
            description: "this is a description of the product description",
            images: [
                {
                    preview:
                        "https://www.lifewire.com/thmb/lWlCQDkZkvbWxKhkJZ6yjOJ_J4k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ScreenShot2020-04-20at10.03.23AM-d55387c4422940be9a4f353182bd778c.jpg",

                    fullSize:
                        "https://www.lifewire.com/thmb/lWlCQDkZkvbWxKhkJZ6yjOJ_J4k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ScreenShot2020-04-20at10.03.23AM-d55387c4422940be9a4f353182bd778c.jpg",
                },
            ],
        },
        {
            name: "itemName",
            price: 100,
            quantity: 1,
            description: "this is a description of the product description",
            images: [
                {
                    preview:
                        "https://www.lifewire.com/thmb/lWlCQDkZkvbWxKhkJZ6yjOJ_J4k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ScreenShot2020-04-20at10.03.23AM-d55387c4422940be9a4f353182bd778c.jpg",

                    fullSize:
                        "https://www.lifewire.com/thmb/lWlCQDkZkvbWxKhkJZ6yjOJ_J4k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ScreenShot2020-04-20at10.03.23AM-d55387c4422940be9a4f353182bd778c.jpg",
                },
            ],
        },
        {
            name: "itemName",
            price: 100,
            quantity: 1,
            description: "this is a description of the product description",
            images: [
                {
                    preview:
                        "https://www.lifewire.com/thmb/lWlCQDkZkvbWxKhkJZ6yjOJ_J4k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ScreenShot2020-04-20at10.03.23AM-d55387c4422940be9a4f353182bd778c.jpg",

                    fullSize:
                        "https://www.lifewire.com/thmb/lWlCQDkZkvbWxKhkJZ6yjOJ_J4k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ScreenShot2020-04-20at10.03.23AM-d55387c4422940be9a4f353182bd778c.jpg",
                },
            ],
        },
    ],
    category: "default",
    totalAmount: 1000,
    subTotal: 1000,
    taxAmount: 1000,
    shippingCost: 1000,
    contactNumber: "09213",
    status: "pending",
    paymentMethod: "card",
    timestamp: new Date(),
    deliveryDate: new Date(),

    shippingAddress: {
        name: "name",
        postcode: "postcode",
        city: "city",
        street: "street",
        country: "country",
        county: "county",
    },

    billingAddress: {
        name: "name",
        postcode: "postcode",
        city: "city",
        street: "street",
        country: "country",
        county: "county",
    },
    notes: "These are the order notes",
};
