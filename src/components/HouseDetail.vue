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
      // Initialize with an empty object that will be filled once the data is fetched
      houseDetail: {},
    };
  },
  beforeRouteEnter(to, from, next) {
    // Call next with a callback which receives the component instance after navigation confirmation
    next((vm) => {
      // Here 'vm' is the component instance that hasn't been created yet when guard was called
      vm.fetchHouseDetailIfNeeded();
    });
  },
  methods: {
    fetchHouseDetailIfNeeded() {
      const house = this.$store.state.houses.find(
        (h) => h.slug === this.$route.params.slug
      );

      // If the house is found in the state, set it to our local houseDetail object
      if (house) {
        this.houseDetail = house;
      } else {
        // If not found, dispatch an action to fetch the house and set it
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
  padding: 0.5rem;
  margin: 5px;
  border: black solid 1px;
  border-radius: 5px;
  background-color: rgb(251, 251, 251);
}
</style>
