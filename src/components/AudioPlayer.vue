<template>
  <div class="audio-player">
    <button @click="togglePlay" class="audio-button">
      <!-- Switch icon based on whether the music is playing -->
      <img
        class="audio-icon"
        v-if="isPlaying"
        src="@/assets/pause-icon.png"
        alt="Pause"
      />
      <img class="audio-icon" v-else src="@/assets/play-icon.png" alt="Play" />
    </button>
    <!-- Hidden audio element -->
    <audio ref="audio" :src="audioSrc" @ended="isPlaying = false"></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPlaying: false,
      audioSrc:
        "https://res.cloudinary.com/capstoneimages/video/upload/v1701806418/Zoka%20NewReleases/GameOfThrones_vxzp4k.mp3", // URL to your mp3 file
    };
  },
  methods: {
    togglePlay() {
      const audio = this.$refs.audio;

      if (this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      this.isPlaying = !this.isPlaying;
    },
  },
};
</script>

<style scoped>
.audio-player {
  position: fixed; /* Or other positioning as needed */
  right: 10px; /* Positioning offsets */
  top: 10px;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1000; /* Ensures it's above other content */
}
.audio-button {
  background-color: rgba(0, 0, 0, 0);
  border: none;
  cursor: pointer;
  outline: none;
  width: 10vw;
}
.audio-icon {
  height: 60px;

  object-fit: contain;
}
</style>
