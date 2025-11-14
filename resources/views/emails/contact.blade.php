<x-mail::message>
# New Contact Form Submission

You have received a new message from your contact form.

**Name:** {{ $contactData['name'] }}

**Email:** {{ $contactData['email'] }}

**Message:**

{{ $contactData['message'] }}

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
