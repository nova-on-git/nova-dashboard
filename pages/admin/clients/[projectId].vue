<template>
    <main>
        <ProjectPhase :phase="project.phase" />
        <pre>
            This is where the project control will take place.
        </pre>

        <pre>{{ project }}</pre>

        <btn
            @click="$Projects.updatePhase(project.id, $Projects.getNextProjectPhase(project.phase))"
            >Go to next stage</btn
        >

        <btn>Request {{ project.phase }} meeting.</btn>
        <btn @click="$Projects.requestMeeting(project.id)">Request General Meeting</btn>
        <btn @click="$Projects.delete(project.id)">Delete Project</btn>

        <GenerateQuote :project="project" />
    </main>
</template>

<script setup lang="ts">
const route = useRoute()
const projectId = route.params.projectId as string
const project = $Projects.getProjectById(projectId)

definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
})
</script>

<style lang="sass" scoped></style>
