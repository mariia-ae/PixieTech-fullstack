#!/usr/bin/env bash
set -o errexit
python -m pip install --upgrade pip
pip install whitenoise==6.6.0
pip install -r requirements.txt
cd BackendPixieTech
python manage.py collectstatic --noinput
python manage.py migrate
