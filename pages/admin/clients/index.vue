<template>
    <main class="projects-container">
      <header class="projects-header">
        <h1>Projects</h1>
      </header>
  
      <div class="project-grid">
        <div v-for="project in projects" :key="project.id" class="project-card">
          <h3 class="project-title">{{ project.name }}</h3>
          <div class="project-info">
            <p><strong>Phase:</strong> {{ project.phase }}</p>
            <p><strong>Action:</strong> {{ project.action }}</p>
            <p v-if="project.meeting">
              <strong>Next Meeting:</strong> {{ formatDate(project.meeting.startTime) }}
            </p>
            <p v-if="project.quote">
              <strong>Total Amount:</strong> ${{ (project.quote.totalAmount / 100).toFixed(2) }}
            </p>
          </div>
          <btn class="view-details-btn" :to="`/admin/clients/${project.id}`">View Details</btn>
        </div>
      </div>
  
      <div class="actions">
        <modal id="createProject">
          <form @submit.prevent="$Projects.create(projectDetails)" class="create-project-form">
            <div class="form-group">
              <label for="name">Project Name:</label>
              <input type="text" id="name" name="name" v-model="projectDetails.name" />
            </div>
            <div class="form-group">
              <label for="emails">Emails:</label>
              <input type="text" id="emails" name="emails" v-model="projectDetails.emails" />
            </div>
            <btn type="submit" class="submit-btn">Create Project</btn>
          </form>
        </modal>
        <div class="action-buttons">
          <btn @click="$Projects.createDummy()" class="action-btn">Create Dummy Project</btn>
          <btn to="/admin/clients/chatroom" class="action-btn">Chatroom</btn>
          <btn preset="dark" @click="openModal('createProject')" class="action-btn create-project-btn">Create Project</btn>
        </div>
      </div>
    </main>
  </template>
  
  <script setup lang="ts">
  import { computed, ref, Ref } from 'vue'
  
  const projects = computed(() => {
    return $Projects.get
  })
  
  const projectDetails: Ref<Omit<Project, "id">> = ref({
    name: "",
    emails: [""],
    phase: "onboarding",
    action: "none",
    paymentPlan: "noneSelected",
  })
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }
  
  definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
  })
  </script>
  
  <style lang="scss" scoped>
  $primary-color: #3498db;
  $secondary-color: #2c3e50;
  $background-color: #f8f9fa;
  $card-background: #ffffff;
  $text-color: #333333;
  $border-radius: 8px;
  $box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  .projects-container {
    padding: 2rem;
    overflow: auto;
    width: 100%;
    background-color: $background-color;
    color: $text-color;
  }
  
  .projects-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  
    h1 {
      font-size: 2.5rem;
      color: $secondary-color;
    }
  }
  
  .project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .project-card {
    background-color: $card-background;
    border-radius: $border-radius;
    padding: 1.5rem;
    box-shadow: $box-shadow;
    transition: transform 0.3s ease;
  
    &:hover {
      transform: translateY(-5px);
    }
  
    .project-title {
      margin-top: 0;
      margin-bottom: 1rem;
      color: $primary-color;
      font-size: 1.5rem;
    }
  
    .project-info {
      p {
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
  
        strong {
          color: $secondary-color;
        }
      }
    }
  
    .view-details-btn {
      margin-top: 1rem;
      width: 100%;
      background-color: $primary-color;
      color: white;
      border: none;
      padding: 0.5rem;
      border-radius: $border-radius;
      cursor: pointer;
      transition: background-color 0.3s ease;
  
      &:hover {
        background-color: darken($primary-color, 10%);
      }
    }
  }
  
  .actions {
    margin-top: 2rem;
  }
  
  .action-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .action-btn {
    padding: 0.75rem 1.5rem;
    border-radius: $border-radius;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
  
    &:hover {
      transform: translateY(-2px);
    }
  }
  
  .create-project-btn {
    background-color: $secondary-color;
    color: white;
  
    &:hover {
      background-color: darken($secondary-color, 10%);
    }
  }
  
  .create-project-form {
    .form-group {
      margin-bottom: 1rem;
  
      label {
        display: block;
        margin-bottom: 0.5rem;
        color: $secondary-color;
      }
  
      input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: $border-radius;
      }
    }
  
    .submit-btn {
      background-color: $primary-color;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: $border-radius;
      cursor: pointer;
      transition: background-color 0.3s ease;
  
      &:hover {
        background-color: darken($primary-color, 10%);
      }
    }
  }
  
  @media (max-width: 768px) {
    .project-grid {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
  
    .action-buttons {
      flex-direction: column;
    }
  }
  </style>