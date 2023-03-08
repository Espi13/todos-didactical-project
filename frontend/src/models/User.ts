export default class User {
  id: number;
  email: string;
  username: string;
  jwt: string;

  constructor(id: number, email: string, username: string, jwt: string) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.jwt = jwt;
  }
}
