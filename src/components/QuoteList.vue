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
        <span v-if="item.house">
          of
          <router-link
            class="house-link"
            :to="{ name: 'HouseDetail', params: { slug: item.house.slug } }"
          >
            <div class="house-name">{{ item.house.name }}</div>
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
      return this.$store.state.characters.flatMap((character) =>
        character.quotes.map((quote) => ({
          quote: quote,
          character: character.name,
          slug: character.slug,
          house: character.house,
        }))
      );
    },
  },
  methods: {
    getRandomQuotes() {
      const shuffledQuotes = this.shuffleArray(this.allQuotes);
      this.randomQuotes = shuffledQuotes.slice(0, 5);
    },
    shuffleArray(array) {
      let currentIndex = array.length,
        randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    },
    initQuotes() {
      if (this.$store.state.characters.length === 0) {
        this.$store.dispatch("fetchCharacters").then(() => {
          this.getRandomQuotes();
        });
      } else {
        this.getRandomQuotes();
      }
    },
  },
  created() {
    this.initQuotes();
  },
};
</script>
<style>
/* .house-link {
  font-size: 0.7rem;
  color: rgba(0, 0, 0, 0.601);
} */
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
  background-color: rgba(255, 255, 255, 0.75);
}
.get-new-quotes-button {
  margin-top: 1rem;
}
</style>
