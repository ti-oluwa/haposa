from django import forms


class ContactUsForm(forms.Form):
    """Form for the contact us page."""

    email = forms.EmailField(
        label="Email",
        widget=forms.EmailInput(attrs={"placeholder": "Your Email"}),
    )
    firstname = forms.CharField(
        label="First Name",
        max_length=30,
        widget=forms.TextInput(attrs={"placeholder": "Your First Name"}),
    )
    lastname = forms.CharField(
        label="Last Name",
        max_length=30,
        widget=forms.TextInput(attrs={"placeholder": "Your Last Name"}),
    )
    phone = forms.CharField(
        label="Phone Number",
        max_length=15,
        widget=forms.TextInput(attrs={"placeholder": "Your Phone Number"}),
    )
    country = forms.CharField(
        label="Country",
        max_length=30,
        widget=forms.TextInput(attrs={"placeholder": "Your Country"}),
    )
    message = forms.CharField(
        label="Message",
        widget=forms.Textarea(attrs={"placeholder": "Your Message"}),
    )
