# Paon.js

<div align="center">
  <img src="https://cdn.pooks.fr/images/github/paon/white.png" alt="Paon.js" />
</div>

## Explains

**How does paon.js work ?**

It's very simple, just follow the following HTML structure and paon will do the rest :D. A CSS sheet is available so you don't have to style yourself or at least have a base.

**HTML Structure**

```html
<div class="paon--select paon--list-inactive" data-paon-select>
  <p class="paon--view" data-paon-view><span data-paon-value>{{paon-selected}}</span><span class="i-ico icon right material-icons">&#xE5C7;</span></p>
  <ul class="paon--list">
    <li class="paon--option">20 par page</li>
    <li class="paon--option">50 par page</li>
    <li class="paon--option paon--selected">100 par page</li>
    <li class="paon--option">200 par page</li>
  </ul>
</div>
```
Add before `</body>`
```html
<script type="text/javascript">PaonSelect_Initialize();</script>
```

You can adjust the number of elements by adding `<li>` as you go, there is no limitation.

### Works out

Paon.js also allows you to automatically launch other JS functions when clicking on an item in the list. To do this it calls the function `PaonBridgeFunction(e);` the event parameter is passed to the function.<br>
Now you just have to create a custom function to do what you want :D
