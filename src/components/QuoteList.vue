<template>
  <div>
    <ul>
      <li class="quote-card" v-for="(item, index) in randomQuotes" :key="index">
        <div class="quote-text">"{{ item.quote }}" -</div>
        <div class="character-name">
          <router-link
            class="person-link"
            :to="{ name: 'PersonDetail', params: { slug: item.slug } }"
          >
            {{ item.character }}
          </router-link>
        </div>
        <span class="house-name" v-if="item.house">
          of
          <router-link
            class="house-link"
            :to="{ name: 'HouseDetail', params: { slug: item.house.slug } }"
          >
            {{ item.house.name }}
          </router-link>
        </span>
      </li>
    </ul>
    <button @click="getRandomQuotes" class="get-new-quotes-button">
      Get New Quotes
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      randomQuotes: [],
    };
  },
  computed: {
    allQuotes() {
      // Create an array of objects containing the quote and character's name
      return this.$store.state.characters.flatMap((character) =>
        character.quotes.map((quote) => ({
          quote: quote,
          character: character.name,
          slug: character.slug, // You also need the slug to create the router-link
          house: character.house,
        }))
      );
    },
  },
  methods: {
    getRandomQuotes() {
      const shuffledQuotes = this.shuffleArray(this.allQuotes);
      this.randomQuotes = shuffledQuotes.slice(0, 5); // Get the first 5 random quotes
    },
    shuffleArray(array) {
      // Fisher-Yates shuffle algorithm
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    },
    // Fetch new quotes from the API if the store is empty
    initQuotes() {
      if (this.$store.state.characters.length === 0) {
        this.$store.dispatch("fetchCharacters").then(() => {
          // After characters are fetched, get the random quotes
          this.getRandomQuotes();
        });
      } else {
        // If characters are already available, get the random quotes directly
        this.getRandomQuotes();
      }
    },
  },
  // When the component is created, initialize with 5 random quotes
  created() {
    this.initQuotes();
  },
};
</script>
<style>
.house-link {
  font-size: 0.7rem;
  color: rgba(0, 0, 0, 0.601);
}
.person-link {
  color: rgb(0, 0, 0);
  margin: 1rem 0;
  font-size: 1rem;
}

.quote-text {
  font-family: Grenze Gotisch;
  font-size: 1.2rem;
  font-style: italic;
  padding-bottom: 1.5rem;
}
.quote-card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 0.5rem 0.5rem;
  border: black solid 1px;
  border-radius: 10px;
  box-shadow: black 0 0 5px;
  background-color: rgba(255, 255, 255, 0.75);
}
.get-new-quotes-button {
  margin-top: 1rem;
}
</style>
