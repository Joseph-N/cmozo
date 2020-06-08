<template>
  <form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-md-0 w-100 navbar-search">
    <div class="input-group w-50">
      <div class="loading" v-if="searching">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
      </div>
      <input
        type="text"
        name="q"
        autocomplete="off"
        v-model.trim="q"
        class="form-control bg-light border small typeahead w-100"
        placeholder="Search Movies, TV Shows, People"
      />
      <div class="input-group-append">
        <button class="btn btn-primary" type="submit" @click.prevent="gotoSearch">
          <i class="fas fa-search fa-sm"></i>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { typeAhead, $ } from '../search';
import { textHelpers } from '../helpers';

export default {
  name: 'SearchForm',
  data() {
    return {
      q: '',
      searching: false
    };
  },
  methods: {
    gotoSearch() {
      if (!this.q.length) return;
      this.$router.push({ path: '/search', query: { q: this.q } }); //.catch(err => {console.log(err); });
    },
    initAutocomplete() {
      const inputEl = $('.typeahead');
      const vm = this;

      typeAhead.init(inputEl);
      inputEl.bind('typeahead:select', function(ev, suggestion) {
        vm.q = suggestion.title;
        document.activeElement.blur();
        const slug = textHelpers.toSlug(suggestion.title);

        vm.$router.push({ name: suggestion.type, params: { id: suggestion.id, slug: slug } });
      });
      inputEl.on('typeahead:asyncrequest', function() {
        vm.searching = true;
      });
      inputEl.on('typeahead:asynccancel typeahead:asyncreceive', function() {
        vm.searching = false;
      });
      inputEl.on('keydown', function(e) {
        if (e.keyCode == 13) {
          typeAhead.close(inputEl);
          vm.gotoSearch();
        }
      });
    }
  },
  mounted() {
    this.initAutocomplete();
  }
};
</script>
<style scoped>
.topbar .navbar-search input {
  font-size: 1rem;
}

.loading-border {
  position: absolute;
  right: 45px;
  display: flex;
  align-items: center;
}
.loading {
  position: absolute;
  right: 45px;
  width: 50px;
  height: 40px;
  text-align: center;
  font-size: 10px;
  z-index: 100;
}

.loading > div {
  background-color: rgb(204, 204, 204);
  height: 100%;
  width: 6px;
  margin-left: 2px;
  display: inline-block;

  -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
  animation: sk-stretchdelay 1.2s infinite ease-in-out;
}

.loading .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.loading .rect3 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

.loading .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.loading .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

@-webkit-keyframes sk-stretchdelay {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.3);
  }
  20% {
    -webkit-transform: scaleY(0.5);
  }
}

@keyframes sk-stretchdelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.3);
    -webkit-transform: scaleY(0.3);
  }
  20% {
    transform: scaleY(0.5);
    -webkit-transform: scaleY(0.5);
  }
}
</style>
<style>
/* custom */
span.twitter-typeahead {
  flex: 1;
}
span.twitter-typeahead .tt-suggestion h5 {
  font-size: 15px;
  margin-bottom: 0px;
}
span.twitter-typeahead .tt-hint {
  color: #ff8c8c;
}

span.twitter-typeahead .tt-dataset legend {
  padding-left: 10px;
  cursor: default;
  font-size: 1.1rem;
}

span.twitter-typeahead .tt-suggestion p {
  font-size: 13px;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

span.twitter-typeahead .tt-suggestion img {
  width: 40px;
}

span.twitter-typeahead .tt-suggestion.media {
  margin-top: 0px;
}

span.twitter-typeahead .tt-menu {
  max-height: 400px;
  overflow-y: auto;
}

span.twitter-typeahead .tt-menu,
span.twitter-typeahead .tt-dropdown-menu {
  cursor: pointer;
  position: absolute;
  top: 45px !important;
  width: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  list-style: none;
  font-size: 14px;
  text-align: left;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-clip: padding-box;
}
span.twitter-typeahead .tt-suggestion {
  padding: 5px 5px 5px 10px;
  clear: both;
  font-weight: normal;
  line-height: 1.42857143;
  color: #333333;
  white-space: nowrap;
}
span.twitter-typeahead .tt-suggestion:not(:first-child) {
  border-top: solid thin #dedede;
}
span.twitter-typeahead .tt-suggestion.tt-cursor,
span.twitter-typeahead .tt-suggestion:hover,
span.twitter-typeahead .tt-suggestion:focus {
  color: #ffffff;
  text-decoration: none;
  outline: 0;
  background-color: #4e5861;
}
span.twitter-typeahead {
  width: 100%;
}
.input-group span.twitter-typeahead {
  display: block !important;
}
.input-group span.twitter-typeahead .tt-menu,
.input-group span.twitter-typeahead .tt-dropdown-menu {
  top: 40px !important;
}
.input-group span.twitter-typeahead:not(:first-child):not(:last-child) .form-control {
  border-radius: 0;
}
.input-group span.twitter-typeahead:first-child .form-control {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.input-group span.twitter-typeahead:last-child .form-control {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>
