<template>
  <div v-if="houseDetail">
    <!-- Display the house name -->
    <h1>{{ houseDetail.name }}</h1>
    <!-- List of members with links to their details -->
    <ul>
      <li
        class="member-list"
        v-for="member in houseDetail.members"
        :key="member.slug"
      >
        <!-- Link to the person's detail page -->
        <router-link
          :to="{ name: 'PersonDetail', params: { slug: member.slug } }"
        >
          <div class="character-name">{{ member.name }}</div>
        </router-link>
      </li>
    </ul>
  </div>
  <div v-else>
    <!-- Loading indicator while house details are being fetched -->
    Loading house details...
  </div>
</template>

<script>
export default {
  data() {
    return {
      houseDetail: {},
    };
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
  background-color: rgb(251, 251, 251);
  box-shadow: black 0 0 5px;
}
</style>
