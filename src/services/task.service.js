import http from "../http-common";

class TaskDataService {
  getAll() {
    return http.get("/tasks");
  }

  get(id) {
    return http.get(`/tasks/${id}`);
  }

  create(data) {

    return http.post("/tasks?taskName="+data.taskName+"&taskDesc="+data.taskDesc, data);
  }

  update(id, data) {
    return http.put(`/tasks/${id}?taskName=`+data.taskname+"&taskDesc="+data.taskdesc+'&status='+data.status, data);

    // return http.put(`/tasks/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tasks/${id}`);
  }

  deleteAll() {
    return http.delete(`/tasks`);
  }

  findByTitle(title) {
    return http.get(`/tasks?title=${title}`);
  }
}

export default new TaskDataService();
