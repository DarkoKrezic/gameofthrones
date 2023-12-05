<template>
  <div v-if="houseDetail">
    <h1>{{ houseDetail.name }}</h1>
    <img
      v-if="houseDetail.slug"
      :src="houseImageUrl"
      :alt="houseDetail.name"
      class="house-image"
    />
    <ul class="member-grid">
      <li
        class="member-card"
        v-for="member in houseDetail.members"
        :key="member.slug"
      >
        <img
          :src="getMemberImageUrl(member.slug)"
          :alt="member.name"
          class="member-image"
        />
        <router-link
          :to="{ name: 'PersonDetail', params: { slug: member.slug } }"
        >
          <div class="character-name-list">{{ member.name }}</div>
        </router-link>
      </li>
    </ul>
  </div>
  <div v-else>Loading house details...</div>
</template>
<script>
export default {
  data() {
    return {
      houseDetail: {},
    };
  },
  computed: {
    houseImageUrl() {
      return this.houseDetail.slug
        ? require(`@/assets/${this.houseDetail.slug}.png`)
        : "";
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fetchHouseDetailIfNeeded();
    });
  },
  methods: {
    fetchHouseDetailIfNeeded() {
      const house = this.$store.state.houses.find(
        (h) => h.slug === this.$route.params.slug
      );

      if (house) {
        this.houseDetail = house;
      } else {
        this.$store.dispatch("fetchHouses").then(() => {
          this.houseDetail = this.$store.state.houses.find(
            (h) => h.slug === this.$route.params.slug
          );
        });
      }
    },
    getMemberImageUrl(slug) {
      try {
        return require(`@/assets/${slug}.jpg`);
      } catch (e) {
        return require("@/assets/default.png");
      }
    },
  },
};
</script>
<style>
.member-list {
  padding: 1rem;
  margin: 5px;
  border: black solid 1px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.75);
  box-shadow: black 0 0 5px;
}
.member-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  padding: 0;
  list-style-type: none;
}

.member-card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.member-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.member-image {
  width: 100%;
  height: auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.character-name-list {
  padding: 10px;
  text-align: center;
  background-color: #f9f9f9;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
