<template>
  <v-app class="bg-grey-lighten-4">
    <v-main>
      <NavigationBar />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";

export default {
  name: "App",
  components: {
    NavigationBar,
  },
};
</script>

<style>
.v-input__details {
  display: none;
}

.v-list-item__content {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

@media (max-width: 963px) {
  .v-list-item__content {
    flex-direction: column;
  }
}

.v-list-item-action {
  height: 80px;
}

.box-hl {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 15px;
  overflow: hidden;
}

.v-list-item-title {
  white-space: unset;
}
</style>
