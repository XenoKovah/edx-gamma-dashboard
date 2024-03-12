"""
Gamma leaderboard API URLs (root).

All API URLs should be versioned, so urlpatterns should only
contain namespaces for the active versions of the API.
"""
from django.urls import include, re_path

urlpatterns = [
    re_path(r'^v0/',  include(('gamma_dashboard.dashboard.api.v0.urls', 'api'), namespace='v0'))
]
