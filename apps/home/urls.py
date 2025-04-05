from django.urls import path
from . import views

app_name = "apps.home"


urlpatterns = [
    path("", views.index_view, name="index"),
    path("contact-us-form/", views.contact_us_form_view, name="contact_us_form"),
]
