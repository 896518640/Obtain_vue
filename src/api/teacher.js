import request from "@/utils/request";
export default {
  getList() {
    return request({
      url: "/teacher/list",
      method: "get"
    });
  },
  search(page, size, searchMap) {
    return request({
      url: "/teacher/list",
      method: "post",
      data: {
        page,
        size,
        searchMap
      }
    });
  },
  add(teacher) {
    return request({
      url: "/teacher",
      method: "post",
      data: {
        ...teacher
      }
    });
  },
  getById(id) {
    return request({
      url: `/teacher?id=${id}`,
      method: "get"
    });
  },
  updata(teacher) {
    return request({
      url: "/teacher",
      method: "put",
      data: {
        ...teacher
      }
    });
  },
  delete(id) {
    return request({
      url: "/teacher",
      method: "delete",
      data: { id }
    });
  }
};
