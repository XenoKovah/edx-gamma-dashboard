import { defineMessages } from 'react-intl';

const messages = defineMessages({
  logoDropdownFeedbackFormButtonSubmitDefaultText: {
    id: 'logo.dropdown.feedback.form.button.submit.default.text',
    defaultMessage: 'Submit',
    description: 'Default text for the submit button.',
  },
  logoDropdownFeedbackFormButtonCancelText: {
    id: 'logo.dropdown.feedback.form.button.cancel.text',
    defaultMessage: 'Cancel',
    description: 'Text for the button to cancel feedback form submission.',
  },
  dashboardBadgesDependsOnBadgesText: {
    id: 'dashboard.badges.depends.on.badges.text',
    defaultMessage: 'Depends on accomplishments',
    description: 'Label indicating that a certain feature or element depends on specific badges.',
  },
  dashboardBadgesDependsOnStatusText: {
    id: 'dashboard.badges.depends.on.status.text',
    defaultMessage: 'Depends on status',
    description: 'Label indicating that a certain feature or element depends on a specific status.',
  },
  dashboardBadgesManualCriteriaText: {
    id: 'dashboard.badges.manual.criteria.text',
    defaultMessage: 'Manual assignment criteria',
    description: 'Label prefacing the manual assignment criteria shown on hover for manual-only badges.',
  },
  dashboardBadgesPointsForCompletionText: {
    id: 'dashboard.badges.points.for.completion.text',
    defaultMessage: 'Points for completion: {points}',
    description: 'Shows how many points a badge grants when it is earned, on the badge hover popover.',
  },
  performanceHeadingText: {
    id: 'performance.heading.text',
    defaultMessage: 'Performance',
    description: 'Performance page heading text',
  },
  performanceBadgesSectionHeadingText: {
    id: 'performance.badges.section.heading.text',
    defaultMessage: 'Your Accomplishments',
    description: 'Heading text for the badges section on the performance page',
  },
  performanceSectionCounterText: {
    id: 'performance.section.counter.text',
    defaultMessage: '{completedStatuses} of {totalStatuses}',
    description: 'Text displaying a count of completed statuses and total statuses, with placeholders for dynamic values',
  },
  badgesSectionCounterText: {
    id: 'badges.section.counter.text',
    defaultMessage: '{completedBadgeItemsLength} of {badgeItemsLength}',
    description: 'Text displaying a count of items or badges, with placeholders for dynamic values',
  },
  performanceBadgesEmptyMessageText: {
    id: 'performance.badges.empty.message.text',
    defaultMessage: 'No accomplishments yet...',
    description: 'Empty message when badges list doesn\'t have any badges',
  },
  performanceBadgesSectionDescriptionText: {
    id: 'performance.badges.section.description.text',
    defaultMessage: 'Build your accomplishment collection by learning, sharing, or volunteering! Hover over an accomplishment to learn how to add it to your collection.',
    description: 'Text explaining how users can earn badges and how to view instructions by hovering over badges',
  },
  performanceBadgesSectionAlertNoBadgesTitle: {
    id: 'performance.badges.section.alert.no-badges.title',
    defaultMessage: 'Complete class material to earn accomplishments!',
    description: 'Title for the alert message when no badges are available',
  },
  performanceBadgesSectionBadgesButtonText: {
    id: 'performance.badges.section.badges.button.text',
    defaultMessage: 'All Accomplishments',
    description: 'Button text for viewing badges in the performance section',
  },
  performanceAvatarSectionAvatarSetsButtonText: {
    id: 'performance.avatar.section.avatar-sets.button.text',
    defaultMessage: 'Avatar sets',
    description: 'Label text for available avatar sets in the performance section',
  },
  performanceBadgesSectionAllBadgesButtonText: {
    id: 'performance.badges.section.all.badges.button.text',
    defaultMessage: 'All accomplishments',
    description: 'Button text for viewing all available badges in the performance section',
  },
  performanceBadgesSectionTotalBadgesButtonText: {
    id: 'performance.badges.section.total.badges.button.text',
    defaultMessage: 'Total accomplishments',
    description: 'Label text for all available badges in the performance section',
  },
  dashboardProgressBadgeModalEmptyBadgesListTitle: {
    id: 'performance.badges.section.badges.modal.alert.empty-badges-list.title',
    defaultMessage: 'Accomplishments are on their way!',
    description: 'Title for the alert message when no badges are available in the modal',
  },
  dashboardProgressBadgeModalEmptyBadgesListDescription: {
    id: 'performance.badges.section.badges.modal.alert.empty-badges-list.description',
    defaultMessage: "Your rewards are almost here! The administrator is preparing special accomplishments to celebrate your achievements. Hang tight, and they'll appear in your inventory, ready for action!",
    description: 'Text for the alert message when no badges are available in the modal',
  },
  performanceAvatarSectionTotalAvatarSetsButtonText: {
    id: 'performance.avatar.section.total.avatar-sets.button.text',
    defaultMessage: 'Total avatar sets',
    description: 'Label text for all available avatar sets in the performance section',
  },
  performanceAvatarSectionTitleText: {
    id: 'performance.avatar.section.title.text',
    defaultMessage: 'Your avatar',
    description: 'Title text for the avatar section in the performance page',
  },
  performanceAvatarSectionDescriptionText: {
    id: 'performance.avatar.section.description.text',
    defaultMessage: 'Gear up with your avatar set to track your journey! Complete challenges, earn rewards, and level up your avatar as you conquer new tasks.',
    description: 'Text explaining how users can use the avatar set to track their progress and unlock new avatar levels',
  },
  performanceBadgesItemImageAlternativeText: {
    id: 'performance.badges.item.image.alternative.text',
    defaultMessage: 'Leaderboard accomplishment',
    description: 'Alternative text for badge image in the performance section',
  },
  performanceStatusesSectionHeadingText: {
    id: 'performance.statuses.section.heading.text',
    defaultMessage: 'Your Statuses',
    description: 'Heading text for the statuses section in the performance page',
  },
  performanceStatusesSectionProgressTrackItemText: {
    id: 'performance.statuses.section.progress-track.item.text',
    defaultMessage: 'Progress points: {pointsCount}',
    description: 'Label for progress track items indicating the number of progress points.',
  },
  performanceStatusesSectionDescriptionText: {
    id: 'performance.statuses.section.description.text',
    defaultMessage: 'The more points you have, the higher status you own.',
    description: 'Text explaining how status is determined based on points',
  },
  performancePointsDistributionSectionHeadingText: {
    id: 'performance.points.distribution.section.heading.text',
    defaultMessage: 'POINTS DISTRIBUTION',
    description: 'Heading text for the points distribution section in the performance page',
  },
  performancePointsDistributionSectionDescriptionText: {
    id: 'performance.points.distribution.section.description.text',
    defaultMessage: 'Here you can see what actions caused your current points portfolio.',
    description: 'Description of how the points distribution works and how actions contribute to the points portfolio',
  },
  performancePointsSeriesName: {
    id: 'performance.points.series.name',
    defaultMessage: 'Points share',
    description: 'Label for a series in the performance points chart.',
  },
  performancePointsControlsSaveAsImageLabel: {
    id: 'performance.points.controls.saveAsImage.label',
    defaultMessage: 'Save as image',
    description: 'Label for save as image control button in the performance points chart.',
  },
  performancePointsControlsZoomInLabel: {
    id: 'performance.points.controls.zoomIn.label',
    defaultMessage: 'Zoom',
    description: 'Label for zoom control button in the performance points chart.',
  },
  performancePointsControlsZoomOutLabel: {
    id: 'performance.points.controls.zoomOut.label',
    defaultMessage: 'Zoom reset',
    description: 'Label for zoom reset control button in the performance points chart.',
  },
  performancePointsControlsLineChartLabel: {
    id: 'performance.points.controls.lineChart.label',
    defaultMessage: 'Switch to Line Chart',
    description: 'Label for switch to line chart control button in the performance points chart.',
  },
  performancePointsControlsBarChartLabel: {
    id: 'performance.points.controls.barChart.label',
    defaultMessage: 'Switch to Bar Chart',
    description: 'Label for switch to bar chart control button in the performance points chart.',
  },
  performancePointsItemProgressLabel: {
    id: 'performance.points.item.progress.label',
    defaultMessage: 'Progress',
    description: 'Label for progress item in the performance points chart.',
  },
  performancePointsItemPointsLabel: {
    id: 'performance.points.item.points.label',
    defaultMessage: 'Points',
    description: 'Label for points item in the performance points chart.',
  },
  performanceProgressTrackerSectionHeadingText: {
    id: 'performance.progress.tracker.section.heading.text',
    defaultMessage: 'PROGRESS TRACKER',
    description: 'Heading text for the progress tracker section in the performance page',
  },
  performanceProgressTrackerSectionDescriptionText: {
    id: 'performance.progress.statuses.section.description.text',
    defaultMessage: 'See the dynamics of your activities and points acquisition through time.',
    description: 'Text explaining how the progress tracker shows the dynamics of activities and points over time',
  },
  performanceProgressTrackerChartProgressLabel: {
    id: 'performance.progress.tracker.chart.progress.label',
    defaultMessage: 'Points',
    description: 'Label for the points on the progress tracker chart',
  },
  performanceProgressTrackerChartPointsLabel: {
    id: 'performance.progress.tracker.chart.points.label',
    defaultMessage: 'Progress',
    description: 'Label for the progress on the progress tracker chart',
  },
  leaderboardHeadingText: {
    id: 'leaderboard.heading.text',
    defaultMessage: 'Leaderboard',
    description: 'Leaderboard page heading text',
  },
  leaderboardAvatarAltText: {
    id: 'leaderboard.avatar.alt.text',
    defaultMessage: '{username} profile image',
    description: 'Alternative text for user profile image in the leaderboard',
  },
  leaderboardProfileLinkLabel: {
    id: 'leaderboard.profile.link.label',
    defaultMessage: "View {username}'s profile",
    description: "Accessible label for the link from a leaderboard entry to that user's profile page",
  },
  genericLoaderScreenReaderText: {
    id: 'generic.loader.screenReader.text',
    defaultMessage: 'Loading...',
    description: 'Text for screen readers inside the component Loader.',
  },
  dashboardProgressBadgeFigureImageScreenReaderText: {
    id: 'dashboard.progress-badge.figure.image.screen-reader.text',
    defaultMessage: 'Progress figure',
    description: 'Alt text for the progress-badge image.',
  },
  dashboardProgressBadgeModalButtonCloseText: {
    id: 'dashboard.progress-badge.modal.button.close.text',
    defaultMessage: 'Close',
    description: 'Label for the button used to close the progress badge modal.',
  },
  dashboardProgressAvatarModalButtonCloseText: {
    id: 'dashboard.progress-avatar.modal.button.close.text',
    defaultMessage: 'Close',
    description: 'Label for the button used to close the progress avatar modal.',
  },
  dashboardSliderItemInfoIconCompleteScreenReaderText: {
    id: 'dashboard.slider-item.info.icon.complete.screen-reader.text',
    defaultMessage: 'Complete icon',
    description: 'Alt text for the complete slider-item image.',
  },
  dashboardSliderItemInfoIconStatusScreenReaderText: {
    id: 'dashboard.slider-item.info.icon.status.screen-reader.text',
    defaultMessage: 'Status icon',
    description: 'Alt text for the status slider-item image.',
  },
  dashboardProgressAvatarSetModalAvatarSetCardSelectBtn: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.card.select.btn',
    defaultMessage: 'Select',
    description: 'Label for the button used to select an avatar set in the progress avatar set modal.',
  },
  dashboardProgressAvatarSetModalAvatarSetCardSelectedText: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.card.selected.text',
    defaultMessage: 'Current avatar set',
    description: 'Text displayed when the avatar set is selected in the progress avatar set modal.',
  },
  dashboardProgressAvatarSetModalAvatarSetSupportText: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.support.text',
    defaultMessage: "Don't forget to click the Save button to apply the changes.",
    description: 'Support message displayed in the progress avatar set modal.',
  },
  dashboardProgressAvatarSetModalAvatarSetSaveBtn: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.save.btn',
    defaultMessage: 'Save',
    description: 'Label for the button used to save the selected avatar set in the progress avatar set modal.',
  },
  dashboardProgressAvatarSetModalAvatarSetSuccessText: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.success.text',
    defaultMessage: 'Avatar set saved successfully',
    description: 'Success message displayed when the avatar set is saved successfully in the progress avatar set modal.',
  },
  dashboardProgressAvatarSetModalAvatarSetErrorText: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.error.text',
    defaultMessage: 'Error while saving avatar set',
    description: 'Error message displayed when there is an error while saving the avatar set in the progress avatar set modal.',
  },
  dashboardProgressAvatarSetModalAvatarSetInfoText: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.info.text',
    defaultMessage: 'Select an avatar set to save',
    description: 'Information message displayed when no avatar set is selected in the progress avatar set modal.',
  },
  dashboardProgressAvatarSetModalAlertAvatarSetNotCompletedTitle: {
    id: 'dashboard.progress-avatar-set.modal.alert.avatar-set-not-completed.title',
    defaultMessage: 'Your Avatar will show up once you earn some points!',
    description: 'Title of the alert shown when the selected avatar set is not completed in the progress avatar set modal.',
  },
  dashboardProgressAvatarSetModalAlertAvatarSetNotCompletedText: {
    id: 'dashboard.progress-avatar-set.modal.alert.avatar-set-not-completed.text',
    defaultMessage: 'Start earning points by completing class material.',
    description: 'Text displayed in the alert message when the selected avatar set is not completed in the progress avatar set modal.',
  },
  dashboardProgressAvatarSetModalAlertAvatarSetNotSelectedTitle: {
    id: 'dashboard.progress-avatar-set.modal.alert.avatar-set-not-selected.title',
    defaultMessage: 'No avatar, no quest!',
    description: 'Title of the alert shown when no avatar set is selected in the progress avatar set modal.',
  },
  dashboardProgressAvatarSetModalAlertAvatarSetNotSelectedText: {
    id: 'dashboard.progress-avatar-set.modal.alert.avatar-set-not-selected.text',
    defaultMessage: 'Select your avatar set now to begin your journey, earn rewards, and level up as you complete tasks.',
    description: 'Text displayed in the alert message when no avatar set is selected in the progress avatar set modal.',
  },
  dashboardProgressAvatarSetModalEmptyText: {
    id: 'dashboard.progress-avatar-set.modal.empty.text',
    defaultMessage: 'No avatar sets are available. Please contact your course administrator to configure avatar sets.',
    description: 'Displayed when no avatar sets meet the filter criteria, instructing the user to ask the course administrator to set up avatar sets.',
  },
  dashboardProgressAvatarSetModalTitle: {
    id: 'dashboard.progress-avatar-set.modal.title',
    defaultMessage: 'Avatar sets',
    description: 'Title for the progress avatar set modal.',
  },
  dashboardPointsVaultSectionTitle: {
    id: 'dashboard.points-vault.section.title',
    defaultMessage: 'Your Vault',
    description: 'Title for the points vault section.',
  },
  dashboardPointsVaultSectionDescription: {
    id: 'dashboard.points-vault.section.description',
    defaultMessage: 'Every quest completed, every challenge conquered! Earn valuable Points by taking action across the platform. This secure Vault safeguards your growing treasure, marking every step of your journey!',
    description: 'Description for the points vault section.',
  },
  dashboardPointsVaultSectionTotalPoints: {
    id: 'dashboard.points-vault.section.total.points',
    defaultMessage: 'Total points:',
    description: 'Label for the total points in the points vault section.',
  },
  genericErrorFallbackBtnText: {
    id: 'generic.error.fallback.btn.text',
    defaultMessage: 'Try again',
    description: 'Text for the button to try again in the error fallback component.',
  },
  genericErrorFallbackTitle: {
    id: 'generic.error.fallback.title',
    defaultMessage: 'Something went wrong...',
    description: 'Title for the error fallback component.',
  },
  genericErrorFallbackDescription: {
    id: 'generic.error.fallback.description',
    defaultMessage: 'There was an error:',
    description: 'Description for the error fallback component.',
  },
  leaderboardEmptyTitle: {
    id: 'leaderboard.empty.title',
    defaultMessage: 'The Leaderboard is Empty',
    description: 'Title for the leaderboard empty state.',
  },
  leaderboardEmptyDescription: {
    id: 'leaderboard.empty.description',
    defaultMessage: 'There are currently no users to display on the leaderboard. Once participants engage, the rankings will appear here.',
    description: 'Description for the leaderboard empty state.',
  },
  badgeLeaderboardImageAltText: {
    id: 'badge.leaderboard.image.alt.text',
    defaultMessage: '{title} accomplishment',
    description: 'Alternative text for the large badge image shown at the top of the per-badge leaderboard page.',
  },
  badgeLeaderboardEarnedSectionTitle: {
    id: 'badge.leaderboard.earned.section.title',
    defaultMessage: 'Earned',
    description: 'Heading for the section listing users who have earned the badge on the per-badge leaderboard page.',
  },
  badgeLeaderboardInProgressSectionTitle: {
    id: 'badge.leaderboard.in-progress.section.title',
    defaultMessage: 'In progress',
    description: 'Heading for the section listing users who are progressing toward the badge on the per-badge leaderboard page.',
  },
  courseLeaderboardCompletedSectionTitle: {
    id: 'course.leaderboard.completed.section.title',
    defaultMessage: 'Completed',
    description: 'Heading for the section listing learners who earned the course certificate on the course leaderboard page.',
  },
  countryLeaderboardHeadingText: {
    id: 'country.leaderboard.heading.text',
    defaultMessage: '{country} Leaderboard',
    description: 'Heading for the per-country leaderboard page, with the country name interpolated (e.g. "Japan Leaderboard").',
  },
});

export default messages;
