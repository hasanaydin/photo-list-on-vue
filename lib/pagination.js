import { ref, computed } from "vue";

export default function handlePagination(originalData) {
  console.log(originalData);
  let page = ref(1);

  const data = originalData.map((item) => {
    return { index: item, value: `this_${item}` };
  });

  const perPage = 10;

  const paginatedData = computed(() =>
    data.slice((page.value - 1) * perPage, page.value * perPage)
  );

  return { data, paginatedData, perPage, page, nextPage, backPage, goToPage };
}
