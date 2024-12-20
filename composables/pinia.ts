// @ts-ignore
import velorisConfig from "~~/veloris.config.ts"

let $Notifications: NotificationStore

/**Holds data about the logged in user. */
let $CurrentUser: CurrentUserStore
let $Emails: EmailStore
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
import { useEmailsStore } from "~/stores/emails"

export type ChatroomStore = ReturnType<typeof useChatroomStore>
export type EmailStore = ReturnType<typeof useEmailsStore>
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
    $CurrentUser = useCurrentUserStore()
    $CurrentUser.init()

    $Payment = usePaymentStore()

    $Blogs = useBlogStore()
    if (velorisConfig.sectionSwitches.blogs) {
        $Blogs.init()
    }

    $Orders = useOrderStore()
    if (velorisConfig.sectionSwitches.store) {
        $Orders.init()
    }
    $Products = useProductStore()
    $Basket = useBasketStore()
    $Users = useUserStore()

    $Dashboard = useDashboardStore()

    $Analytics = useAnalyticsStore()
    $Analytics.init()

    $Projects = useProjectStore()
    $Projects.init()

    $Chatroom = useChatroomStore()
    $Chatroom.init()

    $Notifications = useNotificationStore()
    $Notifications.init()

    $Emails = useEmailsStore()

    $Dashboard.loadingState(false)
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
    $Emails,
}
