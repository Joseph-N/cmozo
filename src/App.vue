<template>
  <div id="wrapper">
    <side-nav></side-nav>
    <!-- content wrapper  -->
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <top-nav></top-nav>
        <!-- Begin page content  -->
        <div class="container-fluid">
          <router-view />
        </div>
      </div>

      <!-- Footer -->
      <footer class="sticky-footer bg-white">
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span>Copyright &copy; CMOZO 2020</span>
          </div>
        </div>
      </footer>
      <!-- End of Footer -->
      <Modal :state="modalState" :embedURL="url" v-on:modal-change="toggleModalState" />
    </div>
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
