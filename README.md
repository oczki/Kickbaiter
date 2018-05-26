# Kickbaiter

Userscript for web browsers. Made to hide clickbait-ish projects from the Discovery view on Kickstarter. The Technology section is particularly annoying, filled with "world's first gizmos", "Gadgets. Reinvented.", "holographic wallets", and "game-changing contraptions".

Projects found to be clickbait get their div dimmed (15% opacity, 50% on hover), and the mouse cursor changes to 🛇 to discourage you even further.

Example list of triggers, which you are free to modify:

- `"(?!smartp)smart(er|est)?"`
- `"simple(r|st)?"`
- `"(world'?s? )?(1|fir|be|mo|smalle|large|wide)st"`
- `"game.?chang.*"`
- `"innovat.*"`
- `"levitat.*"`
- `"revolut.*"`
- `"3d print.*"`
- `"ultimate"`
- `"re[id]\w{3,7}ed"`
- `"hologra.*"`
- `"all\-?in\-?one"`

Installation
---

Get a browser extension that lets you run userscripts. Depending on your browser it might be called Tampermonkey, Greasemonkey, or some other animal.

Then, copy the contents of the `Kickbaiter.user.js` file from this repo and paste it in your extension's editor.

Save and browse the Discovery section on Kickstarter. After a few scrolls you should see some project's box dimmed.

License
---

MIT. See the LICENSE file.
