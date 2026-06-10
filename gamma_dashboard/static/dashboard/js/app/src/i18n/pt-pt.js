import { defineMessages } from 'react-intl';

const messages = defineMessages({
  logoDropdownFeedbackFormButtonSubmitDefaultText: {
    id: 'logo.dropdown.feedback.form.button.submit.default.text',
    defaultMessage: 'Enviar',
    description: 'Texto padrão para o botão de envio.',
  },
  logoDropdownFeedbackFormButtonCancelText: {
    id: 'logo.dropdown.feedback.form.button.cancel.text',
    defaultMessage: 'Cancelar',
    description: 'Texto para o botão para cancelar o envio do formulário de feedback.',
  },
  dashboardBadgesDependsOnBadgesText: {
    id: 'dashboard.badges.depends.on.badges.text',
    defaultMessage: 'Depende de conquistas',
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
    defaultMessage: 'Suas Conquistas',
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
    defaultMessage: 'Nenhuma conquista ainda...',
    description: 'Mensagem vazia quando a lista de emblemas não tem nenhum emblema',
  },
  performanceBadgesSectionDescriptionText: {
    id: 'performance.badges.section.description.text',
    defaultMessage: 'Construa sua coleção de conquistas aprendendo, compartilhando ou sendo voluntário! Passe o mouse sobre uma conquista para saber como adicioná-la à sua coleção.',
    description: 'Texto explicando como os usuários podem ganhar emblemas e como visualizar instruções passando o mouse sobre os emblemas',
  },
  performanceBadgesSectionAlertNoBadgesTitle: {
    id: 'performance.badges.section.alert.no-badges.title',
    defaultMessage: 'Conclua o material da turma para ganhar conquistas!',
    description: 'Título para a mensagem de alerta quando nenhum emblema está disponível',
  },
  performanceBadgesSectionBadgesButtonText: {
    id: 'performance.badges.section.badges.button.text',
    defaultMessage: 'Conquistas',
    description: 'Texto do botão para visualizar emblemas na seção de desempenho',
  },
  performanceAvatarSectionAvatarSetsButtonText: {
    id: 'performance.avatar.section.avatar-sets.button.text',
    defaultMessage: 'Conjuntos de avatar',
    description: 'Texto do rótulo para conjuntos de avatar disponíveis na seção de desempenho',
  },
  performanceBadgesSectionAllBadgesButtonText: {
    id: 'performance.badges.section.all.badges.button.text',
    defaultMessage: 'Todas as conquistas',
    description: 'Texto do botão para visualizar todos os emblemas disponíveis na seção de desempenho',
  },
  performanceBadgesSectionTotalBadgesButtonText: {
    id: 'performance.badges.section.total.badges.button.text',
    defaultMessage: 'Total de conquistas',
    description: 'Texto do rótulo para todos os emblemas disponíveis na seção de desempenho',
  },
  dashboardProgressBadgeModalEmptyBadgesListTitle: {
    id: 'performance.badges.section.badges.modal.alert.empty-badges-list.title',
    defaultMessage: 'Conquistas estão a caminho!',
    description: 'Título para a mensagem de alerta quando nenhum emblema está disponível no modal',
  },
  dashboardProgressBadgeModalEmptyBadgesListDescription: {
    id: 'performance.badges.section.badges.modal.alert.empty-badges-list.description',
    defaultMessage: 'Suas recompensas estão quase aqui! O administrador está preparando conquistas especiais para celebrar suas realizações. Aguente firme, e elas aparecerão em seu inventário, prontas para a ação!',
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
    defaultMessage: 'Conquista do quadro de líderes',
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
    defaultMessage: 'Seu avatar aparecerá assim que você ganhar alguns pontos!',
    description: 'Título do alerta exibido quando o conjunto de avatar selecionado não está concluído no modal do conjunto de avatar de progresso.',
  },
  dashboardProgressAvatarSetModalAlertAvatarSetNotCompletedText: {
    id: 'dashboard.progress-avatar-set.modal.alert.avatar-set-not-completed.text',
    defaultMessage: 'Comece a ganhar pontos concluindo o material das aulas.',
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
  dashboardPointsVaultSectionTitle: {
    id: 'dashboard.points-vault.section.title',
    defaultMessage: 'Seu cofre',
    description: 'Título para o roteiro de pontos.',
  },
  dashboardPointsVaultSectionDescription: {
    id: 'dashboard.points-vault.section.description',
    defaultMessage: 'Cada quest concluída, cada desafio superado! Ganhe pontos valiosos ao agir na plataforma. Este cofre seguro protege seu tesouro em crescimento, marcando cada passo do seu caminho!',
    description: 'Descrição para o roteiro de pontos.',
  },
  dashboardPointsVaultSectionTotalPoints: {
    id: 'dashboard.points-vault.section.total.points',
    defaultMessage: 'Total de pontos:',
    description: 'Rótulo para o total de pontos na seção do cofre de pontos.',
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
  leaderboardEmptyTitle: {
    id: 'leaderboard.empty.title',
    defaultMessage: 'O Quadro de Líderes está vazio',
    description: 'Título para o estado vazio do quadro de líderes.',
  },
  leaderboardEmptyDescription: {
    id: 'leaderboard.empty.description',
    defaultMessage: 'Não há usuários para exibir no quadro de líderes. Quando os participantes interagem, os rankings aparecerão aqui.',
    description: 'Descrição para o estado vazio do quadro de líderes.',
  },
});

export default messages;
