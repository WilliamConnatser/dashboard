<template>
  <div class="p-sm-2">
    <div v-if="installedApps.length">
      <div class="my-3 pb-3">
        <div class="d-flex justify-content-between align-items-center">
          <h1>apps</h1>
          <div>
            <b-button
              variant="outline-primary"
              size="sm"
              @click="startUpdate"
              >{{
                isUpdating ? "Update running in the background..." : "Update"
              }}</b-button
            >
            <b-button variant="outline-primary" size="sm" @click="toggleEdit">{{
              isEditing ? "Done" : "Edit"
            }}</b-button>
          </div>
        </div>
      </div>
      <div class="d-flex flex-wrap justify-content-start apps-container">
        <installed-app
          v-for="app in installedApps"
          :id="app.id"
          :key="app.id"
          :name="app.name"
          :port="app.port"
          :path="app.path"
          :hidden-service="app.hiddenService"
          :tor-only="app.torOnly"
          :show-uninstall-button="isEditing"
          :is-uninstalling="uninstallingApps.includes(app.id)"
        >
        </installed-app>
      </div>
    </div>
    <div v-else>
      <div class="my-3 pb-3">
        <h1>apps</h1>
        <div
          class="d-flex flex-column justify-content-center align-items-center py-5 mb-lg-5"
        >
          <p class="text-muted mb-2">You don't have any apps installed yet</p>
          <b-button variant="success" class="px-4" :to="'app-store'"
            >Go to App Store</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import InstalledApp from "@/components/InstalledApp.vue";

export default {
  data() {
    return {
      isEditing: false,
      isUpdating: false,
    };
  },
  computed: {
    ...mapState({
      installedApps: (state) => state.apps.installed,
      uninstallingApps: (state) => state.apps.uninstalling,
    }),
  },
  created() {
    this.$store.dispatch("apps/getInstalledApps");
  },
  methods: {
    toggleEdit() {
      this.isEditing = !this.isEditing;
    },
    startUpdate() {
      if (this.isUpdating) return;
      this.$store.dispatch("apps/updateApps");
      this.isUpdating = true;
      window.setTimeout(() => {
        this.isUpdating = false;
      }, 2000);
    },
  },
  components: {
    InstalledApp,
  },
};
</script>

<style lang="scss" scoped>
.apps-container {
  column-gap: 2rem;
}
</style>
