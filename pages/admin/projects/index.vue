<template>
    <main class="admin-page">
        <pre>
            This is the client log in to the veloris site
            Here they will manage projects, make payments etc.

            Requirements
            1. Need to see the phases of development
                Discovery (finding out the client requirements)
                Design
                Developement
                Final Changes
                Testing
                Launch

            2. Accept meetings and schedule new ones.
            3. Select a payment plan.
            4. View invoices and charges. (Domain, custom email etc.)
            5. Message and share files.
            6. See finished projects with links to their live site.


            ####### Pages

            * Projects Table
            * Detailed Project Page
                    Status
                    Any actions they need to take
                    Payments that need to be made.
                    Description of project, costs etc

            * Billing/ Invoice
            * Chatroom/ Documents

            
            ####### Client Project Flow
            1. We create the project which will send an automatic email to the client.
            
            2. Once they join they will be shown a welcome message.
            
            3. On their profile when they join they will have to schedule the discovery meeting into the provided calender.

            4. Once the discovery is done we will send over an estimated cost and ask them to sign the contract.

            5. If they sign the contract then it will ask them to book a design meeting. This is where we will go over specifics. We will work along side the client to build their vision, ask for any content and images etc.

            6. Once the design is approved we will move into building. ( The client does nothing right now )

            7. When the development is complete we will ask for a final aproval meeting, providing the customer with a demo link. Here they can ask for a few final changes.

            8. Once approved we go into testing. Make sure the website is robust and responsive, also making final performance improvements.

            9. Then we launch handing over the website to the customer.

            10. 1 week later an automated message should popup on their dashboard asking for a google review. And maybe a questionaire on our performace.

            At each stage when we require a meeting, it will notify them and provide them a calender where they can pick a time.

        </pre>

        <anchor
            v-for="project in $Projects.getByEmail('codypwakeford@gmail.com')"
            :to="`/admin/projects/${project.id}`"
        >
            {{ project.name }}
        </anchor>

        <pre>
            {{ $Projects.getByEmail("codypwakeford@gmail.com") }}
        </pre>
    </main>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
})
</script>

<style lang="sass" scoped></style>
