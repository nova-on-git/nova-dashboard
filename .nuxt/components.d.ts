
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
interface _GlobalComponents {
      'AdminSidebar': typeof import("../components/AdminSidebar.vue")['default']
    'AdminTopbar': typeof import("../components/AdminTopbar.vue")['default']
    'GravLoader': typeof import("../components/GravLoader.vue")['default']
    'NavDesktopNav': typeof import("../components/Nav/DesktopNav.vue")['default']
    'NavMobileNav': typeof import("../components/Nav/MobileNav.vue")['default']
    'Nav': typeof import("../components/Nav/Nav.vue")['default']
    'NotificationDropdown': typeof import("../components/NotificationDropdown.vue")['default']
    'Orders': typeof import("../components/Orders/orders.vue")['default']
    'AddItemDiscardModal': typeof import("../components/add-item/discard-modal.vue")['default']
    'AddItemImageInputs': typeof import("../components/add-item/image-inputs.vue")['default']
    'AddItemForm': typeof import("../components/add-item/item-form.vue")['default']
    'AddItemTags': typeof import("../components/add-item/tags.vue")['default']
    'AddItemVariations': typeof import("../components/add-item/variations.vue")['default']
    'AdminDialogs': typeof import("../components/admin-dialogs.vue")['default']
    'AnalyticsActiveUsersLast30Minutes': typeof import("../components/analytics/ActiveUsersLast30Minutes.vue")['default']
    'AnalyticsAverageSessionDuration': typeof import("../components/analytics/AverageSessionDuration.vue")['default']
    'AnalyticsBounceRateByDate': typeof import("../components/analytics/BounceRateByDate.vue")['default']
    'AnalyticsTotalUsers': typeof import("../components/analytics/TotalUsers.vue")['default']
    'AnalyticsUsersByChannel': typeof import("../components/analytics/UsersByChannel.vue")['default']
    'AnalyticsUsersByDate': typeof import("../components/analytics/UsersByDate.vue")['default']
    'AnalyticsUsersByDeviceChart': typeof import("../components/analytics/UsersByDeviceChart.vue")['default']
    'AnalyticsViewsByPage': typeof import("../components/analytics/ViewsByPage.vue")['default']
    'AnalyticsSectionTwo': typeof import("../components/analytics/section-two.vue")['default']
    'AnalyticsTopSection': typeof import("../components/analytics/top-section.vue")['default']
    'BlogsEditorPage': typeof import("../components/blogs/EditorPage.vue")['default']
    'DashboardMessages': typeof import("../components/dashboard/Messages.vue")['default']
    'DashboardHeader': typeof import("../components/dashboard/dashboard-header.vue")['default']
    'DashboardFooter': typeof import("../components/dashboard/footer.vue")['default']
    'DashboardLoader': typeof import("../components/dashboard/loader.vue")['default']
    'DashboardModals': typeof import("../components/dashboard/modals.vue")['default']
    'DashboardWelcome': typeof import("../components/dashboard/welcome.vue")['default']
    'StoreProductCard': typeof import("../components/store/product-card.vue")['default']
    'VelorisHello': typeof import("../components/veloris-hello.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
    'ClientOnly': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'NuxtPage': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': IslandComponent<typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
      'LazyAdminSidebar': typeof import("../components/AdminSidebar.vue")['default']
    'LazyAdminTopbar': typeof import("../components/AdminTopbar.vue")['default']
    'LazyGravLoader': typeof import("../components/GravLoader.vue")['default']
    'LazyNavDesktopNav': typeof import("../components/Nav/DesktopNav.vue")['default']
    'LazyNavMobileNav': typeof import("../components/Nav/MobileNav.vue")['default']
    'LazyNav': typeof import("../components/Nav/Nav.vue")['default']
    'LazyNotificationDropdown': typeof import("../components/NotificationDropdown.vue")['default']
    'LazyOrders': typeof import("../components/Orders/orders.vue")['default']
    'LazyAddItemDiscardModal': typeof import("../components/add-item/discard-modal.vue")['default']
    'LazyAddItemImageInputs': typeof import("../components/add-item/image-inputs.vue")['default']
    'LazyAddItemForm': typeof import("../components/add-item/item-form.vue")['default']
    'LazyAddItemTags': typeof import("../components/add-item/tags.vue")['default']
    'LazyAddItemVariations': typeof import("../components/add-item/variations.vue")['default']
    'LazyAdminDialogs': typeof import("../components/admin-dialogs.vue")['default']
    'LazyAnalyticsActiveUsersLast30Minutes': typeof import("../components/analytics/ActiveUsersLast30Minutes.vue")['default']
    'LazyAnalyticsAverageSessionDuration': typeof import("../components/analytics/AverageSessionDuration.vue")['default']
    'LazyAnalyticsBounceRateByDate': typeof import("../components/analytics/BounceRateByDate.vue")['default']
    'LazyAnalyticsTotalUsers': typeof import("../components/analytics/TotalUsers.vue")['default']
    'LazyAnalyticsUsersByChannel': typeof import("../components/analytics/UsersByChannel.vue")['default']
    'LazyAnalyticsUsersByDate': typeof import("../components/analytics/UsersByDate.vue")['default']
    'LazyAnalyticsUsersByDeviceChart': typeof import("../components/analytics/UsersByDeviceChart.vue")['default']
    'LazyAnalyticsViewsByPage': typeof import("../components/analytics/ViewsByPage.vue")['default']
    'LazyAnalyticsSectionTwo': typeof import("../components/analytics/section-two.vue")['default']
    'LazyAnalyticsTopSection': typeof import("../components/analytics/top-section.vue")['default']
    'LazyBlogsEditorPage': typeof import("../components/blogs/EditorPage.vue")['default']
    'LazyDashboardMessages': typeof import("../components/dashboard/Messages.vue")['default']
    'LazyDashboardHeader': typeof import("../components/dashboard/dashboard-header.vue")['default']
    'LazyDashboardFooter': typeof import("../components/dashboard/footer.vue")['default']
    'LazyDashboardLoader': typeof import("../components/dashboard/loader.vue")['default']
    'LazyDashboardModals': typeof import("../components/dashboard/modals.vue")['default']
    'LazyDashboardWelcome': typeof import("../components/dashboard/welcome.vue")['default']
    'LazyStoreProductCard': typeof import("../components/store/product-card.vue")['default']
    'LazyVelorisHello': typeof import("../components/veloris-hello.vue")['default']
    'LazyNuxtWelcome': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'LazyNuxtLayout': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'LazyNuxtErrorBoundary': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
    'LazyClientOnly': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/client-only")['default']
    'LazyDevOnly': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/dev-only")['default']
    'LazyServerPlaceholder': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'LazyNuxtLink': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'LazyNuxtLoadingIndicator': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'LazyNuxtRouteAnnouncer': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'LazyNuxtImg': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'LazyNuxtPicture': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'LazyNuxtPage': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/pages/runtime/page")['default']
    'LazyNoScript': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'LazyLink': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Link']
    'LazyBase': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Base']
    'LazyTitle': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Title']
    'LazyMeta': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Meta']
    'LazyStyle': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Style']
    'LazyHead': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Head']
    'LazyHtml': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Html']
    'LazyBody': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Body']
    'LazyNuxtIsland': typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'LazyNuxtRouteAnnouncer': IslandComponent<typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const AdminSidebar: typeof import("../components/AdminSidebar.vue")['default']
export const AdminTopbar: typeof import("../components/AdminTopbar.vue")['default']
export const GravLoader: typeof import("../components/GravLoader.vue")['default']
export const NavDesktopNav: typeof import("../components/Nav/DesktopNav.vue")['default']
export const NavMobileNav: typeof import("../components/Nav/MobileNav.vue")['default']
export const Nav: typeof import("../components/Nav/Nav.vue")['default']
export const NotificationDropdown: typeof import("../components/NotificationDropdown.vue")['default']
export const Orders: typeof import("../components/Orders/orders.vue")['default']
export const AddItemDiscardModal: typeof import("../components/add-item/discard-modal.vue")['default']
export const AddItemImageInputs: typeof import("../components/add-item/image-inputs.vue")['default']
export const AddItemForm: typeof import("../components/add-item/item-form.vue")['default']
export const AddItemTags: typeof import("../components/add-item/tags.vue")['default']
export const AddItemVariations: typeof import("../components/add-item/variations.vue")['default']
export const AdminDialogs: typeof import("../components/admin-dialogs.vue")['default']
export const AnalyticsActiveUsersLast30Minutes: typeof import("../components/analytics/ActiveUsersLast30Minutes.vue")['default']
export const AnalyticsAverageSessionDuration: typeof import("../components/analytics/AverageSessionDuration.vue")['default']
export const AnalyticsBounceRateByDate: typeof import("../components/analytics/BounceRateByDate.vue")['default']
export const AnalyticsTotalUsers: typeof import("../components/analytics/TotalUsers.vue")['default']
export const AnalyticsUsersByChannel: typeof import("../components/analytics/UsersByChannel.vue")['default']
export const AnalyticsUsersByDate: typeof import("../components/analytics/UsersByDate.vue")['default']
export const AnalyticsUsersByDeviceChart: typeof import("../components/analytics/UsersByDeviceChart.vue")['default']
export const AnalyticsViewsByPage: typeof import("../components/analytics/ViewsByPage.vue")['default']
export const AnalyticsSectionTwo: typeof import("../components/analytics/section-two.vue")['default']
export const AnalyticsTopSection: typeof import("../components/analytics/top-section.vue")['default']
export const BlogsEditorPage: typeof import("../components/blogs/EditorPage.vue")['default']
export const DashboardMessages: typeof import("../components/dashboard/Messages.vue")['default']
export const DashboardHeader: typeof import("../components/dashboard/dashboard-header.vue")['default']
export const DashboardFooter: typeof import("../components/dashboard/footer.vue")['default']
export const DashboardLoader: typeof import("../components/dashboard/loader.vue")['default']
export const DashboardModals: typeof import("../components/dashboard/modals.vue")['default']
export const DashboardWelcome: typeof import("../components/dashboard/welcome.vue")['default']
export const StoreProductCard: typeof import("../components/store/product-card.vue")['default']
export const VelorisHello: typeof import("../components/veloris-hello.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
export const ClientOnly: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtPage: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: IslandComponent<typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyAdminSidebar: typeof import("../components/AdminSidebar.vue")['default']
export const LazyAdminTopbar: typeof import("../components/AdminTopbar.vue")['default']
export const LazyGravLoader: typeof import("../components/GravLoader.vue")['default']
export const LazyNavDesktopNav: typeof import("../components/Nav/DesktopNav.vue")['default']
export const LazyNavMobileNav: typeof import("../components/Nav/MobileNav.vue")['default']
export const LazyNav: typeof import("../components/Nav/Nav.vue")['default']
export const LazyNotificationDropdown: typeof import("../components/NotificationDropdown.vue")['default']
export const LazyOrders: typeof import("../components/Orders/orders.vue")['default']
export const LazyAddItemDiscardModal: typeof import("../components/add-item/discard-modal.vue")['default']
export const LazyAddItemImageInputs: typeof import("../components/add-item/image-inputs.vue")['default']
export const LazyAddItemForm: typeof import("../components/add-item/item-form.vue")['default']
export const LazyAddItemTags: typeof import("../components/add-item/tags.vue")['default']
export const LazyAddItemVariations: typeof import("../components/add-item/variations.vue")['default']
export const LazyAdminDialogs: typeof import("../components/admin-dialogs.vue")['default']
export const LazyAnalyticsActiveUsersLast30Minutes: typeof import("../components/analytics/ActiveUsersLast30Minutes.vue")['default']
export const LazyAnalyticsAverageSessionDuration: typeof import("../components/analytics/AverageSessionDuration.vue")['default']
export const LazyAnalyticsBounceRateByDate: typeof import("../components/analytics/BounceRateByDate.vue")['default']
export const LazyAnalyticsTotalUsers: typeof import("../components/analytics/TotalUsers.vue")['default']
export const LazyAnalyticsUsersByChannel: typeof import("../components/analytics/UsersByChannel.vue")['default']
export const LazyAnalyticsUsersByDate: typeof import("../components/analytics/UsersByDate.vue")['default']
export const LazyAnalyticsUsersByDeviceChart: typeof import("../components/analytics/UsersByDeviceChart.vue")['default']
export const LazyAnalyticsViewsByPage: typeof import("../components/analytics/ViewsByPage.vue")['default']
export const LazyAnalyticsSectionTwo: typeof import("../components/analytics/section-two.vue")['default']
export const LazyAnalyticsTopSection: typeof import("../components/analytics/top-section.vue")['default']
export const LazyBlogsEditorPage: typeof import("../components/blogs/EditorPage.vue")['default']
export const LazyDashboardMessages: typeof import("../components/dashboard/Messages.vue")['default']
export const LazyDashboardHeader: typeof import("../components/dashboard/dashboard-header.vue")['default']
export const LazyDashboardFooter: typeof import("../components/dashboard/footer.vue")['default']
export const LazyDashboardLoader: typeof import("../components/dashboard/loader.vue")['default']
export const LazyDashboardModals: typeof import("../components/dashboard/modals.vue")['default']
export const LazyDashboardWelcome: typeof import("../components/dashboard/welcome.vue")['default']
export const LazyStoreProductCard: typeof import("../components/store/product-card.vue")['default']
export const LazyVelorisHello: typeof import("../components/veloris-hello.vue")['default']
export const LazyNuxtWelcome: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const LazyNuxtLayout: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const LazyNuxtErrorBoundary: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
export const LazyClientOnly: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/client-only")['default']
export const LazyDevOnly: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/dev-only")['default']
export const LazyServerPlaceholder: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const LazyNuxtLink: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const LazyNuxtLoadingIndicator: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const LazyNuxtRouteAnnouncer: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const LazyNuxtImg: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const LazyNuxtPicture: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const LazyNuxtPage: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/pages/runtime/page")['default']
export const LazyNoScript: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const LazyLink: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Link']
export const LazyBase: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Base']
export const LazyTitle: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Title']
export const LazyMeta: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Meta']
export const LazyStyle: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Style']
export const LazyHead: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Head']
export const LazyHtml: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Html']
export const LazyBody: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/head/runtime/components")['Body']
export const LazyNuxtIsland: typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyNuxtRouteAnnouncer: IslandComponent<typeof import("../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.4.1_@types+node@22.7.4_eslint@9.12.0_jiti@2.3.3__ioredis@5.4.1__lkes63js7yprtria6giswkle54/node_modules/nuxt/dist/app/components/server-placeholder")['default']>

export const componentNames: string[]
