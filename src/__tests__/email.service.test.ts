import { jest, describe, it, expect } from "@jest/globals";

jest.unstable_mockModule("ioredis", () => ({
  Redis: jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    quit: jest.fn(),
    disconnect: jest.fn(),
    status: 'ready',
  })),
  default: jest.fn(),
}));

jest.unstable_mockModule("../modules/email/email.queue.js", () => ({
  emailQueue: {
    addBulk: jest.fn(),
  },
}));

const { EmailService } = await import("../modules/email/email.service.js");
const { emailQueue } = await import("../modules/email/email.queue.js");

describe("EmailService", () => {
  const service = new EmailService();

  it("should enqueue batch emails", async () => {
    const emails = [
      { to: "a@test.com", subject: "A", body: "Hello" },
      { to: "b@test.com", subject: "B", body: "Hi" },
    ];

    await service.sendBatchEmails(emails);

    expect(emailQueue.addBulk).toHaveBeenCalledTimes(1);
    expect(emailQueue.addBulk).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ data: emails[0] }),
      ])
    );
  });

  it("should throw error for empty batch", async () => {
    await expect(service.sendBatchEmails([])).rejects.toThrow(
      "Invalid batch payload"
    );
  });
});