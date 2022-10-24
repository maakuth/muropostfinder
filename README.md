# muropostfinder
Find [MuroBBS](https://fi.wikipedia.org/wiki/Muropaketti#MuroBBS) posts from Internet Archive. You can use it via the [Internet Archive item](https://ia601401.us.archive.org/32/items/murolinks/index.html).
The very first row in the database has postid 1706505145, so you can start with that.

The search works by either inputting the postid to the text field and pressing the button (or Return), or setting the postid to the url hash (adding #12345 to the end of the url).

If you want to make a bookmarklet or something to find the threads directly, you can add #redirect after your postid in the url and you'll be redirected to the result directly.

## What?
This is a backendless search engine that allows finding archived
[MuroBBS](http://web.archive.org/web/20220412011008/https://murobbs.muropaketti.com/)
threads by post ids.

The sorcery is enabled by [sql.js-httpvfs](https://github.com/phiresky/sql.js-httpvfs), which is wasm binary of sqlite coupled with virtual filesystem that uses HTTP  range queries. It sounds weird but seems to work fine in this use case.

## Why though? 
MuroBBS was grabbed to the Internet Archive during its last week online and made available in the Wayback Machine.
This grab apparently succeeded in grabbing all the thread pages, but the post urls didn't make it.
However, the post urls were just redirects to thread pages and the post ids are in the pages.
So, I made an sqlite database out of the postid - threadid mappings and then this tool to search them.

## Reuse
At the current state this tool is not very well finished toolkit for creating new search sites like the one I made.
It should be possible though.
If you use it for your own projects, it would be fun to learn about it.
If you refine it for better reusability, please make a PR.

## Howto reuse
1. Find the links you want to include in the search
1. Add them to a sqlite3 database. See [the example script](add-to-database-example.py) for an example of that.
1. Fork this repository, and change MuroBBS references to your own, remember to update the configuration to match your sqlite3 database!
1. Build with `npm run build` and copy the contents of dist/ and public/ to your hosting provider
1. That's it!
