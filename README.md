[![build status](https://secure.travis-ci.org/alejandromg/gridspot.png)](http://travis-ci.org/alejandromg/gridspot)
# gridspot

[Gridspot](https://gridspot.com) for the rest of us.

**node.js cli-tool**

## Getting Started

Install the module with: `npm install gridspot -g`. Then, just do `gridspot`.


## Use

	Gridspot for your cli

	usage:

		gridspot <API_KEY>               Simple usage. <API_KEY> from https://gridspot.com/compute/account
		gridspot -s,--save <API_KEY>     Save the <API_KEY> to ~/.gridspot so future request you can avoid the api key.
		gridspot -i <API_KEY>            Interactive response (if available)
		gridspot -r, --raw <API_KEY>     Raw response
		gridspot -v, --version           Current version
		gridspot -h, --help              Show this help

    By Default it'll only show the ssh servers



## Examples

By default `gridspot` will show you the ip of your servers and the status (`gridspot <api_key>`)

	$ gridspot -s apikey_A2iG6Uvrug2B-qsmWuwX5g # to save the api to the fs for future requests
	$ gridspot -i # interactive mode (using cdir)
	$ gridspot --raw # raw response

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt). And idiomatic.js.

## Release History
- `0.0.0` - July

## License
Copyright (c) 2012 Alejandro Morales  
Licensed under the MIT license.
