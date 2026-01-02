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

jest.unstable_mockModule("bullmq", () => ({
  Queue: jest.fn(),
  Worker: jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    close: jest.fn(),
  })),
}));

jest.unstable_mockModule("../modules/email/email.provider.js", () => ({
  EmailProvider: jest.fn().mockImplementation(() => ({
    sendMail: jest.fn(),
  })),
}));

const { EmailProvider } = await import("../modules/email/email.provider.js");

describe("Email Worker", () => {
  it("should send email using provider", async () => {
    const provider = new EmailProvider() as jest.Mocked<InstanceType<typeof EmailProvider>>;

    provider.sendMail.mockResolvedValueOnce({} as any);

    await provider.sendMail("a@test.com", "Hello", "<p>Hi</p>");

    expect(provider.sendMail).toHaveBeenCalledWith(
      "a@test.com",
      "Hello",
      "<p>Hi</p>"
    );
  });
});