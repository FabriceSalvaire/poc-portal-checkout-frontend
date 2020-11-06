# Web Accessibility

## Guide du développeur RGAA 3 pour les administrations — DISIC

* https://disic.github.io/guide-developpeur
* https://github.com/DISIC/guide-developpeur

## Accessible Rich Internet Application (WAI ARIA)

* https://www.accede-web.com/notices/html-et-css

* Use HTML tags for their semantic value
  use `<a>` for a link to another page or somewhere in the page
  use `<button>` or `<input />` for actions
* use `aria-label` or `title` on non explicit links or actions
  `<a href="…" aria-label="Read more: …"> Read more </a>`
  but don't use when it is explicit
* use `alt` on images appropriately
  ```
  <img src="error-icon.png" alt="" />
  <svg aria-hidden="true" focusable="false">[…]</svg>

  <img src="walk-icon.png" alt="Walk: " />
  <svg role="img" aria-label="Walk: " focusable="false">[…]</svg>

  <img src="complex-image.png" alt="explanation text …" />
  <svg role="img" aria-label="explanation text …" focusable="false">[…]</svg>

  <input type="image" src="magnigication-icon.png" alt="Search" />

  <a href="/">
      <svg role="img" aria-label="Home Page" focusable="false">[…]</svg>
  </a>
  ```
  but don't add "Link to …", "Image …" or "Button …"
  ```
  <a href="/">
      <img src="home-icon.png" alt="Link to Home Page" />
  </a>
  ```
  since `<a>` or `<image>` already provide this information
* icons
  ```
  <h2>
      <span class="error-icon" aria-hidden="true"></span>
      Error message
  </h2>

  .not-screen {
      position: absolute;
      left: -99999rem;
  }

  <p>
      <span class="walk-icon" aria-hidden="true"></span>
      <span class="not-screen">Walk: </span>
      <span>2 min</span>
      <span>111 m</span>
  </p>
  ```
* forms
  ```
  <label for="name">Your name</label>
  <input type="text" id="name" name="name" autocomplete="family-name" />

  <input type="search" title="Your search" name="search" />
  <input type="submit" value="Search" />

  <select title="Sort news" name="filter">
     <option>Per date</option>
     <option>Per topic</option>
     […]
  </select>
  ```

  see also https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete

  Don't use `placehoder` to provide information
  ```
  <label for="birthdate">
       Your birth date
      <span>(using format dd/mm/yyyy)</span>
  </label>
  <input type="date" id="birthdate" name="birthdate" autocomplete="bday" />

  <label for="document">
       Add a document
  </label>
  <input type="file" id="document" name="document" aria-describedby="formats" />
  <p id="formats">Accepted file formats : pdf or doc.</p>
  ```

  Use `required` or `aria-required="true"` for required fields
  ```
  <label for="email">Your email *</label>
  <input type="email" id="email" name="email" autocomplete="email" required />

  <input type="checkbox" id="conditions" aria-required="true" />
  <label for="conditions">text ...</label>
  ```

  ```
  <label for="name">
      Your name *
      <span>Please enter your name</span>
  </label>
  <input type="text" id="name" name="name" autocomplete="family-name" aria-required="true" aria-invalid="true" />

  <label for="email">
      Your email *
      <input type="email" id="email" name="email" autocomplete="email" aria-required="true" aria-invalid="true" />
      <span>Please respect the email format (exemple@domaine.fr)</span>
  </label>

  <label for="document">
      Add a document
  </label>
  <input type="file" id="document" name="document" aria-invalid="true" aria-describedby="formats error" />
  <p id="error">Invalid file format</p>
  <p id="formats">Accepted file formats : pdf or doc.</p>
  ```

  Use `fieldset` when some fields share the same title
  ```
  <fieldset>
      <legend>Participant 1</legend>
      <label for="forname-1">Forname</label>
      <input type="text" id="forname-1" name="forname-1" />
      <label for="name-1">Name</label>
      <input type="text" id="name-1" name="name-1" />
      […]
  </fieldset>
  <fieldset>
     <legend>Participant 2</legend>
     <label for="forname-2">Forname</label>
     <input type="text" id="forname-2" name="forname-2" />
     <label for="name-2">Name</label>
     <input type="text" id="name-2" name="name-2" />
     […]
  </fieldset>
  ```

  Use `fieldset` and `legend` for radio-buttons, checkboxes, ...
  ```
  <fieldset>
      <legend>Sports practiced</legend>
      <ul>
          <li>
              <input type="checkbox" id="basket" />
              <label for="basket">Basket</label>
          </li>
          <li>
              <input type="checkbox" id="tennis" />
              <label for="tennis">Tennis</label>
          </li>
          […]
      </ul>
  </fieldset>
  ```
* use the right markup for list
  ```
  <ul>
      <li></li>
  </ul>

  <ol>
      <li></li>
  </ol>

  <dl>
      <dt></dt>
	  <dd></dd>
  </dl>
  ```

## Colour

* https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast
