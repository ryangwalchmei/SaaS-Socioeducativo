import email from "infra/email";
import orchestrator from "test/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.deleteAllEmails();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    const firstEmailObject = orchestrator.createEmail();
    const lastEmailObject = orchestrator.createEmail();

    await email.send(firstEmailObject);
    await email.send(lastEmailObject);

    const lastEmail = await orchestrator.getLastEmail();

    expect(lastEmail.sender).toBe(lastEmailObject.from);
    expect(lastEmail.recipients[0]).toBe(lastEmailObject.to);
    expect(lastEmail.subject).toBe(lastEmailObject.subject);
    expect(lastEmail.text).toBe(`${lastEmailObject.text}\n`);
  });
});
