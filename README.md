# Workflowy Task Highlighter

I saw
[this](https://blog.workflowy.com/2014/04/24/workflowy-tip-dates-for-easy-filtering/)
post on the Workflowy blog recently, and I liked the idea of tagging my todos to
make them easier to find. What I didn't like was looking at one single list of
tasks with no simple indication of what was due today, and what wasn't. I also
wasn't excited about the prospect of manually updating a #today tag every day.
Instead, I wrote this extension. When the page loads, it looks for any tags
matching today's date in the format #d-YYYY-mm-dd. For example, on the day that
this was written, the tag would have been #d-2017-10-10 (October 10, 2017). Any
tag that matches is given a red background.

At midnight, yesterdays tags will no longer be highlighted.

## Building

To build, simply use the [web-ext](https://github.com/mozilla/web-ext) tool.

	$ web-ext build
