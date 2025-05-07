import { defineMessages } from 'react-intl';

const messages = defineMessages({
  logoDropdownGuideItemText: {
    id: 'logo.dropdown.guide.item.text',
    defaultMessage: 'Посібник користувача з гейміфікації',
    description: 'Текст для пункту випадаючого меню, що посилається на посібник користувача з гейміфікації',
  },
  logoDropdownFeedbackItemText: {
    id: 'logo.dropdown.feedback.item.text',
    defaultMessage: 'Надіслати відгук',
    description: 'Текст для пункту випадаючого меню, що посилається на форму або сторінку відгуків',
  },
  logoDropdownFeedbackFormSubjectQuestionText: {
    id: 'logo.dropdown.feedback.form.subject.question.text',
    defaultMessage: 'Задати питання',
    description: 'Мітка для опції форми відгуків, щоб задати питання.',
  },
  logoDropdownFeedbackFormSubjectCommentText: {
    id: 'logo.dropdown.feedback.form.subject.comment.text',
    defaultMessage: 'Залишити коментар',
    description: 'Мітка для опції форми відгуків, щоб залишити коментар.',
  },
  logoDropdownFeedbackFormSubjectBugText: {
    id: 'logo.dropdown.feedback.form.subject.bug.text',
    defaultMessage: 'Повідомити про помилку',
    description: 'Мітка для опції форми відгуків, щоб повідомити про помилку.',
  },
  logoDropdownFeedbackFormSubjectImprovementText: {
    id: 'logo.dropdown.feedback.form.subject.improvement.text',
    defaultMessage: 'Запропонувати покращення',
    description: 'Мітка для опції форми відгуків, щоб запропонувати покращення.',
  },
  logoDropdownFeedbackFormAlertSuccessText: {
    id: 'logo.dropdown.feedback.form.alert.success.text',
    defaultMessage: 'Ваш відгук прийнято до уваги.',
    description: 'Повідомлення, що відображається при успішному надсиланні відгуку.',
  },
  logoDropdownFeedbackFormAlertErrorText: {
    id: 'logo.dropdown.feedback.form.alert.error.text',
    defaultMessage: 'Сервер не відповідає. Будь ласка, спробуйте пізніше.',
    description: 'Повідомлення про помилку, що відображається, коли надсилання відгуку не вдається через проблеми з сервером.',
  },
  logoDropdownFeedbackFormAlertButtonSubmitText: {
    id: 'logo.dropdown.feedback.form.alert.button.submit.text',
    defaultMessage: 'Зрозуміло',
    description: 'Текст для кнопки підтвердження повідомлень про відгук.',
  },
  logoDropdownFeedbackFormButtonSubmitDefaultText: {
    id: 'logo.dropdown.feedback.form.button.submit.default.text',
    defaultMessage: 'Надіслати',
    description: 'Стандартний текст для кнопки надсилання.',
  },
  logoDropdownFeedbackFormMessageLabelText: {
    id: 'logo.dropdown.feedback.form.message.label.text',
    defaultMessage: 'Розкажіть, як ми можемо вам допомогти',
    description: 'Мітка для поля введення повідомлення у формі відгуку.',
  },
  logoDropdownFeedbackFormButtonCancelText: {
    id: 'logo.dropdown.feedback.form.button.cancel.text',
    defaultMessage: 'Скасувати',
    description: 'Текст для кнопки скасування надсилання форми відгуку.',
  },
  logoDropdownFeedbackFormButtonSubmitText: {
    id: 'logo.dropdown.feedback.form.button.submit.text',
    defaultMessage: 'Надіслати відгук',
    description: 'Текст для кнопки надсилання відгуку у формі.',
  },
  dashboardBadgesDependsOnBadgesText: {
    id: 'dashboard.badges.depends.on.badges.text',
    defaultMessage: 'Залежить від бейджів',
    description: 'Мітка, що вказує, що певна функція або елемент залежить від конкретних бейджів.',
  },
  dashboardBadgesDependsOnStatusText: {
    id: 'dashboard.badges.depends.on.status.text',
    defaultMessage: 'Залежить від статусу',
    description: 'Мітка, що вказує, що певна функція або елемент залежить від конкретного статусу.',
  },
  performanceHeadingText: {
    id: 'performance.heading.text',
    defaultMessage: 'Продуктивність',
    description: 'Заголовок сторінки продуктивності',
  },
  performanceBadgesSectionHeadingText: {
    id: 'performance.badges.section.heading.text',
    defaultMessage: 'Ваші бейджі',
    description: 'Заголовок розділу бейджів на сторінці продуктивності',
  },
  performanceSectionCounterText: {
    id: 'performance.section.counter.text',
    defaultMessage: '{completedStatuses} з {totalStatuses}',
    description: 'Текст, що відображає кількість статусів, з заповнювачами для динамічних значень',
  },
  badgesSectionCounterText: {
    id: 'badges.section.counter.text',
    defaultMessage: '{completedBadgeItemsLength} з {badgeItemsLength}',
    description: 'Текст, що відображає кількість елементів або бейджів, з заповнювачами для динамічних значень',
  },
  performanceBadgesEmptyMessageText: {
    id: 'performance.badges.empty.message.text',
    defaultMessage: 'Поки що немає бейджів...',
    description: 'Повідомлення про порожній список, коли список бейджів не містить жодних бейджів',
  },
  performanceBadgesSectionDescriptionText: {
    id: 'performance.badges.section.description.text',
    defaultMessage: 'Ви отримуєте бейджі за певні комбо-дії на платформі. Наведіть курсор на бейдж, щоб дізнатися, що потрібно зробити для його отримання.',
    description: 'Текст, що пояснює, як користувачі можуть заробляти бейджі та як переглядати інструкції, навівши курсор на бейджі',
  },
  performanceBadgesSectionAlertNoBadgesTitle: {
    id: 'performance.badges.section.alert.no-badges.title',
    defaultMessage: 'Ваші нагороди вже в дорозі!',
    description: 'Заголовок для повідомлення-попередження, коли немає доступних бейджів',
  },
  performanceBadgesSectionAlertNoBadgesDescription: {
    id: 'performance.badges.section.alert.no-badges.description',
    defaultMessage: "Ваші заслужені бейджі вже на підході. Будь ласка, зачекайте трохи, і вони з'являться у вашому інвентарі, готові продемонструвати ваші досягнення!",
    description: "Будь ласка, зачекайте трохи, і вони з'являться у вашому інвентарі, готові продемонструвати ваші досягнення!",
  },
  performanceBadgesSectionBadgesButtonText: {
    id: 'performance.badges.section.badges.button.text',
    defaultMessage: 'Бейджі',
    description: 'Текст кнопки для перегляду бейджів у розділі продуктивності',
  },
  performanceAvatarSectionAvatarSetsButtonText: {
    id: 'performance.avatar.section.avatar-sets.button.text',
    defaultMessage: 'Набори аватарів',
    description: 'Текст мітки для доступних наборів аватарів у розділі продуктивності',
  },
  performanceBadgesSectionAllBadgesButtonText: {
    id: 'performance.badges.section.all.badges.button.text',
    defaultMessage: 'Усі бейджі',
    description: 'Текст кнопки для перегляду всіх доступних бейджів у розділі продуктивності',
  },
  performanceBadgesSectionTotalBadgesButtonText: {
    id: 'performance.badges.section.total.badges.button.text',
    defaultMessage: 'Загальна кількість бейджів',
    description: 'Текст мітки для всіх доступних бейджів у розділі продуктивності',
  },
  dashboardProgressBadgeModalEmptyBadgesListTitle: {
    id: 'performance.badges.section.badges.modal.alert.empty-badges-list.title',
    defaultMessage: 'Бейджі вже в дорозі!',
    description: 'Заголовок для повідомлення-попередження, коли в модальному вікні немає доступних бейджів',
  },
  dashboardProgressBadgeModalEmptyBadgesListDescription: {
    id: 'performance.badges.section.badges.modal.alert.empty-badges-list.description',
    defaultMessage: 'Ваші нагороди майже тут! Адміністратор готує для вас особливі бейджі, щоб відзначити ваші досягнення. Зачекайте трохи, і вони з\'являться у вашому інвентарі, готові до використання!',
    description: 'Текст для повідомлення-попередження, коли в модальному вікні немає доступних бейджів',
  },
  performanceAvatarSectionTotalAvatarSetsButtonText: {
    id: 'performance.avatar.section.total.avatar-sets.button.text',
    defaultMessage: 'Загальна кількість наборів аватарів',
    description: 'Текст мітки для всіх доступних наборів аватарів у розділі продуктивності',
  },
  performanceAvatarSectionTitleText: {
    id: 'performance.avatar.section.title.text',
    defaultMessage: 'Ваш аватар',
    description: 'Заголовок розділу аватара на сторінці продуктивності',
  },
  performanceAvatarSectionDescriptionText: {
    id: 'performance.avatar.section.description.text',
    defaultMessage: 'Екіпіруйтеся набором аватара, щоб відстежувати свій шлях! Виконуйте завдання, отримуйте нагороди та підвищуйте рівень свого аватара, долаючи нові завдання.',
    description: 'Текст, що пояснює, як користувачі можуть використовувати набір аватара для відстеження свого прогресу та розблокування нових рівнів аватара',
  },
  performanceBadgesItemImageAlternativeText: {
    id: 'performance.badges.item.image.alternative.text',
    defaultMessage: 'Бейдж лідера',
    description: 'Альтернативний текст для зображення бейджа в розділі продуктивності',
  },
  performanceStatusesSectionHeadingText: {
    id: 'performance.statuses.section.heading.text',
    defaultMessage: 'Ваші статуси',
    description: 'Заголовок розділу статусів на сторінці продуктивності',
  },
  performanceStatusesSectionProgressTrackItemText: {
    id: 'performance.statuses.section.progress-track.item.text',
    defaultMessage: 'Бали прогресу: {pointsCount}',
    description: 'Мітка для елементів відстеження прогресу, що вказує кількість балів прогресу.',
  },
  performanceStatusesSectionDescriptionText: {
    id: 'performance.statuses.section.description.text',
    defaultMessage: 'Чим більше у вас балів, тим вищий ваш статус.',
    description: 'Текст, що пояснює, як статус визначається на основі балів',
  },
  performancePointsDistributionSectionHeadingText: {
    id: 'performance.points.distribution.section.heading.text',
    defaultMessage: 'РОЗПОДІЛ БАЛІВ',
    description: 'Заголовок розділу розподілу балів на сторінці продуктивності',
  },
  performancePointsDistributionSectionDescriptionText: {
    id: 'performance.points.distribution.section.description.text',
    defaultMessage: 'Тут ви можете побачити, які дії вплинули на ваш поточний портфель балів.',
    description: 'Опис того, як працює розподіл балів і як дії впливають на портфель балів',
  },
  performancePointsSeriesName: {
    id: 'performance.points.series.name',
    defaultMessage: 'Частка балів',
    description: 'Мітка для серії на графіку балів продуктивності.',
  },
  performancePointsControlsSaveAsImageLabel: {
    id: 'performance.points.controls.saveAsImage.label',
    defaultMessage: 'Зберегти як зображення',
    description: 'Мітка для кнопки керування "Зберегти як зображення" на графіку балів продуктивності.',
  },
  performancePointsControlsZoomInLabel: {
    id: 'performance.points.controls.zoomIn.label',
    defaultMessage: 'Збільшити',
    description: 'Мітка для кнопки керування масштабуванням на графіку балів продуктивності.',
  },
  performancePointsControlsZoomOutLabel: {
    id: 'performance.points.controls.zoomOut.label',
    defaultMessage: 'Скинути масштаб',
    description: 'Мітка для кнопки керування скиданням масштабу на графіку балів продуктивності.',
  },
  performancePointsControlsLineChartLabel: {
    id: 'performance.points.controls.lineChart.label',
    defaultMessage: 'Переключитися на лінійний графік',
    description: 'Мітка для кнопки керування переключенням на лінійний графік на графіку балів продуктивності.',
  },
  performancePointsControlsBarChartLabel: {
    id: 'performance.points.controls.barChart.label',
    defaultMessage: 'Переключитися на стовпчасту діаграму',
    description: 'Мітка для кнопки керування переключенням на стовпчасту діаграму на графіку балів продуктивності.',
  },
  performancePointsItemProgressLabel: {
    id: 'performance.points.item.progress.label',
    defaultMessage: 'Прогрес',
    description: 'Мітка для елемента прогресу на графіку балів продуктивності.',
  },
  performancePointsItemPointsLabel: {
    id: 'performance.points.item.points.label',
    defaultMessage: 'Бали',
    description: 'Мітка для елемента балів на графіку балів продуктивності.',
  },
  performanceProgressTrackerSectionHeadingText: {
    id: 'performance.progress.tracker.section.heading.text',
    defaultMessage: 'ВІДСТЕЖЕННЯ ПРОГРЕСУ',
    description: 'Заголовок розділу відстеження прогресу на сторінці продуктивності',
  },
  performanceProgressTrackerSectionDescriptionText: {
    id: 'performance.progress.statuses.section.description.text',
    defaultMessage: 'Перегляньте динаміку вашої активності та нарахування балів з часом.',
    description: 'Текст, що пояснює, як відстеження прогресу показує динаміку активності та балів з часом',
  },
  performanceProgressTrackerChartProgressLabel: {
    id: 'performance.progress.tracker.chart.progress.label',
    defaultMessage: 'Бали',
    description: 'Мітка для балів на графіку відстеження прогресу',
  },
  performanceProgressTrackerChartPointsLabel: {
    id: 'performance.progress.tracker.chart.points.label',
    defaultMessage: 'Прогрес',
    description: 'Мітка для прогресу на графіку відстеження прогресу',
  },
  leaderboardHeadingText: {
    id: 'leaderboard.heading.text',
    defaultMessage: 'Таблиця лідерів',
    description: 'Заголовок сторінки таблиці лідерів',
  },
  leaderboardAvatarAltText: {
    id: 'leaderboard.avatar.alt.text',
    defaultMessage: 'Зображення профілю {username}',
    description: 'Альтернативний текст для зображення профілю користувача в таблиці лідерів',
  },
  genericLoaderScreenReaderText: {
    id: 'generic.loader.screenReader.text',
    defaultMessage: 'Завантаження...',
    description: 'Текст для програм зчитування з екрана всередині компонента Loader.',
  },
  genericLogoDropdownImageScreenReaderText: {
    id: 'generic.logo-dropdown.image.screen-reader.text',
    defaultMessage: 'Логотип аналітики',
    description: 'Альтернативний текст для зображення логотипу у випадаючому меню логотипу.',
  },
  dashboardProgressBadgeFigureImageScreenReaderText: {
    id: 'dashboard.progress-badge.figure.image.screen-reader.text',
    defaultMessage: 'Фігура прогресу',
    description: 'Альтернативний текст для зображення бейджа прогресу.',
  },
  dashboardProgressBadgeModalButtonCloseText: {
    id: 'dashboard.progress-badge.modal.button.close.text',
    defaultMessage: 'Закрити',
    description: 'Мітка для кнопки, що використовується для закриття модального вікна бейджа прогресу.',
  },
  dashboardProgressAvatarModalButtonCloseText: {
    id: 'dashboard.progress-avatar.modal.button.close.text',
    defaultMessage: 'Закрити',
    description: 'Мітка для кнопки, що використовується для закриття модального вікна аватара прогресу.',
  },
  dashboardSliderItemInfoIconCompleteScreenReaderText: {
    id: 'dashboard.slider-item.info.icon.complete.screen-reader.text',
    defaultMessage: 'Іконка завершення',
    description: 'Альтернативний текст для зображення завершення елемента слайдера.',
  },
  dashboardSliderItemInfoIconStatusScreenReaderText: {
    id: 'dashboard.slider-item.info.icon.status.screen-reader.text',
    defaultMessage: 'Іконка статусу',
    description: 'Альтернативний текст для зображення статусу елемента слайдера.',
  },
  dashboardProgressAvatarSetModalAvatarSetCardSelectBtn: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.card.select.btn',
    defaultMessage: 'Вибрати',
    description: 'Мітка для кнопки, що використовується для вибору набору аватара в модальному вікні набору аватара прогресу.',
  },
  dashboardProgressAvatarSetModalAvatarSetCardSelectedText: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.card.selected.text',
    defaultMessage: 'Поточний набір аватара',
    description: 'Текст, що відображається, коли набір аватара вибрано в модальному вікні набору аватара прогресу.',
  },
  dashboardProgressAvatarSetModalAvatarSetSupportText: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.support.text',
    defaultMessage: 'Не забудьте натиснути кнопку "Зберегти", щоб застосувати зміни.',
    description: 'Повідомлення підтримки, що відображається в модальному вікні набору аватара прогресу.',
  },
  dashboardProgressAvatarSetModalAvatarSetSaveBtn: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.save.btn',
    defaultMessage: 'Зберегти',
    description: 'Мітка для кнопки, що використовується для збереження вибраного набору аватара в модальному вікні набору аватара прогресу.',
  },
  dashboardProgressAvatarSetModalAvatarSetSuccessText: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.success.text',
    defaultMessage: 'Набір аватара успішно збережено',
    description: 'Повідомлення про успіх, що відображається, коли набір аватара успішно збережено в модальному вікні набору аватара прогресу.',
  },
  dashboardProgressAvatarSetModalAvatarSetErrorText: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.error.text',
    defaultMessage: 'Помилка під час збереження набору аватара',
    description: 'Повідомлення про помилку, що відображається, коли виникає помилка під час збереження набору аватара в модальному вікні набору аватара прогресу.',
  },
  dashboardProgressAvatarSetModalAvatarSetInfoText: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.info.text',
    defaultMessage: 'Виберіть набір аватара для збереження',
    description: 'Інформаційне повідомлення, що відображається, коли в модальному вікні набору аватара прогресу не вибрано набір аватара.',
  },
  dashboardProgressAvatarSetModalAlertAvatarSetNotCompletedTitle: {
    id: 'dashboard.progress-avatar-set.modal.alert.avatar-set-not-completed.title',
    defaultMessage: 'Ваш набір аватара в дорозі!',
    description: 'Заголовок попередження, що відображається, коли вибраний набір аватара не завершено в модальному вікні набору аватара прогресу.',
  },
  dashboardProgressAvatarSetModalAlertAvatarSetNotCompletedText: {
    id: 'dashboard.progress-avatar-set.modal.alert.avatar-set-not-completed.text',
    defaultMessage: 'Завітайте пізніше, щоб розблокувати свій новий вигляд.',
    description: 'Текст, що відображається в повідомленні попередження, коли вибраний набір аватара не завершено в модальному вікні набору аватара прогресу.',
  },
  dashboardProgressAvatarSetModalAlertAvatarSetNotSelectedTitle: {
    id: 'dashboard.progress-avatar-set.modal.alert.avatar-set-not-selected.title',
    defaultMessage: 'Немає аватара – немає квесту!',
    description: 'Заголовок попередження, що відображається, коли в модальному вікні набору аватара прогресу не вибрано набір аватара.',
  },
  dashboardProgressAvatarSetModalAlertAvatarSetNotSelectedText: {
    id: 'dashboard.progress-avatar-set.modal.alert.avatar-set-not-selected.text',
    defaultMessage: 'Виберіть свій набір аватара зараз, щоб розпочати свою подорож, отримувати нагороди та підвищувати рівень, виконуючи завдання.',
    description: 'Текст, що відображається в повідомленні попередження, коли в модальному вікні набору аватара прогресу не вибрано набір аватара.',
  },
  dashboardProgressAvatarSetModalEmptyText: {
    id: 'dashboard.progress-avatar-set.modal.empty.text',
    defaultMessage: 'Немає доступних наборів аватарів. Будь ласка, зверніться до адміністратора курсу, щоб налаштувати набори аватарів.',
    description: 'Відображається, коли жоден набір аватарів не відповідає критеріям фільтра, інструктуючи користувача звернутися до адміністратора курсу для налаштування наборів аватарів.',
  },
  dashboardProgressAvatarSetModalTitle: {
    id: 'dashboard.progress-avatar-set.modal.title',
    defaultMessage: 'Набори аватарів',
    description: 'Заголовок модального вікна набору аватара прогресу.',
  },
  dashboardPointsVaultSectionTitle: {
    id: 'dashboard.points-vault.section.title',
    defaultMessage: 'Ваша скарбничка',
    description: 'Заголовок розділу скарбнички балів.',
  },
  dashboardPointsVaultSectionDescription: {
    id: 'dashboard.points-vault.section.description',
    defaultMessage: 'Кожний квест завершено, кожний виклик подолано! Заробіть цінні бали, виконуючи дії на платформі. Ця безпечна скарбничка захищає ваші зростаючі скарби, відзначаючи кожен крок вашого шляху!',
    description: 'Опис розділу скарбнички балів.',
  },
  dashboardPointsVaultSectionTotalPoints: {
    id: 'dashboard.points-vault.section.total.points',
    defaultMessage: 'Загальна кількість балів:',
    description: 'Мітка для загальної кількості балів у розділі скарбнички балів.',
  },
  genericErrorFallbackBtnText: {
    id: 'generic.error.fallback.btn.text',
    defaultMessage: 'Спробувати знову',
    description: 'Текст для кнопки "Спробувати знову" в компоненті обробки помилок.',
  },
  genericErrorFallbackTitle: {
    id: 'generic.error.fallback.title',
    defaultMessage: 'Щось пішло не так...',
    description: 'Заголовок для компонента обробки помилок.',
  },
  genericErrorFallbackDescription: {
    id: 'generic.error.fallback.description',
    defaultMessage: 'Сталася помилка:',
    description: 'Опис для компонента обробки помилок.',
  },
  leaderboardEmptyTitle: {
    id: 'leaderboard.empty.title',
    defaultMessage: 'Таблиця лідерів порожня',
    description: 'Заголовок для порожнього стану таблиці лідерів.',
  },
  leaderboardEmptyDescription: {
    id: 'leaderboard.empty.description',
    defaultMessage: 'Наразі немає користувачів для відображення в таблиці лідерів. Коли користувачі почнуть взаємодіяти, рейтинги з\'явитимуться тут.',
    description: 'Опис для порожнього стану таблиці лідерів.',
  },
});

export default messages;
