"""
Gamification leaderboard URLs.
"""
from django.conf.urls import include, url

from gamma_dashboard.leaderboard.page.views import LeaderboardView


urlpatterns = [
    url(r'^$', LeaderboardView.as_view(), name="leaderboard-page"),
    url(r'api/', include(('gamma_dashboard.leaderboard.api.urls', 'gamma.api'), namespace="api"))
]
