<template>
  <div class="search w-50">
    <input
      class="form-control form-control-dark typeahead"
      name="q"
      type="text"
      autocomplete="off"
      v-model.trim="q"
      placeholder="Search Movies, TV Shows, People"
      @keyup.enter="gotoSearch"
    />
  </div>
</template>

<script>
import { typeAhead, $ } from '../js/search/';

export default {
  name: 'SearchForm',
  data() {
    return {
      q: ''
    };
  },
  methods: {
    gotoSearch() {
      if (!this.q.length) return;
      // let slug = slugify(this.q);
      this.$router.push({ path: 'search', query: { q: this.q } });
    },
    initAutocomplete() {
      const inputEl = $('.typeahead');
      const vm = this;

      typeAhead.init(inputEl);
      inputEl.bind('typeahead:select', function(ev, suggestion) {
        vm.q = suggestion.title;
        document.activeElement.blur();
        vm.$router.push({ name: suggestion.type, params: { id: suggestion.id } });
      });
    }
  },
  mounted() {
    this.initAutocomplete();
  }
};
</script>
<style scoped>
.form-control {
  padding: 0.75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}
</style>
<style>
/* custom */
span.twitter-typeahead .tt-suggestion h5 {
  font-size: 15px;
  margin-bottom: 0px;
}
span.twitter-typeahead .tt-hint {
  color: #949494;
}

span.twitter-typeahead .tt-dataset legend {
  padding-left: 10px;
  cursor: default;
  font-size: 1.1rem;
}

span.twitter-typeahead .tt-input {
  color: #f3f3f3;
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
.input-group.input-group-lg span.twitter-typeahead .form-control {
  height: 46px;
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.3333333;
  border-radius: 6px;
}
.input-group.input-group-sm span.twitter-typeahead .form-control {
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
}
span.twitter-typeahead {
  width: 100%;
}
.input-group span.twitter-typeahead {
  display: block !important;
  height: 34px;
}
.input-group span.twitter-typeahead .tt-menu,
.input-group span.twitter-typeahead .tt-dropdown-menu {
  top: 32px !important;
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
.input-group.input-group-sm span.twitter-typeahead {
  height: 30px;
}
.input-group.input-group-sm span.twitter-typeahead .tt-menu,
.input-group.input-group-sm span.twitter-typeahead .tt-dropdown-menu {
  top: 30px !important;
}
.input-group.input-group-lg span.twitter-typeahead {
  height: 46px;
}
.input-group.input-group-lg span.twitter-typeahead .tt-menu,
.input-group.input-group-lg span.twitter-typeahead .tt-dropdown-menu {
  top: 46px !important;
}
</style>
