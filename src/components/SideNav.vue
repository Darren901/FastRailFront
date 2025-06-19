<template>
  <nav class="sidebar d-flex flex-column flex-shrink-0 position-fixed">
    <button class="toggle-btn" @click="toggleSidebar">
      <i class="bi bi-chevron-left"></i>
    </button>

    <div class="p-4">
      <h4 class="logo-text fw-bold mb-0">FAST RAIL</h4>
      <p class="text-muted small hide-on-collapse">後台管理系統</p>
    </div>

    <div class="nav flex-column">
      <RouterLink
        to="/backstage/home"
        class="sidebar-link text-decoration-none p-3"
      >
        <i class="bi bi-link-45deg me-3"></i>
        <span class="hide-on-collapse">權限管理</span>
      </RouterLink>
      <RouterLink
        to="/backstage/stations"
        class="sidebar-link text-decoration-none p-3"
      >
        <i class="bi bi-pc me-3"></i>
        <span class="hide-on-collapse">車站管理</span>
      </RouterLink>
      <a href="#" class="sidebar-link text-decoration-none p-3">
        <i class="bi bi-train-front me-3"></i>
        <span class="hide-on-collapse">車次管理</span>
      </a>

      <a href="#" class="sidebar-link text-decoration-none p-3">
        <i class="bi bi-ticket-perforated-fill me-3"></i>
        <span class="hide-on-collapse">車票管理</span>
      </a>
      <RouterLink
        to="/backstage/members"
        class="sidebar-link text-decoration-none p-3"
      >
        <i class="bi bi-people me-3"></i>
        <span class="hide-on-collapse">會員管理</span>
      </RouterLink>
      <RouterLink
        to="/"
        class="sidebar-link text-decoration-none p-3 text-accent"
        @click="handleLogout"
      >
        <i class="bi bi-door-closed me-3"></i>
        <span class="hide-on-collapse">會員登出</span>
      </RouterLink>
    </div>

    <div class="profile-section mt-auto p-3">
      <div class="d-flex align-items-center">
        <img
          src="https://randomuser.me/api/portraits/women/70.jpg"
          style="height: 60px"
          class="rounded-circle"
          alt="Profile"
        />
        <div class="ms-3 profile-info">
          <h6 class="text-white mb-0" v-if="adminUsersStore?.adminUserData">
            {{ adminUsersStore.adminUserData.account }}
          </h6>
          <small class="text-muted" v-if="adminUsersStore?.adminUserData">{{
            adminUsersStore.adminUserData.role
          }}</small>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAdminUsersStore } from "@/stores/adminUsersStore";
import { AlertModal } from "@/composable/alert-modal";
import { useRouter } from "vue-router";

const adminUsersStore = useAdminUsersStore();
const router = useRouter();

function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("collapsed");
}

const handleLogout = async () => {
  try {
    const res = await adminUsersStore.logout(adminUsersStore.adminUserData.id);
    console.log(res);
    AlertModal.showToast("success", res.message);
    router.push("/backstage/admin-login");
  } catch (e) {
    AlertModal.showToast("error", e.response.data.error);
  }
};
</script>

<style>
:root {
  --sidebar-width: 280px;
  --sidebar-width-collapsed: 80px;
}

body {
  overflow-x: hidden;
}

.sidebar {
  width: var(--sidebar-width);
  height: 100vh;
  background: linear-gradient(135deg, #1a1c2e 0%, #16181f 100%);
  transition: all 0.3s ease;
}

.sidebar.collapsed {
  width: var(--sidebar-width-collapsed);
}

.sidebar-link {
  color: #a0a3bd;
  transition: all 0.2s ease;
  border-radius: 8px;
  margin: 4px 16px;
  white-space: nowrap;
  overflow: hidden;
}

.sidebar-link:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

.sidebar-link.active {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
}

.logo-text {
  background: linear-gradient(45deg, #6b8cff, #8b9fff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: opacity 0.3s ease;
}

.notification-badge {
  background: #ff6b6b;
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 0.7rem;
}

.profile-section {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.main-content {
  margin-left: var(--sidebar-width);
  background-color: #f8f9fa;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  transition: all 0.3s ease;
}

.collapsed ~ .main-content {
  margin-left: var(--sidebar-width-collapsed);
}

.toggle-btn {
  position: absolute;
  right: -15px;
  top: 20px;
  background: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  z-index: 100;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.collapsed .toggle-btn {
  transform: rotate(180deg);
}

.collapsed .hide-on-collapse {
  opacity: 0;
  visibility: hidden;
}

.collapsed .logo-text {
  opacity: 0;
}

.collapsed .profile-info {
  opacity: 0;
}

.collapsed .sidebar-link {
  text-align: center;
  padding: 1rem !important;
  margin: 4px 8px;
}

.collapsed .sidebar-link i {
  margin: 0 !important;
}

.profile-info {
  transition: opacity 0.2s ease;
}
</style>
