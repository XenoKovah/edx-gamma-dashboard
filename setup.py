#!/usr/bin/env python
# -*- coding: utf-8 -*-
# pylint: disable=C0111,W6005,W6100
from __future__ import absolute_import, print_function

import os
import re
import sys

from setuptools import setup, find_packages


def get_version(*file_paths):
    """
    Extract the version string from the file at the given relative path fragments.
    """
    filename = os.path.join(os.path.dirname(__file__), *file_paths)
    version_file = open(filename).read()
    version_match = re.search(r"^__version__ = ['\"]([^'\"]*)['\"]",
                              version_file, re.M)
    if version_match:
        return version_match.group(1)
    raise RuntimeError('Unable to find version string.')


VERSION = get_version('gamma_dashboard', '__init__.py')

if sys.argv[-1] == 'tag':
    print("Tagging the version on github:")
    os.system("git tag -a %s -m 'version %s'" % (VERSION, VERSION))
    os.system("git push --tags")
    sys.exit()

README = open(os.path.join(os.path.dirname(__file__), 'README.md')).read()
# CHANGELOG = open(os.path.join(os.path.dirname(__file__), 'CHANGELOG.rst')).read()

setup(
    name='edx-gamma-dashboard',
    version=VERSION,
    description="""Gamification dashboard pages for edx platform.""",
    long_description=README,
    author='Kyrylo Omelchenko / RG',
    author_email='kirill.omelchenko0@gmail.com',
    # url='',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'requests==2.27.0',
    ],
    license="Apache Software License 2.0",
    zip_safe=False,
    keywords='Gamification gamma dashboard leaderboard edx',
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: Apache Software License',
        'Natural Language :: English',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.8',
    ],
    entry_points={
        "lms.djangoapp": [
            "gamma_dashboard = gamma_dashboard.apps:GamificationDashboardConfig",
        ],
        "cms.djangoapp": [
        ],
    }
)
