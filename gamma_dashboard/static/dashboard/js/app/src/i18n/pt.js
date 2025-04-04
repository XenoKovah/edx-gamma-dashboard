import { defineMessages } from 'react-intl';

const messages = defineMessages({
  logoDropdownGuideItemText: {
    id: 'logo.dropdown.guide.item.text',
    defaultMessage: 'Guia do usuário de gamificação',
    description: 'Texto para o item no menu suspenso que liga ao guia do usuário de gamificação',
  },
  logoDropdownFeedbackItemText: {
    id: 'logo.dropdown.feedback.item.text',
    defaultMessage: 'Enviar feedback',
    description: 'Texto para o item no menu suspenso que liga ao formulário ou página de feedback',
  },
  logoDropdownFeedbackFormSubjectQuestionText: {
    id: 'logo.dropdown.feedback.form.subject.question.text',
    defaultMessage: 'Fazer uma pergunta',
    description: 'Rótulo para a opção do formulário de feedback para fazer uma pergunta.',
  },
  logoDropdownFeedbackFormSubjectCommentText: {
    id: 'logo.dropdown.feedback.form.subject.comment.text',
    defaultMessage: 'Deixar um comentário',
    description: 'Rótulo para a opção do formulário de feedback para deixar um comentário.',
  },
  logoDropdownFeedbackFormSubjectBugText: {
    id: 'logo.dropdown.feedback.form.subject.bug.text',
    defaultMessage: 'Reportar um bug',
    description: 'Rótulo para a opção do formulário de feedback para reportar um bug.',
  },
  logoDropdownFeedbackFormSubjectImprovementText: {
    id: 'logo.dropdown.feedback.form.subject.improvement.text',
    defaultMessage: 'Sugerir uma melhoria',
    description: 'Rótulo para a opção do formulário de feedback para sugerir uma melhoria.',
  },
  logoDropdownFeedbackFormAlertSuccessText: {
    id: 'logo.dropdown.feedback.form.alert.success.text',
    defaultMessage: 'Seu feedback foi registrado.',
    description: 'Mensagem exibida quando o envio de feedback é bem-sucedido.',
  },
  logoDropdownFeedbackFormAlertErrorText: {
    id: 'logo.dropdown.feedback.form.alert.error.text',
    defaultMessage: 'O servidor não está respondendo. Tente novamente mais tarde',
    description: 'Mensagem de erro exibida quando o envio de feedback falha devido a problemas no servidor.',
  },
  logoDropdownFeedbackFormAlertButtonSubmitText: {
    id: 'logo.dropdown.feedback.form.alert.button.submit.text',
    defaultMessage: 'Entendi',
    description: 'Texto para o botão para confirmar mensagens de alerta de feedback.',
  },
  logoDropdownFeedbackFormButtonSubmitDefaultText: {
    id: 'logo.dropdown.feedback.form.button.submit.default.text',
    defaultMessage: 'Enviar',
    description: 'Texto padrão para o botão de envio.',
  },
  logoDropdownFeedbackFormMessageLabelText: {
    id: 'logo.dropdown.feedback.form.message.label.text',
    defaultMessage: 'Deixe-nos saber como podemos ajudar',
    description: 'Rótulo para o campo de entrada de mensagem no formulário de feedback.',
  },
  logoDropdownFeedbackFormButtonCancelText: {
    id: 'logo.dropdown.feedback.form.button.cancel.text',
    defaultMessage: 'Cancelar',
    description: 'Texto para o botão para cancelar o envio do formulário de feedback.',
  },
  logoDropdownFeedbackFormButtonSubmitText: {
    id: 'logo.dropdown.feedback.form.button.submit.text',
    defaultMessage: 'Enviar feedback',
    description: 'Texto para o botão para enviar feedback no formulário.',
  },
  dashboardBadgesDependsOnBadgesText: {
    id: 'dashboard.badges.depends.on.badges.text',
    defaultMessage: 'Depende de emblemas',
    description: 'Rótulo indicando que um determinado recurso ou elemento depende de emblemas específicos.',
  },
  dashboardBadgesDependsOnStatusText: {
    id: 'dashboard.badges.depends.on.status.text',
    defaultMessage: 'Depende do status',
    description: 'Rótulo indicando que um determinado recurso ou elemento depende de um status específico.',
  },
  performanceHeadingText: {
    id: 'performance.heading.text',
    defaultMessage: 'Desempenho',
    description: 'Texto do cabeçalho da página de desempenho',
  },
  performanceBadgesSectionHeadingText: {
    id: 'performance.badges.section.heading.text',
    defaultMessage: 'Seus Emblemas',
    description: 'Texto do cabeçalho para a seção de emblemas na página de desempenho',
  },
  performanceSectionCounterText: {
    id: 'performance.section.counter.text',
    defaultMessage: '{completedStatuses} de {totalStatuses}',
    description: 'Texto exibindo uma contagem de itens ou emblemas, com espaços reservados para valores dinâmicos',
  },
  badgesSectionCounterText: {
    id: 'badges.section.counter.text',
    defaultMessage: '{completedBadgeItemsLength} de {badgeItemsLength}',
    description: 'Texto exibindo uma contagem de itens ou emblemas, com espaços reservados para valores dinâmicos',
  },
  performanceBadgesEmptyMessageText: {
    id: 'performance.badges.empty.message.text',
    defaultMessage: 'Nenhum emblema ainda...',
    description: 'Mensagem vazia quando a lista de emblemas não tem nenhum emblema',
  },
  performanceBadgesSectionDescriptionText: {
    id: 'performance.badges.section.description.text',
    defaultMessage: 'Você ganha emblemas por ações combinadas específicas na plataforma. Passe o mouse sobre um emblema para saber o que fazer para obter um.',
    description: 'Texto explicando como os usuários podem ganhar emblemas e como visualizar instruções passando o mouse sobre os emblemas',
  },
  performanceBadgesSectionAlertNoBadgesTitle: {
    id: 'performance.badges.section.alert.no-badges.title',
    defaultMessage: 'Suas recompensas estão a caminho!',
    description: 'Título para a mensagem de alerta quando nenhum emblema está disponível',
  },
  performanceBadgesSectionAlertNoBadgesDescription: {
    id: 'performance.badges.section.alert.no-badges.description',
    defaultMessage: 'Seus emblemas bem merecidos estão chegando. Por favor, espere um momento, e eles aparecerão em seu inventário, prontos para exibir suas conquistas!',
    description: 'Por favor, espere um momento, e eles aparecerão em seu inventário, prontos para exibir suas conquistas!',
  },
  performanceBadgesSectionBadgesButtonText: {
    id: 'performance.badges.section.badges.button.text',
    defaultMessage: 'Emblemas',
    description: 'Texto do botão para visualizar emblemas na seção de desempenho',
  },
  performanceAvatarSectionAvatarSetsButtonText: {
    id: 'performance.avatar.section.avatar-sets.button.text',
    defaultMessage: 'Conjuntos de avatar',
    description: 'Texto do rótulo para conjuntos de avatar disponíveis na seção de desempenho',
  },
  performanceBadgesSectionAllBadgesButtonText: {
    id: 'performance.badges.section.all.badges.button.text',
    defaultMessage: 'Todos os Emblemas',
    description: 'Texto do botão para visualizar todos os emblemas disponíveis na seção de desempenho',
  },
  performanceBadgesSectionTotalBadgesButtonText: {
    id: 'performance.badges.section.total.badges.button.text',
    defaultMessage: 'Total de emblemas',
    description: 'Texto do rótulo para todos os emblemas disponíveis na seção de desempenho',
  },
  dashboardProgressBadgeModalEmptyBadgesListTitle: {
    id: 'performance.badges.section.badges.modal.alert.empty-badges-list.title',
    defaultMessage: 'Emblemas estão a caminho!',
    description: 'Título para a mensagem de alerta quando nenhum emblema está disponível no modal',
  },
  dashboardProgressBadgeModalEmptyBadgesListDescription: {
    id: 'performance.badges.section.badges.modal.alert.empty-badges-list.description',
    defaultMessage: 'Suas recompensas estão quase aqui! O administrador está preparando emblemas especiais para celebrar suas conquistas. Aguente firme, e eles aparecerão em seu inventário, prontos para a ação!',
    description: 'Texto para a mensagem de alerta quando nenhum emblema está disponível no modal',
  },
  performanceAvatarSectionTotalAvatarSetsButtonText: {
    id: 'performance.avatar.section.total.avatar-sets.button.text',
    defaultMessage: 'Total de conjuntos de avatar',
    description: 'Texto do rótulo para todos os conjuntos de avatar disponíveis na seção de desempenho',
  },
  performanceAvatarSectionTitleText: {
    id: 'performance.avatar.section.title.text',
    defaultMessage: 'Seu avatar',
    description: 'Texto do título para a seção de avatar na página de desempenho',
  },
  performanceAvatarSectionDescriptionText: {
    id: 'performance.avatar.section.description.text',
    defaultMessage: 'Prepare-se com seu conjunto de avatar para acompanhar sua jornada! Complete desafios, ganhe recompensas e suba de nível seu avatar ao conquistar novas tarefas.',
    description: 'Texto explicando como os usuários podem usar o conjunto de avatar para acompanhar seu progresso e desbloquear novos níveis de avatar',
  },
  performanceBadgesItemImageAlternativeText: {
    id: 'performance.badges.item.image.alternative.text',
    defaultMessage: 'Emblema do quadro de líderes',
    description: 'Texto alternativo para a imagem do emblema na seção de desempenho',
  },
  performanceStatusesSectionHeadingText: {
    id: 'performance.statuses.section.heading.text',
    defaultMessage: 'Seus Statuses',
    description: 'Texto do cabeçalho para a seção de statuses na página de desempenho',
  },
  performanceStatusesSectionProgressTrackItemText: {
    id: 'performance.statuses.section.progress-track.item.text',
    defaultMessage: 'Pontos de progresso: {pointsCount}',
    description: 'Rótulo para itens de rastreamento de progresso indicando o número de pontos de progresso.',
  },
  performanceStatusesSectionDescriptionText: {
    id: 'performance.statuses.section.description.text',
    defaultMessage: 'Quanto mais pontos você tiver, maior será o seu status.',
    description: 'Texto explicando como o status é determinado com base nos pontos',
  },
  performancePointsDistributionSectionHeadingText: {
    id: 'performance.points.distribution.section.heading.text',
    defaultMessage: 'DISTRIBUIÇÃO DE PONTOS',
    description: 'Texto do cabeçalho para a seção de distribuição de pontos na página de desempenho',
  },
  performancePointsDistributionSectionDescriptionText: {
    id: 'performance.points.distribution.section.description.text',
    defaultMessage: 'Aqui você pode ver quais ações causaram seu portfólio de pontos atual.',
    description: 'Descrição de como a distribuição de pontos funciona e como as ações contribuem para o portfólio de pontos',
  },
  performancePointsSeriesName: {
    id: 'performance.points.series.name',
    defaultMessage: 'Compartilhamento de pontos',
    description: 'Rótulo para uma série no gráfico de pontos de desempenho.',
  },
  performancePointsControlsSaveAsImageLabel: {
    id: 'performance.points.controls.saveAsImage.label',
    defaultMessage: 'Salvar como imagem',
    description: 'Rótulo para o botão de controle salvar como imagem no gráfico de pontos de desempenho.',
  },
  performancePointsControlsZoomInLabel: {
    id: 'performance.points.controls.zoomIn.label',
    defaultMessage: 'Zoom',
    description: 'Rótulo para o botão de controle de zoom no gráfico de pontos de desempenho.',
  },
  performancePointsControlsZoomOutLabel: {
    id: 'performance.points.controls.zoomOut.label',
    defaultMessage: 'Redefinir zoom',
    description: 'Rótulo para o botão de controle de redefinição de zoom no gráfico de pontos de desempenho.',
  },
  performancePointsControlsLineChartLabel: {
    id: 'performance.points.controls.lineChart.label',
    defaultMessage: 'Mudar para gráfico de linhas',
    description: 'Rótulo para o botão de controle mudar para gráfico de linhas no gráfico de pontos de desempenho.',
  },
  performancePointsControlsBarChartLabel: {
    id: 'performance.points.controls.barChart.label',
    defaultMessage: 'Mudar para gráfico de barras',
    description: 'Rótulo para o botão de controle mudar para gráfico de barras no gráfico de pontos de desempenho.',
  },
  performancePointsItemProgressLabel: {
    id: 'performance.points.item.progress.label',
    defaultMessage: 'Progresso',
    description: 'Rótulo para item de progresso no gráfico de pontos de desempenho.',
  },
  performancePointsItemPointsLabel: {
    id: 'performance.points.item.points.label',
    defaultMessage: 'Pontos',
    description: 'Rótulo para item de pontos no gráfico de pontos de desempenho.',
  },
  performanceProgressTrackerSectionHeadingText: {
    id: 'performance.progress.tracker.section.heading.text',
    defaultMessage: 'RASTREADOR DE PROGRESSO',
    description: 'Texto do cabeçalho para a seção de rastreador de progresso na página de desempenho',
  },
  performanceProgressTrackerSectionDescriptionText: {
    id: 'performance.progress.statuses.section.description.text',
    defaultMessage: 'Veja a dinâmica de suas atividades e aquisição de pontos ao longo do tempo.',
    description: 'Texto explicando como o rastreador de progresso mostra a dinâmica de atividades e pontos ao longo do tempo',
  },
  performanceProgressTrackerChartProgressLabel: {
    id: 'performance.progress.tracker.chart.progress.label',
    defaultMessage: 'Pontos',
    description: 'Rótulo para os pontos no gráfico de rastreador de progresso',
  },
  performanceProgressTrackerChartPointsLabel: {
    id: 'performance.progress.tracker.chart.points.label',
    defaultMessage: 'Progresso',
    description: 'Rótulo para o progresso no gráfico de rastreador de progresso',
  },
  leaderboardHeadingText: {
    id: 'leaderboard.heading.text',
    defaultMessage: 'Quadro de líderes',
    description: 'Texto do cabeçalho da página do quadro de líderes',
  },
  leaderboardStatusEmptyText: {
    id: 'leaderboard.status.empty.text',
    defaultMessage: 'Nenhum status até agora',
    description: 'Texto exibido quando não há statuses disponíveis no quadro de líderes',
  },
  leaderboardAvatarAltText: {
    id: 'leaderboard.avatar.alt.text',
    defaultMessage: 'Imagem de perfil de {username}',
    description: 'Texto alternativo para a imagem de perfil do usuário no quadro de líderes',
  },
  genericLoaderScreenReaderText: {
    id: 'generic.loader.screenReader.text',
    defaultMessage: 'Carregando...',
    description: 'Texto para leitores de tela dentro do componente Loader.',
  },
  genericLogoDropdownImageScreenReaderText: {
    id: 'generic.logo-dropdown.image.screen-reader.text',
    defaultMessage: 'Logotipo de análise',
    description: 'Texto alternativo para a imagem do logotipo no menu suspenso do logotipo.',
  },
  dashboardProgressBadgeFigureImageScreenReaderText: {
    id: 'dashboard.progress-badge.figure.image.screen-reader.text',
    defaultMessage: 'Figura de progresso',
    description: 'Texto alternativo para a imagem do emblema de progresso.',
  },
  dashboardProgressBadgeModalButtonCloseText: {
    id: 'dashboard.progress-badge.modal.button.close.text',
    defaultMessage: 'Fechar',
    description: 'Rótulo para o botão usado para fechar o modal do emblema de progresso.',
  },
  dashboardProgressAvatarModalButtonCloseText: {
    id: 'dashboard.progress-avatar.modal.button.close.text',
    defaultMessage: 'Fechar',
    description: 'Rótulo para o botão usado para fechar o modal do avatar de progresso.',
  },
  dashboardSliderItemInfoIconCompleteScreenReaderText: {
    id: 'dashboard.slider-item.info.icon.complete.screen-reader.text',
    defaultMessage: 'Ícone concluído',
    description: 'Texto alternativo para a imagem concluída do item do controle deslizante.',
  },
  dashboardSliderItemInfoIconStatusScreenReaderText: {
    id: 'dashboard.slider-item.info.icon.status.screen-reader.text',
    defaultMessage: 'Ícone de status',
    description: 'Texto alternativo para a imagem de status do item do controle deslizante.',
  },
  dashboardProgressAvatarSetModalAvatarSetCardSelectBtn: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.card.select.btn',
    defaultMessage: 'Selecionar',
    description: 'Rótulo para o botão usado para selecionar um conjunto de avatar no modal do conjunto de avatar de progresso.',
  },
  dashboardProgressAvatarSetModalAvatarSetCardSelectedText: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.card.selected.text',
    defaultMessage: 'Conjunto de avatar atual',
    description: 'Texto exibido quando o conjunto de avatar é selecionado no modal do conjunto de avatar de progresso.',
  },
  dashboardProgressAvatarSetModalAvatarSetSupportText: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.support.text',
    defaultMessage: 'Não se esqueça de clicar no botão Salvar para aplicar as alterações.',
    description: 'Mensagem de suporte exibida no modal do conjunto de avatar de progresso.',
  },
  dashboardProgressAvatarSetModalAvatarSetSaveBtn: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.save.btn',
    defaultMessage: 'Salvar',
    description: 'Rótulo para o botão usado para salvar o conjunto de avatar selecionado no modal do conjunto de avatar de progresso.',
  },
  dashboardProgressAvatarSetModalAvatarSetSuccessText: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.success.text',
    defaultMessage: 'Conjunto de avatar salvo com sucesso',
    description: 'Mensagem de sucesso exibida quando o conjunto de avatar é salvo com sucesso no modal do conjunto de avatar de progresso.',
  },
  dashboardProgressAvatarSetModalAvatarSetErrorText: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.error.text',
    defaultMessage: 'Erro ao salvar o conjunto de avatar',
    description: 'Mensagem de erro exibida quando há um erro ao salvar o conjunto de avatar no modal do conjunto de avatar de progresso.',
  },
  dashboardProgressAvatarSetModalAvatarSetInfoText: {
    id: 'dashboard.progress-avatar-set.modal.avatar-set.info.text',
    defaultMessage: 'Selecione um conjunto de avatar para salvar',
    description: 'Mensagem de informação exibida quando nenhum conjunto de avatar é selecionado no modal do conjunto de avatar de progresso.',
  },
  dashboardProgressAvatarSetModalAlertAvatarSetNotCompletedTitle: {
    id: 'dashboard.progress-avatar-set.modal.alert.avatar-set-not-completed.title',
    defaultMessage: 'Seu conjunto de avatar está a caminho!',
    description: 'Título do alerta exibido quando o conjunto de avatar selecionado não está concluído no modal do conjunto de avatar de progresso.',
  },
  dashboardProgressAvatarSetModalAlertAvatarSetNotCompletedText: {
    id: 'dashboard.progress-avatar-set.modal.alert.avatar-set-not-completed.text',
    defaultMessage: 'Volte em breve para desbloquear seu novo visual.',
    description: 'Texto exibido na mensagem de alerta quando o conjunto de avatar selecionado não está concluído no modal do conjunto de avatar de progresso.',
  },
  dashboardProgressAvatarSetModalAlertAvatarSetNotSelectedTitle: {
    id: 'dashboard.progress-avatar-set.modal.alert.avatar-set-not-selected.title',
    defaultMessage: 'Sem avatar, sem missão!',
    description: 'Título do alerta exibido quando nenhum conjunto de avatar é selecionado no modal do conjunto de avatar de progresso.',
  },
  dashboardProgressAvatarSetModalAlertAvatarSetNotSelectedText: {
    id: 'dashboard.progress-avatar-set.modal.alert.avatar-set-not-selected.text',
    defaultMessage: 'Selecione seu conjunto de avatar agora para começar sua jornada, ganhar recompensas e subir de nível ao completar tarefas.',
    description: 'Texto exibido na mensagem de alerta quando nenhum conjunto de avatar é selecionado no modal do conjunto de avatar de progresso.',
  },
  dashboardProgressAvatarSetModalEmptyText: {
    id: 'dashboard.progress-avatar-set.modal.empty.text',
    defaultMessage: 'Nenhum conjunto de avatar está disponível. Entre em contato com o administrador do curso para configurar conjuntos de avatar.',
    description: 'Exibido quando nenhum conjunto de avatar atende aos critérios de filtro, instruindo o usuário a pedir ao administrador do curso para configurar conjuntos de avatar.',
  },
  dashboardProgressAvatarSetModalTitle: {
    id: 'dashboard.progress-avatar-set.modal.title',
    defaultMessage: 'Conjuntos de avatar',
    description: 'Título para o modal do conjunto de avatar de progresso.',
  },
  genericErrorFallbackBtnText: {
    id: 'generic.error.fallback.btn.text',
    defaultMessage: 'Tentar novamente',
    description: 'Texto para o botão para tentar novamente no componente de fallback de erro.',
  },
  genericErrorFallbackTitle: {
    id: 'generic.error.fallback.title',
    defaultMessage: 'Algo deu errado...',
    description: 'Título para o componente de fallback de erro.',
  },
  genericErrorFallbackDescription: {
    id: 'generic.error.fallback.description',
    defaultMessage: 'Ocorreu um erro:',
    description: 'Descrição para o componente de fallback de erro.',
  },
});

export default messages;
