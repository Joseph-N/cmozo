<template>
  <div id="app">
    <TopNav />
    <div class="container-fluid">
      <div class="row">
        <SideNav />
        <main class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <router-view />
        </main>
      </div>
    </div>
    <Modal :state="modalState" :embedURL="url" v-on:modal-change="toggleModalState" />
  </div>
</template>

<script>
import SideNav from '@/components/SideNav';
import TopNav from '@/components/TopNav';
import Modal from '@/components/Modal';

export default {
  components: {
    SideNav,
    TopNav,
    Modal
  },
  data() {
    return {
      modalState: 'closed',
      url: null
    };
  },
  methods: {
    toggleModalState(state) {
      this.modalState = state;
    }
  },
  mounted() {
    // When the user clicks anywhere outside of the modal, close it
    const modal = document.getElementById('myModal');
    const vm = this;
    window.onclick = event => {
      if (event.target == modal) {
        vm.toggleModalState('closed');
      }
    };

    vm.$root.$on('open-modal', key => {
      vm.toggleModalState('opened');
      vm.url = `https://www.youtube.com/embed/${key}`;
    });
  }
};
</script>
