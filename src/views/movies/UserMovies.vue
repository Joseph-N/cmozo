<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="mb-3 text-gray-900">{{ userProfile.name }} Movies</h4>
      <Previews :collection="userMovies" type="Movie" layout="multi" />
    </div>
  </div>
</template>
<script>
import Previews from '../../components/Previews';
import { mapGetters } from 'vuex';

export default {
  name: 'UserMovies',
  components: {
    Previews
  },
  methods: {
    getProfile() {
      const user_id = this.$route.params.id;

      this.$store
        .dispatch('get_profile', user_id)
        .then(() => {})
        .catch(error => console.log(error));
    },
    getUserMovies() {
      const user_id = this.$route.params.id;

      this.$store
        .dispatch('read_collection', user_id)
        .then(() => {})
        .catch(error => console.log(error));
    }
  },
  created() {
    this.getProfile();
    this.getUserMovies();
  },
  computed: {
    ...mapGetters(['currentUser', 'userProfile', 'userMovies'])
  }
};
</script>
