"""
Gamification dashboard urls.
"""
from django.conf.urls import include, url

urlpatterns = [
    url(r'leaderboard/',  include('gamma_dashboard.leaderboard.urls', namespace='leaderboard'))
]
