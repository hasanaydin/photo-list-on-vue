<template>
  <Modal :modalClose="modalClose" :activeImage="activeImage" />
  <PhotoListItem
    :imageListFiltered="imageListFiltered"
    :modalOpen="modalOpen"
  />

  <div class="footer">
    <PageLimit :setLimit="setLimit" />
    <PageNumber
      :totalPage="totalPage"
      :activePageNumber="activePageNumber"
      :pageSetter="setPages"
    />
    <PhotoListFilter
      @select="filterImage"
      :authorList="authorList"
      :activeAuthor="activeAuthor"
    />
  </div>
</template>

<script>
import axios from "axios";

import PhotoListFilter from "./PhotoListFilter.vue";

import PageNumber from "./PageNumber.vue";
import PageLimit from "./PageLimit.vue";
import Modal from "./Modal.vue";
import PhotoListItem from "./PhotoListItem.vue";
export default {
  name: "PhotoList",
  methods: {
    modalOpen(image) {
      this.activeImage = image;
    },
    modalClose() {
      this.activeImage = [];
    },
    setLimit(event) {
      this.pageLimit = event.target.value;
      this.imageListFiltered = this.imageList;
      this.activeAuthor = "all";
      this.setPages(1);
    },
    filterImage(value) {
      if (value == "all") {
        this.imageListFiltered = this.imageList;
        this.setPages(this.activePageNumber);
        this.activeAuthor = "all";
        return;
      }
      this.imageListFiltered = this.imageList.filter(
        (image) => image.author == value
      );
      this.activeAuthor = value;
      this.setPages(this.activePageNumber);
    },
    setPages(pageNumber) {
      let list =
        this.activeAuthor == "all" ? this.imageList : this.imageListFiltered;

      this.totalPage = Math.ceil(list.length / this.pageLimit);
      this.activePageNumber = pageNumber;

      this.imageListFiltered = list.slice(
        (this.activePageNumber - 1) * this.pageLimit,
        this.activePageNumber * this.pageLimit
      );
    },
  },

  components: {
    PhotoListFilter,
    PageNumber,
    PageLimit,
    Modal,
    PhotoListItem,
  },
  props: {
    image: Object,
  },
  data() {
    return {
      imageList: [],
      imageListFiltered: [],
      activeImage: [],
      pageLimit: 20,
      totalPage: 0,
      activePageNumber: 1,
      filterName: "",
      authorList: [],
      activeAuthor: "all",
    };
  },

  async mounted() {
    const { data } = await axios.get("https://picsum.photos/v2/list?limit=100");
    this.imageList = data;
    this.imageListFiltered = data;
    this.authorList = Array.from(new Set(data.map((item) => item.author)));
    this.setPages(1);
  },
};
</script>
<style scoped>
@import "../assets/styles/css.scss";
</style>
