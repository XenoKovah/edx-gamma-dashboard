"""
Gamification leaderboard URLs.
"""
from django.conf.urls import include, url

from .views import LeaderboardView


urlpatterns = [
    url(r'api/', include('gamma_dashboard.leaderboard.api.urls')),
    url(r'^$', LeaderboardView.as_view(), name="gamification-leaderboar"),
]
