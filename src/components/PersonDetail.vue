<template>
  <div v-if="characterDetail">
    <h1 class="character-name">{{ characterDetail.name }}</h1>
    <h2 class="house-name" v-if="characterDetail.house">
      <router-link
        :to="{
          name: 'HouseDetail',
          params: { slug: characterDetail.house.slug },
        }"
      >
        {{ characterDetail.house.name }}
      </router-link>
    </h2>
    <ul>
      <!-- Iterate through currentQuotes and provide links to the PersonDetail route -->
      <li
        class="quote-card"
        v-for="(quoteObj, index) in currentQuotes"
        :key="index"
      >
        <div class="quote">"{{ quoteObj.text }}" -</div>
        <div class="character-link">
          <router-link
            :to="{ name: 'PersonDetail', params: { slug: quoteObj.slug } }"
          >
            {{ quoteObj.character }}
          </router-link>
        </div>
        <div v-if="quoteObj.house" class="house-link">
          <router-link
            :to="{ name: 'HouseDetail', params: { slug: quoteObj.house.slug } }"
          >
            <div class="house-name">{{ quoteObj.house.name }}</div>
          </router-link>
        </div>
      </li>
    </ul>
    <button @click="refreshQuotes">Refresh Quotes</button>
  </div>
  <div v-else>Loading character details...</div>
</template>
<script>
export default {
  data() {
    return {
      currentQuotes: [],
    };
  },
  computed: {
    characterDetail() {
      return this.$store.state.characters.find(
        (character) => character.slug === this.$route.params.slug
      );
    },
  },
  methods: {
    setInitialQuotes(characterDetail) {
      if (characterDetail && characterDetail.quotes) {
        this.currentQuotes = characterDetail.quotes.map((quote) => ({
          text: quote,
          character: characterDetail.name,
          slug: characterDetail.slug,
          house: characterDetail.house,
        }));
      }
    },
    refreshQuotes() {
      // You may want to adjust this logic based on your requirements
      // This sample takes a random character to simulate refreshing quotes
      const otherCharacters = this.$store.state.characters.filter(
        (character) => character.slug !== this.characterDetail.slug
      );
      if (otherCharacters.length === 0) {
        console.error("No other characters found to refresh quotes.");
        return;
      }
      const randomCharacter =
        otherCharacters[Math.floor(Math.random() * otherCharacters.length)];
      this.currentQuotes = randomCharacter.quotes.map((quote) => ({
        text: quote,
        character: randomCharacter.name,
        slug: randomCharacter.slug,
        house: randomCharacter.house,
      }));
    },
    fetchAndSetCharacter() {
      if (!this.characterDetail) {
        this.$store
          .dispatch("fetchCharacters")
          .then(() => this.setInitialQuotes(this.characterDetail))
          .catch((error) =>
            console.error("Failed to fetch character details:", error)
          );
      } else {
        this.setInitialQuotes(this.characterDetail);
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fetchAndSetCharacter();
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchAndSetCharacter();
    next();
  },
  created() {
    this.fetchAndSetCharacter();
  },
};
</script>

<style>
/* Add your CSS styles here */
.character-link {
  font-family: "Game of Thrones", sans-serif;
  color: inherit;
  font-size: 1rem;
  font-style: normal;
}
.character-link:hover {
  transform: scale(1.1);
  transition-duration: 0.5s;
}
.quote {
  font-family: "Grenze Gotisch", sans-serif;
  font-style: italic;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}
.character-name {
  text-shadow: rgba(0, 0, 0, 0.326) 0px 0px 5px;
}
.character-name:hover {
  transform: scale(1.1);
  transition-duration: 0.5s;
}
.house-name {
  text-shadow: rgba(0, 0, 0, 0.326) 0px 0px 5px;
}
.house-name:hover {
  transform: scale(1.1);
  transition-duration: 0.5s;
}
.house-link {
  transform: scale(1.1);
}
</style>
