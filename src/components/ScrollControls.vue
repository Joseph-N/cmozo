<template>
  <div>
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
  methods: {
    scrollDiv(direction) {
      let container = document.getElementById('posters'),
        scrollStep = 450;
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
</style>