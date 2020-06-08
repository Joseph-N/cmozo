<template>
  <div :class="classObject" :id="`${parent}-controls`">
    <a href="#" class="btn btn-secondary btn-sm paddle to-left" @click.prevent="scrollDiv('left')">
      <i class="fas fa-arrow-left"></i>
    </a>
    <a
      href="#"
      class="btn btn-secondary btn-sm paddle to-right"
      @click.prevent="scrollDiv('right')"
    >
      <i class="fas fa-arrow-right"></i>
    </a>
  </div>
</template>
<script>
export default {
  name: 'ScrollControls',
  props: ['parent'],
  methods: {
    scrollDiv(direction) {
      let container = document.getElementById(`${this.parent}`);
      const cardWidth = document.getElementsByClassName('card')[0].offsetWidth;
      // how much we scroll. get the container visible width, less width of one
      // card and we also minus 10 (padding between each cards).
      let scrollStep = container.offsetWidth - cardWidth - 10;
      let sl = container.scrollLeft,
        cw = container.scrollWidth;

      if (direction === 'right') {
        if (sl + scrollStep >= cw) {
          container.scrollTo(cw, 0);
        } else {
          container.scrollTo(sl + scrollStep, 0);
        }
      }
      if (direction === 'left') {
        if (sl - scrollStep <= 0) {
          container.scrollTo(0, 0);
        } else {
          container.scrollTo(sl - scrollStep, 0);
        }
      }
    },
    toggleVisibility() {
      let container = document.getElementById(`${this.parent}`);
      let controlsContainer = document.getElementById(`${this.parent}-controls`);
      if (container.scrollWidth <= container.offsetWidth) {
        controlsContainer.style.display = 'none';
      } else {
        controlsContainer.style.display = 'block';
      }
    }
  },
  computed: {
    classObject: function() {
      return {
        'season-controls': this.parent === 'Season',
        'default-controls': this.parent != 'Season'
      };
    }
  }
};
</script>
<style>
.paddle {
  position: absolute;
  top: 0;
}
.paddle.to-left {
  right: 55px;
}
.paddle.to-right {
  right: 13px;
}
.season-controls {
  position: absolute;
  top: 25px;
  right: 0;
}
.default-controls {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
