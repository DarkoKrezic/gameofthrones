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
        <div class="name">
          <router-link
            :to="{ name: 'PersonDetail', params: { slug: character.slug } }"
          >
            {{ character.name }}
          </router-link>
        </div>
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
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 0.5rem 0.5rem;
  border: black solid 1px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.75);
}
</style>
