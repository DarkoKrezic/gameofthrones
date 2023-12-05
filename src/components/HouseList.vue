<template>
  <div>
    <h1>Houses</h1>
    <input v-model="search" placeholder="Search houses..." />
    <ul>
      <!-- Pass search to filteredHouses -->
      <li
        class="house-list"
        v-for="house in filteredHouses(search)"
        :key="house.slug"
      >
        <router-link
          :to="{ name: 'HouseDetail', params: { slug: house.slug } }"
        >
          <div class="house-name">{{ house.name }}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ...mapGetters(["filteredHouses"]),
  },
  created() {
    this.$store.dispatch("fetchHouses");
  },
};
</script>
<style>
.house-list {
  padding: 0.5rem;
  margin: 5px;
  border: black solid 1px;
  border-radius: 5px;
  background-color: rgb(251, 251, 251);
}
</style>
