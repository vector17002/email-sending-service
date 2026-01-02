import { jest, describe, it, expect } from "@jest/globals";
import request from "supertest";
import express from "express";

jest.unstable_mockModule("ioredis", () => ({
  Redis: jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    quit: jest.fn(),
    disconnect: jest.fn(),
    status: 'ready',
  })),
  default: jest.fn(),
}));

jest.unstable_mockModule("../modules/email/email.service.js", () => ({
  EmailService: jest.fn().mockImplementation(() => ({
    sendBatchEmails: jest.fn().mockResolvedValue(undefined),
  })),
}));

const { default: emailRoutes } = await import("../modules/email/email.routes.js");

const app = express();
app.use(express.json());
// Check if emailRoutes is a router/function or object with default
app.use("/email", emailRoutes);

describe("EmailController", () => {
  it("should return 202 when batch is queued", async () => {
    const res = await request(app)
      .post("/email/send-batch")
      .send({
        emails: [{ to: "a@test.com", subject: "Hi", body: "Hello" }],
      });

    expect(res.status).toBe(202);
    expect(res.body.success).toBe(true);
  });
});