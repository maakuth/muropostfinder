# muropostfinder
Find [MuroBBS](https://fi.wikipedia.org/wiki/Muropaketti#MuroBBS) posts from Internet Archive. You can use it via the [Internet Archive item](https://ia601401.us.archive.org/32/items/murolinks/index.html).
The very first row in the database has postid 1706505145, so you can start with that.

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