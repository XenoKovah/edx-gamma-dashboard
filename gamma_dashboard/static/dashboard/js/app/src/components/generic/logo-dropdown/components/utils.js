import { useTranslate as translate } from '../../../../i18n/utils';

/**
 * Generates a translations object for a feedback form using a translation function.
 *
 * @returns {Object} An object containing translations for the feedback form.
 * @property {string[]} SUBJECT_LIST - An array of subjects for the feedback form.
 * @property {string} successMessage - A message displayed when the form is submitted successfully.
 * @property {string} errorMessage - A message displayed when there is an error submitting the form.
 * @property {string} confirmButtonText - The text for the confirm button in alerts.
 * @property {string} messageFieldLabel - The label text for the message field.
 * @property {string} cancelButtonText - The text for the cancel button.
 * @property {string} submitButtonText - The text for the submit button.
 */
export const getTranslations = () => ({
  SUBJECT_LIST: [
    translate('logo.dropdown.feedback.form.subject.question.text'),
    translate('logo.dropdown.feedback.form.subject.comment.text'),
    translate('logo.dropdown.feedback.form.subject.bug.text'),
    translate('logo.dropdown.feedback.form.subject.improvement.text'),
  ],
  successMessage: translate('logo.dropdown.feedback.form.alert.success.text'),
  errorMessage: translate('logo.dropdown.feedback.form.alert.error.text'),
  confirmButtonText: translate('logo.dropdown.feedback.form.alert.button.submit.text'),
  messageFieldLabel: translate('logo.dropdown.feedback.form.message.label.text'),
  cancelButtonText: translate('logo.dropdown.feedback.form.button.cancel.text'),
  submitButtonText: translate('logo.dropdown.feedback.form.button.submit.text'),
});
