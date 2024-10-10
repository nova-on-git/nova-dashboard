let $Notifications: NotificationStore
let $CurrentUser: CurrentUserStore
let $Orders: OrderStore
let $Products: ProductStore
let $Users: UserStore
let $Basket: BasketStore
let $Dashboard: DashboardStore
let $Blogs: BlogStore
let $Payment: PaymentStore
let $Analytics: AnalyticsStore
let $Projects: ProjectStore
let $Chatroom: ChatroomStore

import { useChatroomStore } from "../stores/chatroom"
import { useNotificationStore } from "../stores/notifications"
import { useCurrentUserStore } from "../stores/currentUser"
import { useOrderStore } from "../stores/orders"
import { useProductStore } from "../stores/products"
import { useUserStore } from "../stores/users"
import { useBasketStore } from "../stores/basket"
import { useDashboardStore } from "../stores/dashboard"
import { useBlogStore } from "../stores/blogs"
import { useAnalyticsStore } from "../stores/analytics"
import { usePaymentStore } from "../stores/payment"
import { useProjectStore } from "../stores/projects"

export type ChatroomStore = ReturnType<typeof useChatroomStore>
export type ProjectStore = ReturnType<typeof useProjectStore>
export type NotificationStore = ReturnType<typeof useNotificationStore>
export type BlogStore = ReturnType<typeof useBlogStore>
export type CurrentUserStore = ReturnType<typeof useCurrentUserStore>
export type OrderStore = ReturnType<typeof useOrderStore>
export type ProductStore = ReturnType<typeof useProductStore>
export type AnalyticsStore = ReturnType<typeof useAnalyticsStore>
export type UserStore = ReturnType<typeof useUserStore>
export type BasketStore = ReturnType<typeof useBasketStore>
export type DashboardStore = ReturnType<typeof useDashboardStore>
export type PaymentStore = ReturnType<typeof usePaymentStore>

export async function initStores() {
    $Notifications = useNotificationStore()
    $Notifications.init()

    $CurrentUser = useCurrentUserStore()
    $CurrentUser.init()

    $Payment = usePaymentStore()

    $Blogs = useBlogStore()
    $Blogs.init()

    $Orders = useOrderStore()
    $Orders.init()

    $Products = useProductStore()
    $Users = useUserStore()
    $Basket = useBasketStore()
    $Dashboard = useDashboardStore()

    $Analytics = useAnalyticsStore()
    $Analytics.init()

    $Projects = useProjectStore()
    $Projects.init()

    $Chatroom = useChatroomStore()
    $Chatroom.init()

    console.debug("[Veloris] Pinia stores initialized")
}

export {
    $Notifications,
    $CurrentUser,
    $Orders,
    $Products,
    $Users,
    $Basket,
    $Dashboard,
    $Analytics,
    $Blogs,
    $Payment,
    $Projects,
    $Chatroom,
}
