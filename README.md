# esformatter-jquery-chain

Esformatter plugin for formatting member expressions according to the jQuery style guide. Something like this:

```js
element
	.children()
		.bla()
		.blu()
		.parent()
			.height( 300 )
		.end()
	.end()
	.accordion();
```

## Usage

Install it via npm:

```sh
npm install esformatter-jquery-chain
```

Then add it to your esformatter config:

```json
{
  "plugins": [
    "esformatter-jquery-chain"
  ]
}
```
