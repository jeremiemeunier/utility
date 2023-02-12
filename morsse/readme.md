# Morsse.js

<div align="center">
  <img src="https://cdn.pooks.fr/images/github/morsse/white.png" alt="Morsse.js" />
</div>

## Explains

Morsse form allows the sending and processing of data and forms via AJAX and the `XMLHttpRequest();` object.

**HTML Structure**

Forms should be structured as follows :

```html
<form method="" action="" enctype="multipart/form-data" data-morsse-form>
  <div data-morsse-form-msg=""></div>
  <div data-morsse-form-reference="challenge_name">
    <label for="challenge_name">Nom de la compétition</label>
    <input type="text" name="challenge_name" id="challenge_name">
  </div>
  <div>
    <button data-morsse-submit" type="submit">Valider le formulaire</button>
  </div>
</form>
```

Adding this before `</body>`
```html
<script type="text/javascript">MorsseForm_Initialize(PUBLIC_API_KEY);</script>
```

In the case of use with [api.pooks.fr](https://api.pooks.fr), you will need to enter your public API key. It is not necessary if you do not use the [pooks.fr](https://pooks.fr) API.

### Settings

It is possible to give several parameters in JSON format in the `data-morsse-form` in order to configure it:
- `next` → Allows you to give an address to redirect to when validating the form.
- `loading` → Displays custom text or HTML content. By default if you don't set it Morsse will add the following code in the submit button `<span class="load mini">&nbsp;</span>`

**Multiple send**

It is possible to allow several form submissions by adding `data-morsse-restart` in the `form` tag, during processing if no error is returned by the server, Morsse will empty all fields and unblock the send button :
```html
<form method="" action="" enctype="multipart/form-data" data-morsse-form data-morsse-restart>
```

## API Response

The server response should be formatted as follows :

```json
{
  "error": false,
  "form_message": "Message",
  "references": {
    "name_of_reference": {
      "message": "Message"
    },
    "name_of_reference": {
      "message": "Message"
    }
  }
}
```

In addition, in the event of an error, the server must return a status other than 200.

## Morsse class

When processing forms, Morsse will assign custom class :

|class|Morsse activity|Response status|
|:-:|:-:|:-:|
|`.morsse-form-load`|Submit form waiting for server response||
|`.morsse-form-error`|An error is announced by the server|`400`, `404`, `500`|
|`.morsse-form-success`|The server does not return any errors|`200`|
