import { reactive } from "vue";
import axios from "axios";
const state = reactive({
  data: [],
  activePage: [],
  page: 1,
  limit: 5,
});
export function getImages() {
  return axios
    .get(
      `https://picsum.photos/v2/list?page=${state.page}&limit=${state.limit}`
    )
    .then(function (response) {
      console.log(response);
      return response;
    });
}

export function setPage(page) {
  state.page = page;
}
export function setLimit(limit) {
  state.limit = limit;
}
