import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

// spies = espiões

const createFeedbackSpy = jest.fn();

const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {

   await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,.sfafsafjasfas'
    })).resolves.not.toThrow();
  });

  expect(createFeedbackSpy).toHaveBeenCalled();
  expect(sendMailSpy).toHaveBeenCalled();

  it('should not be able to submit feedback without type', async () => {
    const submitFeedback = new SubmitFeedbackUseCase(
      { create: async () => { } },
      { sendMail: async () => { } }
    )

   await expect(submitFeedback.execute({
     type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,.sfafsafjasfas'
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback without comment', async () => {
    const submitFeedback = new SubmitFeedbackUseCase(
      { create: async () => { } },
      { sendMail: async () => { } }
    )

   await expect(submitFeedback.execute({
     type: 'bug',
      comment: '',
      screenshot: 'data:image/png;base64,.sfafsafjasfas'
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback with an invalid screenshot', async () => {
    const submitFeedback = new SubmitFeedbackUseCase(
      { create: async () => { } },
      { sendMail: async () => { } }
    )

   await expect(submitFeedback.execute({
     type: 'bug',
      comment: 'fsafasfs',
      screenshot: '123sfafsafjasfas'
    })).rejects.toThrow();
  });
})