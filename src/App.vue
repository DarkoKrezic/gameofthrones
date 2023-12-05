<template>
  <div id="app">
    <img alt="GoT Header" src="./assets/GameOfThroneseHeader.jpg" />
    <nav>
      <!-- Navigation Links -->
      <router-link to="/houses">Houses</router-link>
      <router-link to="/persons">Persons</router-link>
      <router-link to="/quotes">Quotes</router-link>
      <!-- Add more links for other sections like Persons, Quotes etc -->
    </nav>
    <!-- Where the matched components will be displayed -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
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
/* Your styles */
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
  text-shadow: #564c4c5a 0 0 5px;
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
h1 {
  color: #ffffff;
  font-size: 2rem;
}
</style>
