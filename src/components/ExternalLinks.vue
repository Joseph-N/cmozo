<template>
  <ul class="list-inline">
    <li class="list-inline-item external-links" v-for="link in links" :key="link.url">
      <a :href="link.url" target="_blank">
        <i class="fab" :class="link.icon"></i>
      </a>
    </li>

    <li class="list-inline-item border-left pl-3 external-links" v-if="homepage">
      <a :href="homepage" target="_blank">
        <i class="fas fa-link"></i>
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'ExternalLinks',
  props: ['ids', 'homepage'],
  computed: {
    links() {
      if (!this.ids) return [];
      const links = [];
      const keys = Object.keys(this.ids);
      keys.forEach(key => {
        //   if(key.match(/imdb/)) {
        //       links.push({icon: 'imdb', url: `https://www.imdb.com/title/${}`})
        //   }
        let link_id = this.ids[key];
        if (key.match(/facebook/) && link_id) {
          links.push({ icon: 'fa-facebook-square', url: `https://www.facebook.com/${link_id}` });
        }
        if (key.match(/twitter/) && link_id) {
          links.push({ icon: 'fa-twitter', url: `https://twitter.com/${link_id}` });
        }
        if (key.match(/instagram/) && link_id) {
          links.push({ icon: 'fa-instagram', url: `https://instagram.com/${link_id}` });
        }
      });
      return links;
    }
  }
};
</script>
<style scoped>
li.external-links {
  font-size: 1.6rem;
  margin-right: 20px;
}
li.external-links a {
  color: #000;
}
</style>
