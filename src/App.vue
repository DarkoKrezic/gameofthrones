<template>
  <div id="app">
    <img alt="GoT Header" src="./assets/GameOfThroneseHeader.jpg" />
    <audio-player></audio-player>
    <nav>
      <router-link to="/houses">Houses</router-link>
      <router-link to="/persons">Persons</router-link>
      <router-link to="/quotes">Quotes</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import AudioPlayer from "./components/AudioPlayer.vue";
export default {
  name: "App",
  components: { AudioPlayer },
};
</script>

<style>
@font-face {
  font-family: "Game of Thrones";
  src: url("./assets/Game of Thrones.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: Grenze Gotisch;
  src: url("./assets/GrenzeGotisch-VariableFont_wght.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
img {
  display: block;
  margin: auto;
  max-width: 90%;
  max-height: 30vh;
}
#app {
  font-family: "Game of Thrones", sans-serif;
  font-size: 0.8rem;
}
body {
  text-align: center;
  background-color: rgb(0, 0, 0);
}
nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #6961617a;
  color: #fff;
  padding: 1rem;
  font-size: 1.2rem;
  border-radius: 10px;
}
a {
  text-shadow: #ffffffd9 0 0 10px;
  text-decoration: none;
  color: inherit;
}
a:hover {
  transform: scale(1.1);
  transition-duration: 0.5s;
  text-shadow: #f4f7a1f6 0 0 20px;
  color: #fff017;
}
li {
  list-style: none;
}
ul {
  padding: 0;
}
button {
  font-family: Game of Thrones, sans-serif;
  font-size: 0.7rem;
  background-color: bisque;
  border-radius: 5px;
  padding: 0.5rem;
}
button:hover {
  transform: scale(1.1);
  transition-duration: 0.5s;
}
h1,
h2 {
  color: #ffffff;
  font-size: 2rem;
  animation: pulsate-shadow 3s infinite;
  text-align: center;
}
@keyframes pulsate-shadow {
  0%,
  100% {
    text-shadow: 0 0 10px #000, 0 0 20px #000, 0 0 30px #000;
    color: #fff;
  }
  50% {
    text-shadow: 0 0 20px #f6f86fb9, 0 0 30px #ff0800bc, 0 0 40px #ccff007c;
    color: #f5f29a;
  }
}
</style>
