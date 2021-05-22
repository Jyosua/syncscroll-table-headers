# Syncscroll Table Headers
This is a javascript module that is intended to create nicely scrolling sticky table headers.

I created this because if you have actual data tables and want to use table markup, yet support proper sticky headers, it's generally a big pain to do so.
This module searches for divs with "syncscroll sync-name-XXXX" format class names, duplicates the headers as a separate overlapping div, and then syncs the headers to scroll properly when the table is scrolled.

I used jQuery because I was using this in a MediaWiki installation and it simplified a lot of the code.
