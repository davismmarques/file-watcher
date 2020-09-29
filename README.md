File Change Watcher
===================

Watch a text or JSON file and print a diff of changes when the file is updated.


## Install

You can either install the module into your NPM globals package directly or
clone the repo then manually install it.

To install the global package directly, execute:

    npm install -g https://github.com/davismmarques/file-watcher

To manually install the package, start by cloning the repo:

    git clone https://github.com/davismmarques/file-watcher.git

From inside the repo, install application dependencies:

    npm install

Install as a global module:

    npm install -g .

It then adds a script called fwatch to your PATH.


## Usage

Call the fwatch command with the path to an existing file:

    fwatch /path/to/file


## License

See LICENSE file.
