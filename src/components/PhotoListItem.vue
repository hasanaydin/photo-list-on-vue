<template>
  <div class="imageList">
    <div
      v-for="image in imageListFiltered"
      :key="image.id"
      class="imageList-item"
      @click="modalOpen(image)"
    >
      <div class="imageList-item-img">
        <img
          :alt="image.author"
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
</template>
<script>
export default {
  name: "PhotoListItem",
  props: {
    imageListFiltered: Object,
    modalOpen: Function,
  },
};
</script>
