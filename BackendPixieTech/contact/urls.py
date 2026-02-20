from django.urls import path
from .views import contact_api, short_contact


urlpatterns = [
    path('contact/', contact_api),
    path('short/', short_contact),
]
from .views import index_page, contact_page, about_page, services_page, contact_form_page

urlpatterns += [
    path('', index_page, name='index'),
    path('contact/', contact_page, name='contact'),
    path('about/', about_page, name='about'),
    path('services/', services_page, name='services'),
    path('contact-form/', contact_form_page, name='contact_form'),
]