# API DOCS
To run project clone this folder, create a [python environment](https://docs.python.org/3/library/venv.html) and activate it
Install requirements using ```pip install -r requirements.txt``` at the root folder of the project
Run project with ```python manage.py runserver```
Project name is kwara_api_django and has one application inside kwara_api_django/api

The api urls to be used to connect into the frontend application are inside the kwara_api_django/api/urls.py and views at kwara_api_django/api/views.py
For example ```path('register/', views.create_member)``` can be accessed through ```path('register/', views.create_member),```
