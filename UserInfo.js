class UserInfo {
  constructor(userName, userJob, name, job) {
    this.userName = userName;
    this.userJob = userJob;
    this.name = name;
    this.job = job;
  }

  setUserInfo() { //отображает текущие данные
    this.name.value = this.userName.textContent;
    this.job.value = this.userJob.textContent;
  }

  updateUserInfo() { //обновляет данные
    this.userName.textContent = this.name.value;
    this.userJob.textContent = this.job.value;
  }
}