import request from "@/utils/request";
export default {
  search(page, size, searchMap) {
    return request({
      url: "/students/list",
      method: "post",
      data: {
        page,
        size,
        searchMap
      }
    });
  },
  add(student) {
    return request({
      url: "/students",
      method: "post",
      data: {
        ...student
      }
    });
  },
  getById(id) {
    return request({
      url: `/students?id=${id}`,
      method: "get"
    });
  },
  updata(student) {
    return request({
      url: "/students",
      method: "put",
      data: {
        ...student
      }
    });
  },
  delete(id) {
    return request({
      url: "/students",
      method: "delete",
      data: { id }
    });
  }
};
