<template>
  <div class="imageList">
    <div class="modal" v-if="activeImage.length != 0">
      <div class="modalBackground" @click="modalClose()"></div>
      <div class="modal-item">
        <div class="modal-closeBtn" @click="modalClose()"></div>
        <div class="modal-img">
          <img
            :alt="activeImage.author"
            :src="'https://picsum.photos/id/' + activeImage.id + '/734/534'"
          />
        </div>
        <div class="modal-descriptionContainer">
          <div class="modal-author">
            {{ activeImage.author }}
          </div>
          <a class="modal-detailBtn" :href="activeImage.url" target="_blank"
            >Show Detail</a
          >
        </div>
      </div>
    </div>
    <div
      v-for="image in imageListFiltered"
      :key="image.id"
      class="imageList-item"
      @click="modalOpen(image)"
    >
      <div class="imageList-item-img">
        <img
          :alt="activeImage.author"
          :src="'https://picsum.photos/id/' + image.id + '/367/267'"
        />
      </div>
      <div class="imageList-item-descriptionContainer">
        <div class="imageList-item-author">
          {{ image.author }}
        </div>
        <div class="imageList-item-id">
          {{ image.id }}
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    <div class="footer-limit">
      <select @change="setLimit($event)" class="footer-limitOption">
        <option>25</option>
        <option>50</option>
        <option>75</option>
        <option>100</option>
      </select>
    </div>

    <div class="footer-pagination">
      <div v-for="page in totalPage" :key="page" @click="setPages(page)">
        <div
          class="footer-paginationItem footer-paginationItem-active"
          v-if="page === activePageNumber"
        >
          {{ page }}
        </div>
        <div class="footer-paginationItem" v-else>{{ page }}</div>
      </div>
    </div>
    <div class="footer-filter">
      <select
        @change="filterImage($event)"
        class="footer-filterOption"
        v-model="activeAuthor"
      >
        <option value="all">All Authors</option>
        <option v-for="author in authorList" :key="author.id" :value="author">
          {{ author }}
        </option>
      </select>
    </div>
  </div>

  <!-- 
    <PhotoDetail :image="{ image }" />
    -->
</template>

<script>
import axios from "axios";
//import { getImages, setLimit, setPage } from "../../lib/getPhotos.js";

//setLimit(60);
//setPage(3);
//let imageList = getImages();

//import PhotoDetail from "./PhotoDetail.vue";
/*
let imageList = axios
  .get(`https://picsum.photos/v2/list?page=1&limit=100`)
  .then(function (response) {
    return response;
  });
console.log(imageList);
export default {
  name: "photoList",
  data() {
    return {
      imageList: null,
    };
  },
};
*/

export default {
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
    filterImage(event) {
      if (event.target.value == "all") {
        this.imageListFiltered = this.imageList;
        this.setPages(this.activePageNumber);
        return;
      }
      this.imageListFiltered = this.imageList.filter(
        (image) => image.author == event.target.value
      );

      this.setPages(this.activePageNumber);
    },
    setPages(pageNumber) {
      let list =
        this.activeAuthor == "all" ? this.imageList : this.imageListFiltered;
      console.log(list.length / this.pageLimit);
      this.totalPage = Math.ceil(list.length / this.pageLimit);
      this.activePageNumber = pageNumber;

      this.imageListFiltered = list.slice(
        (this.activePageNumber - 1) * this.pageLimit,
        this.activePageNumber * this.pageLimit
      );
    },
  },
  name: "App",
  components: {
    //PhotoDetail,
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
