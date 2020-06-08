var scrollMixin = {
  data() {
    return {
      total_pages: 0,
      current_page: 0,
      results: [],
      bottom_reached: false,
      loading: false
    };
  },
  methods: {
    loadMore() {
      const activeLi = document.querySelector('.pagination li.page-item.active');
      const nextPageLi = activeLi.nextSibling;
      const nextPageBtn = nextPageLi.querySelector('button');
      const triggerHeight = 80;
      const hasNext = !nextPageLi.classList.contains('disabled');

      if (hasNext && window.scrollY >= document.body.scrollHeight - window.innerHeight - triggerHeight) {
        this.bottom_reached = true;

        if (!this.loading && nextPageBtn != undefined) {
          nextPageBtn.click();
        }
      } else {
        this.bottom_reached = false;
      }
    }
  },
  created() {
    window.addEventListener('scroll', this.loadMore);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.loadMore);
  }
};
export default scrollMixin;
