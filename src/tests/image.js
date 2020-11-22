import chai from "chai";
const expect = chai.expect;
const assert = chai.assert;
import chaiHttp from "chai-http";
import app from "../app.js";

chai.use(chaiHttp);

let token;

describe("return resized image", () => {
  it("should succesfully aunthenticate user and return token", (done) => {
    chai
      .request(app)
      .post("/login")
      .send({
        user: {
          username: "randomusername",
          password: "randompassword",
        },
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body.success).to.be.true;
        expect(body.token).to.be.a("string");
        token = body.token;
      });
    done();
  });

  it("should succesfully download and resize image", (done) => {
    return chai
      .request(app)
      .post("/resize")
      .set({ Authorization: `Bearer ${token}` })
      .send({
        url:
          "https://i.pinimg.com/originals/83/a7/8d/83a78d4a0e090098abdab60d77ea582e.jpg",
      })
      .then((res) => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch(done());
  });

  it("return an error if an invalid image url is given", (done) => {
    return chai
      .request(app)
      .post("/resize")
      .set({ Authorization: `Bearer ${token}` })
      .send({
        url: "hello.jpg",
      })
      .then((res) => {
        const { body } = res;
        expect(body.success).to.equal(true);
        expect(body.message).to.equal("Please provide a valid image Url");
        done();
      })
      .catch(done());
  });
});
