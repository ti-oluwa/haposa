import json
import logging
from django.conf import settings
from django.views.generic import TemplateView, View
from django.http import JsonResponse
from django.core.mail import send_mail

from .forms import ContactUsForm
from .mailing import build_contact_email


logger = logging.getLogger(__name__)


class HomeView(TemplateView):
    template_name = "home/index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["delivery_count"] = 10000
        context["customer_count"] = 500
        return context


class ContactUsFormView(View):
    http_method_names = ["post"]

    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode("utf-8"))
        form = ContactUsForm(data)
        if not form.is_valid():
            return JsonResponse(
                {
                    "status": "error",
                    "detail": form.errors.as_text(),
                },
                status=400,
            )

        form_data = form.cleaned_data
        try:
            message = build_contact_email(form_data)
            send_mail(
                subject="Contact Us Form Submission",
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.DEFAULT_FROM_EMAIL],
                fail_silently=False,
                html_message=message,
            )
        except Exception as exc:
            logger.error("Error sending contact us email: %s", exc)
            logger.exception(exc)
            return JsonResponse(
                {
                    "status": "error",
                    "detail": "There was an error sending your message. Please try again later.",
                },
                status=500,
            )

        return JsonResponse(
            {
                "status": "success",
                "message": "Thanks for contacting us! We will be in touch soon.",
            }
        )


index_view = HomeView.as_view()
contact_us_form_view = ContactUsFormView.as_view()
