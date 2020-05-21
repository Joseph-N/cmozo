<template>
  <!-- The Modal -->
  <div id="myModal" class="modal-box">
    <!-- Modal content -->
    <div class="modal-content-box">
      <span class="modal-close">&times;</span>
      <div class="embed-responsive embed-responsive-16by9" v-if="embedURL">
        <iframe class="embed-responsive-item" :src="`${embedURL}?autoplay=${autoplay}`" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Modal',
  props: ['state', 'embedURL'],
  data() {
    return {
      autoplay: 0
    };
  },
  methods: {
    openModal() {
      this.autoplay = 1;
      const modal = document.getElementById('myModal');
      modal.style.display = 'block';
    },
    closeModal() {
      this.autoplay = 0;
      const modal = document.getElementById('myModal');
      modal.style.display = 'none';
      // stop video after close
    }
  },
  watch: {
    state: function() {
      if (this.state == 'opened') {
        this.openModal();
      }
      if (this.state == 'closed') {
        this.closeModal();
      }
    }
  },
  mounted() {
    const span = document.getElementsByClassName('modal-close')[0];
    const vm = this;
    // When the user clicks on <span> (x), close the modal
    span.onclick = () => {
      vm.$emit('modal-change', 'closed');
    };
  }
};
</script>
<style scoped>
.modal-box {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 100; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  /* overflow: auto; Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content-box {
  background-color: #fefefe;
  padding: 5px;
  margin: 15% auto; /* 15% from the top and centered */
  width: 50%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.modal-close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  margin-top: -45px;
}

.modal-close:hover,
.modal-close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
/* Add Animation */
@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}
</style>
