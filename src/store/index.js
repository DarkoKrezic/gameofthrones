import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    houses: [],
    characters: [],
  },
  mutations: {
    SET_HOUSES(state, houses) {
      state.houses = houses;
    },
    SET_CHARACTERS(state, characters) {
      state.characters = characters;
    },
  },
  actions: {
    fetchHouses({ commit, state }) {
      if (state.houses.length === 0) {
        return axios
          .get("https://api.gameofthronesquotes.xyz/v1/houses")
          .then((response) => {
            commit("SET_HOUSES", response.data);
            return response.data;
          })
          .catch((error) => {
            console.error("There was an error fetching the houses:", error);
          });
      } else {
        return Promise.resolve(state.houses);
      }
    },
    fetchCharacters({ commit, state }) {
      if (state.characters.length === 0) {
        return axios
          .get("https://api.gameofthronesquotes.xyz/v1/characters")
          .then((response) => {
            commit("SET_CHARACTERS", response.data);
            return response.data;
          })
          .catch((error) => {
            console.error("There was an error fetching the characters:", error);
          });
      } else {
        return Promise.resolve(state.characters);
      }
    },
  },
  getters: {
    filteredHouses: (state) => (search) => {
      return state.houses.filter((house) =>
        house.name.toLowerCase().includes(search.toLowerCase())
      );
    },
    filteredCharacters: (state) => (search) => {
      if (!search) return state.characters;
      return state.characters.filter((character) =>
        character.name.toLowerCase().includes(search.toLowerCase())
      );
    },
  },
});
