```

```

```shell
/ROOT_FOLDER
    /.venv
    /backend
    │── manage.py
    │─> requirements.txt
    │── myapp/
    │── myproject/
    /frontend
    │── manage.py
    │── requirements.txt
    │── myapp/
    │── myproject/
```

# Django course

## 1 Getting started

### 1.1 Setup

Inside the folder that you want to ceate the django projects

```shell
    py -m venv .venv
```

- in mac or linux

```shell
    source .venv/bin/activate
```

- in windows, specifically in my computer i need to got manually into the Script file and type "activate.bat"

```shell
    source .venv/Scripts/activate
```

- IN MY CASE:

```shell
    cd .venv/scripts
    activate.bat
```

-

```shell
    py -m pip install django
```

- (OPTIONAL) check that it wass install correctly by typing

```shell
    py
```

```shell
    import django
```

```shell
    print(django.get_version())
```

```shell
    quit()
```

- CREATE your project:
- 2x cd.. to get to the root folder

```shell
    django-admin startproject [MY_PROJECT]
```

```shell
    cd [MY_PROJECT]
```

- now at the same level of your manage.py create a requirements.txt:

```shell
/ROOT_FOLDER
    /.venv
    /backend
    │── manage.py
    │─> requirements.txt
    │── myapp/
    │── myproject/
```

- copy this inside:

```txt
djangorestframework
djangorestframework-simplejwt
django-filter
```

type in console:

```shell
    pip install -r requirements.txt
```

- RUNSERVER type in console

```shell
    py manage.py runserver
```

### 1.2 Creating views

- create a file called views and add inside some views:

```python
from django.http import HttpResponse


def homepage(request):
    return HttpResponse("Hello, World! I'm Home")

def about(request):
    return HttpResponse("I'm the about page")
```

- link your views to the urls.py file:

```python
from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.homepage),
    path('about/', views.about),
]
```

### 1.3 Creating templates

- create a "templates" folder in your OUTER [MY_PROJECT] folder, get inside this "templates" folder and create 2 htmls files with the names of your pages (in this case home.html and about.html)

- then go to settings.py and add your folder name to the TEMPLATES 'DIRS' list:

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

then go to the views.py and import render

```python
from django.shortcuts import render
```

### 1.4 linking styles.css

- create a "statics" folder in your OUTER [MY_PROJECT] folder, get inside it, create a "css" folder, get inside it, create a "style.css" file.

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Roboto", sans-serif;
  background-color: #f5f5f5;

  min-height: 100dvh;
  display: grid;
  place-content: center;
  font-size: 3rem;
  background-color: rgb(20, 20, 20);
  color: whitesmoke;
}

h1,
p {
  text-align: center;
}
```

- in setting.py add (notice that you need to import os.path):

```python
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static')
]
```

- now in the htmls you need to import the statics:

```html
{% load static %}
```

- then link your css to the html:

```html
<link rel="stylesheet" href="{% static 'css/style.css' %}" />
```

- the final result looks like:

```html
<!DOCTYPE html>
{% load static %}
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="{% static 'css/style.css' %}" />
    <title>Portfolio</title>
  </head>
  <body>
    <h1>Home</h1>
    <p>Take a look to my <a href="about/">about</a> page</p>
  </body>
</html>
```

### 1.4 linking javascript

- create a folder "js" inside statics, create a file "main.js", put any code you want ex.

```js
console.log("hello world");
```

- go to the html file where you want the js code to apply and add this after the title tag:

```html
<script src="{% static 'js/main.js' %}" defer></script>
```

## 2 Creating apps in django

- write in your terminal (make sure the env in activated)

```shell
py manage.py startapp [APP_NAME]
```

- inside the inner [MY_PROJECT], in the settings.py file find the INSTALLED_APPS and add to the list your new app [APP_NAME]. lets calle it "posts"

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    '[APP_NAME]',
]
```

- now we will create a templates folder specifically for this app inside the [APP_NAME] folder.
- create an html for this [app_name] could be index.html or other like "post_list.html"

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Post_list</title>
  </head>
  <body>
    <h1>Post list</h1>
  </body>
</html>
```

- now we need to link this html but in our new app we dont have a url.py so lets create it and fill it with:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_list),
]
```

- inside the app's views.py we need to create responses:

```python
from django.shortcuts import render

def post_list(request):
    return render(request, 'posts/post_list.html')
```

- now we need to register this path of our app to our main project, so we navigate to the main urls.py and import include from django.urls.

```python
from django.urls import path, include
```

- and add to the urlpatterns list the new url pattern:

```python
path('posts/', include('posts.urls')),
```

- final result:

```python
from django.contrib import admin
from django.urls import path, include
from . import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.homepage),
    path('about/', views.about),
    path('posts/', include('posts.urls')),
]
```

#### 1 create app in console

```shell
py manage.py startapp [APP_NAME]
```

#### 2 register new app in INSTALLED_APPS

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    '[APP_NAME]',
]
```

#### 3 create urls.py and urls patterns inside the new app:

```python
from django.urls import path
from . import views

app_name = 'users'

urlpatterns = [
    path('register/', views.register_view, name="register"),
]
```

#### 4 add the new pattern to main patterns inside inner [MY_PROJETC] urlpatterns list:

```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.homepage),
    path('about/', views.about),
    path('users/', include('users.urls')),
]
```

#### 5 create views fuction inside the new app views.py

```python
from django.shortcuts import render


def register_view(request):
    return render(request, 'users/register.html')
    # Notice that this specific url indicates where is the html physically ubicated in the app folder "templates" -> solders "users" -> file register.html
```

#### 6 create the templates folder and the html file for the new app

```python
'users/register.html'
# Notice that this specific url indicates where is the html physically ubicated in the app folder "templates" -> solders "users" -> file register.html
```

## 3 Models

- create a model in the app "posts" models.py:

```python
class Post(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField()
    slug = models.SlugField(max_length=100, unique=True)
    date = models.DateTimeField(auto_now_add=True)
```

this is the "database model"

stop the server and type in console:
every time there is a change in the models:

```shell
py manage.py migrate

```

```shell
py manage.py makemigrations

```

## 4 Orm (object relational mapping)

```shell
py manage.py shell
```

??????

## 5 create a super user from cmd

```shell
py manage.py createsuperuser
```

## 6 Create a form

- you can have a predetermine form from the django framework:

```python
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm


def register_view(request):
    if request.method == 'POST': #validate the form & save the form
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("posts:list") #where do you want to be redirected
    else:
        form = UserCreationForm() #this create the form again if there is an error

    return render(request, 'users/register.html', {'form': form}) #this is the default form creation
```

## register/login form

- this two views are in the same app and they share the first part of the url "users/"

- urls.py

```python
from django.contrib import admin
from django.urls import path, include
from . import views
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.homepage),
    path('about/', views.about),
    path('posts/', include('posts.urls')),
    path('users/', include('users.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

- views.py

```python
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login


def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("posts:list")
    else:
        form = UserCreationForm()

    return render(request, 'users/register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            login(request, form.get_user())
            return redirect("posts:list")
    else:
        form = AuthenticationForm()

    return render(request, 'users/login.html', {'form': form})
```

## 8 Logout

- you can use this form type for log out in your html

```html
<form action="{% url 'users:logout' %}" method="post" title="logout">
  {% csrf_token %}
  <button>👉</button>
</form>
```

- then you need to set your function in view.py

```python
from django.contrib.auth import logout

def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return redirect("posts:list")
```

- and add this to the users/url.py urlpatterns list :

```python
urlpatterns = [
    path('register/', views.register_view, name="register"),
    path('login/', views.login_view, name="login"),
    path('logout/', views.logout_view, name="logout"),#here
]
```
