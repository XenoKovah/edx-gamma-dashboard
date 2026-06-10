import { defineMessages } from 'react-intl';

const messages = defineMessages({
  logoDropdownFeedbackFormButtonSubmitDefaultText: {
    id: 'logo.dropdown.feedback.form.button.submit.default.text',
    defaultMessage: 'Envoyer',
    description: 'Texte par défaut pour le bouton d\'envoi.',
  },
  logoDropdownFeedbackFormButtonCancelText: {
    id: 'logo.dropdown.feedback.form.button.cancel.text',
    defaultMessage: 'Annuler',
    description: 'Texte pour le bouton pour annuler l\'envoi du formulaire de feedback.',
  },
  dashboardBadgesDependsOnBadgesText: {
    id: 'dashboard.badges.depends.on.badges.text',
    defaultMessage: 'Dépend des réussites',
    description: 'Libellé indiquant qu\'une fonctionnalité ou un élément dépend de badges spécifiques.',
  },
  dashboardBadgesDependsOnStatusText: {
    id: 'dashboard.badges.depends.on.status.text',
    defaultMessage: 'Dépend du statut',
    description: 'Libellé indiquant qu\'une fonctionnalité ou un élément dépend d\'un statut spécifique.',
  },
  performanceHeadingText: {
    id: 'performance.heading.text',
    defaultMessage: 'Performance',
    description: 'Texte du titre de la page de performance',
  },
  performanceBadgesSectionHeadingText: {
    id: 'performance.badges.section.heading.text',
    defaultMessage: 'Vos réussites',
    description: 'Texte du titre pour la section des badges sur la page de performance',
  },
  performanceSectionCounterText: {
    id: 'performance.section.counter.text',
    defaultMessage: '{completedStatuses} sur {totalStatuses}',
    description: 'Texte affichant un décompte de statuts complétés et de statuts totaux, avec des espaces réservés pour des valeurs dynamiques',
  },
  badgesSectionCounterText: {
    id: 'badges.section.counter.text',
    defaultMessage: '{completedBadgeItemsLength} sur {badgeItemsLength}',
    description: 'Texte affichant un décompte d\'éléments ou de badges, avec des espaces réservés pour des valeurs dynamiques',
  },
  performanceBadgesEmptyMessageText: {
    id: 'performance.badges.empty.message.text',
    defaultMessage: 'Aucune réussite pour le moment...',
    description: 'Message vide lorsque la liste des badges n\'a aucun badge',
  },
  performanceBadgesSectionDescriptionText: {
    id: 'performance.badges.section.description.text',
    defaultMessage: 'Construisez votre collection de réussites en apprenant, en partageant ou en faisant du bénévolat ! Survolez une réussite pour apprendre comment l\'ajouter à votre collection.',
    description: 'Texte expliquant comment les utilisateurs peuvent gagner des badges et comment afficher les instructions en survolant les badges',
  },
  performanceBadgesSectionAlertNoBadgesTitle: {
    id: 'performance.badges.section.alert.no-badges.title',
    defaultMessage: 'Terminez le matériel de cours pour gagner des réussites !',
    description: 'Titre du message d\'alerte lorsqu\'aucun badge n\'est disponible',
  },
  performanceBadgesSectionBadgesButtonText: {
    id: 'performance.badges.section.badges.button.text',
    defaultMessage: 'Réussites',
    description: 'Texte du bouton pour afficher les badges dans la section de performance',
  },
  performanceAvatarSectionAvatarSetsButtonText: {
    id: 'performance.avatar.section.avatar-sets.button.text',
    defaultMessage: 'Ensembles d\'avatars',
    description: 'Texte du libellé pour les ensembles d\'avatars disponibles dans la section de performance',
  },
  performanceBadgesSectionAllBadgesButtonText: {
    id: 'performance.badges.section.all.badges.button.text',
    defaultMessage: 'Toutes les réussites',
    description: 'Texte du bouton pour afficher tous les badges disponibles dans la section de performance',
  },
  performanceBadgesSectionTotalBadgesButtonText: {
    id: 'performance.badges.section.total.badges.button.text',
    defaultMessage: 'Total des réussites',
    description: 'Texte du libellé pour tous les badges disponibles dans la section de performance',
  },
  dashboardProgressBadgeModalEmptyBadgesListTitle: {
    id: 'performance.badges.section.badges.modal.alert.empty-badges-list.title',
    defaultMessage: 'Les réussites arrivent !',
    description: 'Titre du message d\'alerte lorsqu\'aucun badge n\'est disponible dans le modal',
  },
  dashboardProgressBadgeModalEmptyBadgesListDescription: {
    id: 'performance.badges.section.badges.modal.alert.empty-badges-list.description',
    defaultMessage: 'Vos récompenses sont presque là ! L\'administrateur prépare des réussites spéciales pour célébrer vos accomplissements. Patientez un peu, et elles apparaîtront dans votre inventaire, prêtes à l\'action !',
    description: 'Texte du message d\'alerte lorsqu\'aucun badge n\'est disponible dans le modal',
  },
  performanceAvatarSectionTotalAvatarSetsButtonText: {
    id: 'performance.avatar.section.total.avatar-sets.button.text',
    defaultMessage: 'Total des ensembles d\'avatars',
    description: 'Texte du libellé pour tous les ensembles d\'avatars disponibles dans la section de performance',
  },
  performanceAvatarSectionTitleText: {
    id: 'performance.avatar.section.title.text',
    defaultMessage: 'Votre avatar',
    description: 'Texte du titre pour la section avatar dans la page de performance',
  },
  performanceAvatarSectionDescriptionText: {
    id: 'performance.avatar.section.description.text',
    defaultMessage: 'Équipez-vous avec votre ensemble d\'avatar pour suivre votre parcours ! Terminez les défis, gagnez des récompenses et faites évoluer votre avatar en accomplissant de nouvelles tâches.',
    description: 'Texte expliquant comment les utilisateurs peuvent utiliser l\'ensemble d\'avatar pour suivre leur progression et débloquer de nouveaux niveaux d\'avatar',
  },
  performanceBadgesItemImageAlternativeText: {
    id: 'performance.badges.item.image.alternative.text',
    defaultMessage: 'Réussite du classement',
    description: 'Texte alternatif pour l\'image du badge dans la section de performance',
  },
  performanceStatusesSectionHeadingText: {
    id: 'performance.statuses.section.heading.text',
    defaultMessage: 'Vos statuts',
    description: 'Texte du titre pour la section des statuts dans la page de performance',
  },
  performanceStatusesSectionProgressTrackItemText: {
    id: 'performance.statuses.section.progress-track.item.text',
    defaultMessage: 'Points de progression : {pointsCount}',
    description: 'Libellé pour les éléments de suivi de progression indiquant le nombre de points de progression.',
  },
  performanceStatusesSectionDescriptionText: {
    id: 'performance.statuses.section.description.text',
    defaultMessage: 'Plus vous avez de points, plus votre statut est élevé.',
    description: 'Texte expliquant comment le statut est déterminé en fonction des points',
  },
  performancePointsDistributionSectionHeadingText: {
    id: 'performance.points.distribution.section.heading.text',
    defaultMessage: 'RÉPARTITION DES POINTS',
    description: 'Texte du titre pour la section de répartition des points dans la page de performance',
  },
  performancePointsDistributionSectionDescriptionText: {
    id: 'performance.points.distribution.section.description.text',
    defaultMessage: 'Ici, vous pouvez voir quelles actions ont contribué à votre portefeuille de points actuel.',
    description: 'Description du fonctionnement de la répartition des points et de la façon dont les actions contribuent au portefeuille de points',
  },
  performancePointsSeriesName: {
    id: 'performance.points.series.name',
    defaultMessage: 'Part des points',
    description: 'Libellé pour une série dans le graphique des points de performance.',
  },
  performancePointsControlsSaveAsImageLabel: {
    id: 'performance.points.controls.saveAsImage.label',
    defaultMessage: 'Enregistrer comme image',
    description: 'Libellé pour le bouton de contrôle enregistrer comme image dans le graphique des points de performance.',
  },
  performancePointsControlsZoomInLabel: {
    id: 'performance.points.controls.zoomIn.label',
    defaultMessage: 'Zoom',
    description: 'Libellé pour le bouton de contrôle de zoom dans le graphique des points de performance.',
  },
  performancePointsControlsZoomOutLabel: {
    id: 'performance.points.controls.zoomOut.label',
    defaultMessage: 'Réinitialiser le zoom',
    description: 'Libellé pour le bouton de contrôle de réinitialisation du zoom dans le graphique des points de performance.',
  },
  performancePointsControlsLineChartLabel: {
    id: 'performance.points.controls.lineChart.label',
    defaultMessage: 'Passer au graphique linéaire',
    description: 'Libellé pour le bouton de contrôle passer au graphique linéaire dans le graphique des points de performance.',
  },
  performancePointsControlsBarChartLabel: {
    id: 'performance.points.controls.barChart.label',
    defaultMessage: 'Passer au graphique en barres',
    description: 'Libellé pour le bouton de contrôle passer au graphique en barres dans le graphique des points de performance.',
  },
  performancePointsItemProgressLabel: {
    id: 'performance.points.item.progress.label',
    defaultMessage: 'Progression',
    description: 'Libellé pour l\'élément de progression dans le graphique des points de performance.',
  },
  performancePointsItemPointsLabel: {
    id: 'performance.points.item.points.label',
    defaultMessage: 'Points',
    description: 'Libellé pour l\'élément de points dans le graphique des points de performance.',
  },
  performanceProgressTrackerSectionHeadingText: {
    id: 'performance.progress.tracker.section.heading.text',
    defaultMessage: 'SUIVI DE PROGRESSION',
    description: 'Texte du titre pour la section de suivi de progression dans la page de performance',
  },
  performanceProgressTrackerSectionDescriptionText: {
    id: 'performance.progress.statuses.section.description.text',
    defaultMessage: 'Consultez la dynamique de vos activités et de l\'acquisition de points au fil du temps.',
    description: 'Texte expliquant comment le suivi de progression montre la dynamique des activités et des points au fil du temps',
  },
  performanceProgressTrackerChartProgressLabel: {
    id: 'performance.progress.tracker.chart.progress.label',
    defaultMessage: 'Points',
    description: 'Libellé pour les points sur le graphique de suivi de progression',
  },
  performanceProgressTrackerChartPointsLabel: {
    id: 'performance.progress.tracker.chart.points.label',
    defaultMessage: 'Progression',
    description: 'Libellé pour la progression sur le graphique de suivi de progression',
  },
  leaderboardHeadingText: {
    id: 'leaderboard.heading.text',
    defaultMessage: 'Classement',
    description: 'Texte du titre de la page du classement',
  },
  leaderboardAvatarAltText: {
    id: 'leaderboard.avatar.alt.text',
    defaultMessage: 'Image de profil de {username}',
    description: 'Texte alternatif pour l\'image de profil utilisateur dans le classement',
  },
  genericLoaderScreenReaderText: {
    id: 'generic.loader.screenReader.text',
    defaultMessage: 'Chargement...',
    description: 'Texte pour les lecteurs d\'écran à l\'intérieur du composant Loader.',
  },
  dashboardProgressBadgeFigureImageScreenReaderText: {
    id: 'dashboard.progress-badge.figure.image.screen-reader.text',
    defaultMessage: 'Figure de progression',
    description: 'Texte alternatif pour l\'image du badge de progression.',
  },
  dashboardProgressBadgeModalButtonCloseText: {
    id: 'dashboard.progress-badge.modal.button.close.text',
    defaultMessage: 'Fermer',
    description: 'Libellé pour le bouton utilisé pour fermer le modal du badge de progression.',
  },
  dashboardProgressAvatarModalButtonCloseText: {
    id: 'dashboard.progress-avatar.modal.button.close.text',
    defaultMessage: 'Fermer',
    description: 'Libellé pour le bouton utilisé pour fermer le modal de l\'avatar de progression.',
  },
  dashboardSliderItemInfoIconCompleteScreenReaderText: {
    id: 'dashboard.slider-item.info.icon.complete.screen-reader.text',
    defaultMessage: 'Icône de complétion',
    description: 'Texte alternatif pour l\'image complète de l\'élément du curseur.',
  },
  dashboardSliderItemInfoIconStatusScreenReaderText: {
    id: 'dashboard.slider-item.info.icon.status.screen-reader.text',
    defaultMessage: 'Icône de statut',
    description: 'Texte alternatif pour l\'image de statut de l\'élément du curseur.',
  },
  dashboardProgressAvatarSetModalAvatarSetCardSelectBtn: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.card.select.btn',
    defaultMessage: 'Sélectionner',
    description: 'Libellé pour le bouton utilisé pour sélectionner un ensemble d\'avatar dans le modal de l\'ensemble d\'avatar de progression.',
  },
  dashboardProgressAvatarSetModalAvatarSetCardSelectedText: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.card.selected.text',
    defaultMessage: 'Ensemble d\'avatar actuel',
    description: 'Texte affiché lorsque l\'ensemble d\'avatar est sélectionné dans le modal de l\'ensemble d\'avatar de progression.',
  },
  dashboardProgressAvatarSetModalAvatarSetSupportText: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.support.text',
    defaultMessage: 'N\'oubliez pas de cliquer sur le bouton Enregistrer pour appliquer les modifications.',
    description: 'Message d\'aide affiché dans le modal de l\'ensemble d\'avatar de progression.',
  },
  dashboardProgressAvatarSetModalAvatarSetSaveBtn: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.save.btn',
    defaultMessage: 'Enregistrer',
    description: 'Libellé pour le bouton utilisé pour enregistrer l\'ensemble d\'avatar sélectionné dans le modal de l\'ensemble d\'avatar de progression.',
  },
  dashboardProgressAvatarSetModalAvatarSetSuccessText: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.success.text',
    defaultMessage: 'Ensemble d\'avatar enregistré avec succès',
    description: 'Message de succès affiché lorsque l\'ensemble d\'avatar est enregistré avec succès dans le modal de l\'ensemble d\'avatar de progression.',
  },
  dashboardProgressAvatarSetModalAvatarSetErrorText: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.error.text',
    defaultMessage: 'Erreur lors de l\'enregistrement de l\'ensemble d\'avatar',
    description: 'Message d\'erreur affiché lorsqu\'il y a une erreur lors de l\'enregistrement de l\'ensemble d\'avatar dans le modal de l\'ensemble d\'avatar de progression.',
  },
  dashboardProgressAvatarSetModalAvatarSetInfoText: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.info.text',
    defaultMessage: 'Sélectionnez un ensemble d\'avatar à enregistrer',
    description: 'Message d\'information affiché lorsqu\'aucun ensemble d\'avatar n\'est sélectionné dans le modal de l\'ensemble d\'avatar de progression.',
  },
  dashboardProgressAvatarSetModalAlertAvatarSetNotCompletedTitle: {
    id: 'dashboard.progress-avatar-set.modal.alert.avatar-set-not-completed.title',
    defaultMessage: 'Votre avatar apparaîtra une fois que vous aurez gagné des points !',
    description: 'Titre de l\'alerte affichée lorsque l\'ensemble d\'avatar sélectionné n\'est pas complété dans le modal de l\'ensemble d\'avatar de progression.',
  },
  dashboardProgressAvatarSetModalAlertAvatarSetNotCompletedText: {
    id: 'dashboard.progress-avatar-set.modal.alert.avatar-set-not-completed.text',
    defaultMessage: 'Commencez à gagner des points en terminant le matériel de cours.',
    description: 'Texte affiché dans le message d\'alerte lorsque l\'ensemble d\'avatar sélectionné n\'est pas complété dans le modal de l\'ensemble d\'avatar de progression.',
  },
  dashboardProgressAvatarSetModalAlertAvatarSetNotSelectedTitle: {
    id: 'dashboard.progress-avatar-set.modal.alert.avatar-set-not-selected.title',
    defaultMessage: 'Pas d\'avatar, pas de quête !',
    description: 'Titre de l\'alerte affichée lorsqu\'aucun ensemble d\'avatar n\'est sélectionné dans le modal de l\'ensemble d\'avatar de progression.',
  },
  dashboardProgressAvatarSetModalAlertAvatarSetNotSelectedText: {
    id: 'dashboard.progress-avatar-set.modal.alert.avatar-set-not-selected.text',
    defaultMessage: 'Sélectionnez votre ensemble d\'avatar maintenant pour commencer votre parcours, gagner des récompenses et progresser en accomplissant des tâches.',
    description: 'Texte affiché dans le message d\'alerte lorsqu\'aucun ensemble d\'avatar n\'est sélectionné dans le modal de l\'ensemble d\'avatar de progression.',
  },
  dashboardProgressAvatarSetModalEmptyText: {
    id: 'dashboard.progress-avatar-set.modal.empty.text',
    defaultMessage: 'Aucun ensemble d\'avatar n\'est disponible. Veuillez contacter l\'administrateur du cours pour configurer les ensembles d\'avatars.',
    description: 'Affiché lorsqu\'aucun ensemble d\'avatar ne répond aux critères du filtre, indiquant à l\'utilisateur de demander à l\'administrateur du cours de configurer les ensembles d\'avatars.',
  },
  dashboardProgressAvatarSetModalTitle: {
    id: 'dashboard.progress-avatar-set.modal.title',
    defaultMessage: 'Ensembles d\'avatars',
    description: 'Titre pour le modal de l\'ensemble d\'avatar de progression.',
  },
  dashboardPointsVaultSectionTitle: {
    id: 'dashboard.points-vault.section.title',
    defaultMessage: 'Votre coffre',
    description: 'Titre pour la section du coffre de points.',
  },
  dashboardPointsVaultSectionDescription: {
    id: 'dashboard.points-vault.section.description',
    defaultMessage: 'Chaque quête terminée, chaque défi relevé ! Gagnez des points précieux en agissant sur la plateforme. Ce coffre sécurisé protège votre trésor grandissant, marquant chaque étape de votre parcours !',
    description: 'Description pour la section du coffre de points.',
  },
  dashboardPointsVaultSectionTotalPoints: {
    id: 'dashboard.points-vault.section.total.points',
    defaultMessage: 'Total des points :',
    description: 'Libellé pour le total des points dans la section du coffre de points.',
  },
  genericErrorFallbackBtnText: {
    id: 'generic.error.fallback.btn.text',
    defaultMessage: 'Réessayer',
    description: 'Texte pour le bouton pour réessayer dans le composant de repli d\'erreur.',
  },
  genericErrorFallbackTitle: {
    id: 'generic.error.fallback.title',
    defaultMessage: 'Quelque chose s\'est mal passé...',
    description: 'Titre pour le composant de repli d\'erreur.',
  },
  genericErrorFallbackDescription: {
    id: 'generic.error.fallback.description',
    defaultMessage: 'Une erreur s\'est produite :',
    description: 'Description pour le composant de repli d\'erreur.',
  },
  leaderboardEmptyTitle: {
    id: 'leaderboard.empty.title',
    defaultMessage: 'Le classement est vide',
    description: 'Titre pour l\'état vide du classement.',
  },
  leaderboardEmptyDescription: {
    id: 'leaderboard.empty.description',
    defaultMessage: 'Il n\'y a actuellement aucun utilisateur à afficher dans le classement. Une fois que les participants s\'engageront, les classements apparaîtront ici.',
    description: 'Description pour l\'état vide du classement.',
  },
});

export default messages;
