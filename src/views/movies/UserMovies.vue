<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="mb-3 text-gray-900">{{ profile.name }} Movies</h4>
      <Previews :collection="movies" type="Movie" layout="multi" />
    </div>
  </div>
</template>
<script>
import firebase from '../../firebase';
import Previews from '../../components/Previews';

export default {
  name: 'UserMovies',
  components: {
    Previews
  },
  data() {
    return {
      profile: {
        name: '',
        avator: ''
      },
      movies: []
    };
  },
  methods: {
    getProfile() {
      const db = firebase.firestore();
      const userID = this.$route.params.id;
      const vm = this;

      db.collection('users')
        .doc(userID)
        .get()
        .then(doc => {
          if (doc.exists) {
            const data = doc.data();

            vm.profile.name = data.name;
            vm.profile.avator = data.avator;
          } else {
            console.log('No such profile was found!');
          }
        })
        .catch(error => {
          console.log('Error getting document: ', error);
        });
    },
    getUserMovies() {
      const vm = this;
      const db = firebase.firestore();
      const userID = this.$route.params.id;

      let query = db.collection('movies').where('user_id', '==', userID);

      query
        .orderBy('timestamp', 'desc')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            vm.movies.push(doc.data());
          });
        });
    }
  },
  created() {
    this.getProfile();
    this.getUserMovies();
  }
};
</script>
