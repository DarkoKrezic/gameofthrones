<template>
  <div class="audio-player">
    <button @click="togglePlay" class="audio-button">
      <img
        class="audio-icon"
        v-if="isPlaying"
        src="@/assets/pause-icon.png"
        alt="Pause"
      />
      <img class="audio-icon" v-else src="@/assets/play-icon.png" alt="Play" />
    </button>
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
  position: fixed;
  right: 10px;
  top: 10px;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1000;
}
.audio-button {
  background-color: rgba(0, 0, 0, 0);
  border: none;
  cursor: pointer;
  outline: none;
}
.audio-icon {
  height: 40px;

  object-fit: contain;
}
</style>
