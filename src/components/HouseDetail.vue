<template>
  <div v-if="houseDetail">
    <h1>{{ houseDetail.name }}</h1>
    <img
      v-if="houseDetail.slug"
      :src="houseImageUrl"
      :alt="houseDetail.name"
      class="house-image"
    />
    <ul>
      <li
        class="member-list"
        v-for="member in houseDetail.members"
        :key="member.slug"
      >
        <router-link
          :to="{ name: 'PersonDetail', params: { slug: member.slug } }"
        >
          <div class="character-name">{{ member.name }}</div>
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
</style>
