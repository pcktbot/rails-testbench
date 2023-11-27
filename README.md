# README

This README would normally document whatever steps are necessary to get the
application up and running.


### Adding js (npm, yarn, bun) libraries using importmap

> Don't try to point the importmap.rb to the node_module.

Instead, run these commands to install via jspm and update the importmap.rb

```
./bin/importmap pin [package_name]
```

This will install and add a line to the `config/importmap.rb` file.

The alias is then accessible by the package name in your browser javascript.


### Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
