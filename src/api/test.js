import request from "../utils/request";
/* request
  .get("/db.json")
  .then(res => {
    console.log("get1", res.data);
  })
  .catch(e => {
    console.log(e);
  });
request({
  url: "/db.json",
  method: "GET"
}).then(res => {
  console.log("get2", res.data);
});
 */
export default {
  getList() {
    return request({
      url: "/db.json",
      method: "get"
    });
  }
};
