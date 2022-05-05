<template>
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
</template>
<script>
export default {
  name: "PageLimit",
  props: {
    modalClose: Function,
    activeImage: Object,
  },
};
</script>
