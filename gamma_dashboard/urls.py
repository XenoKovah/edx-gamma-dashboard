"""
Gamification dashboard urls.
"""
from django.conf.urls import include, url

from gamma_dashboard.dashboard.core.gamma.settings import gamma_settings
from gamma_dashboard.dashboard.page.views import DashboardView


urlpatterns = []

if gamma_settings.bridge.get('ENABLED'):
    urlpatterns.extend([
        url(r'^dashboard/', DashboardView.as_view(), name="gamma-dashboard"),
        url(r'^leaderboard/', DashboardView.as_view(), name="gamma-leaderboard"),
        url(r'^api/', include('gamma_dashboard.dashboard.api.urls', namespace='gamma-api')),
    ])
