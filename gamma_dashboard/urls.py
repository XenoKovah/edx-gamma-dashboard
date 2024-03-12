"""
Gamification dashboard urls.
"""
from django.urls import include, re_path

from gamma_dashboard.dashboard.core.gamma.settings import gamma_settings
from gamma_dashboard.dashboard.page.views import DashboardView


urlpatterns = []

if gamma_settings.bridge.get('ENABLED'):
    urlpatterns.extend([
        re_path(r'^dashboard/', DashboardView.as_view(), name="gamma-dashboard"),
        re_path(r'^leaderboard/', DashboardView.as_view(), name="gamma-leaderboard"),
        re_path(r'^api/', include(('gamma_dashboard.dashboard.api.urls', 'gamma-api'), namespace='gamma-api')),
    ])
