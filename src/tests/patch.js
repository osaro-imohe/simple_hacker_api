import chai from "chai";
const expect = chai.expect;
import chaiHttp from "chai-http";
import app from "../app.js";

chai.use(chaiHttp);

let token;

describe("patch JSON object", () => {
  it("should succesfully return patched  data for JSON object", (done) => {
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
        chai
          .request(app)
          .post("/patch")
          .set({ Authorization: `Bearer ${token}` })
          .send({
            jsonObject: {
              baz: "qux",
              foo: "bar",
            },
            jsonPatch: [{ op: "replace", path: "/baz", value: "boo" }],
          })
          .end((err, res) => {
            if (err) done();
            const { body } = res;
            expect(body.success).to.be.true;
            expect(body.message).to.equal("JSON object patched successfully");
            expect(body.patchedDoc.baz).to.equal("boo");
            expect(body.patchedDoc.foo).to.equal("bar");
          });
      });
    done();
  });

  it("should return error on invalid JSON object input", (done) => {
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
        chai
          .request(app)
          .post("/patch")
          .set({ Authorization: `Bearer ${token}` })
          .send({
            jsonObject: {},
            jsonPatch: [{ op: "replace", path: "/baz", value: "boo" }],
          })
          .end((err, res) => {
            if (err) done();
            const { body } = res;
            expect(body.success).to.be.false;
            expect(body.message).to.equal("Please provide a JSON Object");
          });
        done();
      });
  });

  it("should return error on invalid JSON patch input", (done) => {
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
        chai
          .request(app)
          .post("/patch")
          .set({ Authorization: `Bearer ${token}` })
          .send({
            jsonObject: {
              baz: "qux",
              foo: "bar",
            },
            jsonPatch: [],
          })
          .end((err, res) => {
            if (err) done();
            const { body } = res;
            expect(body.success).to.be.false;
            expect(body.message).to.equal("Please provide a JSON Patch");
          });
        done();
      });
  });
});
