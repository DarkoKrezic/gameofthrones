<template>
  <div>
    <h1>Persons</h1>
    <input v-model="search" placeholder="Search characters..." />
    <ul class="person-grid">
      <li
        class="person-list-card"
        v-for="character in filteredCharacters(search)"
        :key="character.slug"
      >
        <div class="name">
          <router-link
            :to="{ name: 'PersonDetail', params: { slug: character.slug } }"
          >
            {{ character.name }}
          </router-link>
        </div>
        <!-- Character Image -->
        <img
          :src="getCharacterImageUrl(character)"
          alt="character.name"
          class="character-image"
        />

        <span v-if="character.house">
          of
          <router-link
            :to="{
              name: 'HouseDetail',
              params: { slug: character.house.slug },
            }"
          >
            <div className="house">{{ character.house.name }}</div>
          </router-link>
        </span>
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
    ...mapGetters({
      filteredCharacters: "filteredCharacters",
    }),
  },
  methods: {
    getCharacterImageUrl(character) {
      try {
        // Try to require the image based on the character's slug
        return require(`@/assets/${character.slug}.jpg`);
      } catch (e) {
        // If there is an error, (image not found), return a default image
        return require(`@/assets/default.png`);
      }
    },
  },
  created() {
    this.$store.dispatch("fetchCharacters");
  },
};
</script>
<style>
.person-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem; /* This adds space between the grid items */
  list-style-type: none; /* Removes default list item styling */
  padding: 0; /* Removes default padding */
}
.house {
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.688);
  text-shadow: #fdfdfdf6 0 0 20px;
}
.house:hover {
  transform: scale(1.1);
  transition: 0.5s;
}
.name {
  padding: 0.5rem;
  font-size: 1rem;
}
.name:hover {
  transform: scale(1.1);
  transition: 0.5s;
}
.person-list-card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 0.5rem 0.5rem;
  border: black solid 1px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5);
}
.character-image {
  border-radius: 10px;
  padding-bottom: 1rem;
}
</style>
