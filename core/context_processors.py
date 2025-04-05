from django.conf import settings
from django.utils import timezone


def global_settings(_):
    """
    Adds global settings to the context.
    """
    return {
        "application_name": settings.APPLICATION_NAME,
        "application_alias": settings.APPLICATION_ALIAS,
        "application_email": settings.DEFAULT_FROM_EMAIL,
        "application_phone": settings.APPLICATION_PHONE,
        "current_year": timezone.now().year,
    }
