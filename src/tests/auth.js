import chai from "chai";
const expect = chai.expect;
import chaiHttp from "chai-http";
import app from "../app.js";

chai.use(chaiHttp);

describe("authenticate user", () => {
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
      });
    done();
  });
});
