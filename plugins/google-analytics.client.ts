import { defineNuxtPlugin } from "#app";
import { useRouter } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const googleAnalyticsId = config.public.GOOGLE_ANALYTICS_TAG_ID;

    // Create and append the Google Analytics script tag
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize Google Analytics
    script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
            window.dataLayer.push(args);
        }
        gtag("js", new Date());
        gtag("config", googleAnalyticsId);

        // Track page views
        const router = useRouter();
        router.afterEach((to) => {
            gtag("config", googleAnalyticsId, {
                page_path: to.fullPath,
            });
        });
    };
});
