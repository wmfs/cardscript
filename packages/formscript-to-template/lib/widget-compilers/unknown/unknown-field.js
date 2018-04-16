export function templateCompiler (widget) {
  return `<div><hr>
<h3>Unknown widget type '${widget.type}'</h3>
<pre>${JSON.stringify(widget, null, 2)}</pre>
<hr>
</div>`
}
