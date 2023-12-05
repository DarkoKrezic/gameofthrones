<template>
  <div>
    <h1>Persons</h1>
    <input v-model="search" placeholder="Search characters..." />
    <ul>
      <li
        class="person-list-card"
        v-for="character in filteredCharacters(search)"
        :key="character.slug"
      >
        <!-- Link to the character's detail page -->
        <div class="name">
          <router-link
            :to="{ name: 'PersonDetail', params: { slug: character.slug } }"
          >
            {{ character.name }}
          </router-link>
        </div>
        <!-- Conditionally render the house link if the house data is available -->
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
      // Create a new getter if needed to filter characters based on the search term
      filteredCharacters: "filteredCharacters",
    }),
  },
  created() {
    this.$store.dispatch("fetchCharacters");
  },
};
</script>
<style>
.house {
  font-size: 0.7rem;
  color: rgba(0, 0, 0, 0.688);
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
  padding: 0.5rem;
  margin: 5px;
  border: black solid 1px;
  border-radius: 5px;
  background-color: rgb(251, 251, 251);
  box-shadow: black 0 0 5px;
}
</style>
