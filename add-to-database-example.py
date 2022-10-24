#!/usr/bin/env python3

import sqlite3
import fileinput
import re

linkre = re.compile('(\d+)$')

def find_postid(line):
  """
  Finds number in the end of a URL. This where threadids are in MuroBBS links.
  """
  m = linkre.search(line)
  if m:
    return m.group(0)


"""
    You need to create an empty database for this first. You can do it by entering sqlite3 shell
    with `sqlite3 murolinks.sqlite3` and entering this:
    CREATE TABLE muro(
        postid BIGINT PRIMARY KEY,
        threadurl VARCHAR(261) NOT NULL
    );
    Then exit with ctrl+d
"""
con = sqlite3.connect("file:murolinks.sqlite3?mode=rw", uri=True)
count = 0 # The count stuff is not really needed, but gives you sense of progress with great numbers of links
for line in fileinput.input():
  count = count + 1
  postid = find_postid(line)
  if not postid:
    next
  try:
    con.execute("insert into muro values (?, ?)", (postid, line.strip()))
  except sqlite3.IntegrityError:
    # My material came with a handful of duplicates. Here's one way to ignore them
    print("Uniq violation on " + line.strip())
  if count > 1000:
    count = 0
    print('.', end='', flush=True)
con.commit()
