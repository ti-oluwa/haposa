import typing
import string


contact_email_template = string.Template(
    """
    <html>
        <body>
            <h1>Contact Us Form Submission</h1>
            <p><strong>First Name:</strong> ${firstname}</p>
            <p><strong>Last Name:</strong> ${lastname}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Country:</strong> ${country}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        </body>
    </html>
    """
)


def build_contact_email(data: typing.Mapping[str, str]) -> str:
    """
    Generates the contact email template with the provided data.

    :param data: A dictionary containing the data to fill in the template.
    :return: A string containing the filled-in email template.
    """
    return contact_email_template.substitute(data)
