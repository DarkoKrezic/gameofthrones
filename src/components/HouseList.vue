<template>
  <div>
    <h1>Houses</h1>
    <input v-model="search" placeholder="Search houses..." />
    <ul class="house-grid">
      <li
        class="house-item"
        v-for="house in filteredHouses(search)"
        :key="house.slug"
      >
        <router-link
          :to="{ name: 'HouseDetail', params: { slug: house.slug } }"
        >
          <img
            :src="require(`@/assets/${house.slug}.png`)"
            :alt="`House ${house.name}`"
            class="house-image"
          />
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
.house-item {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 0.5rem 0.5rem;
  border: black solid 1px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.439);
}
.house-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem; /* This adds space between the grid items */
  list-style-type: none; /* Removes default list item styling */
  padding: 0; /* Removes default padding */
}
</style>
