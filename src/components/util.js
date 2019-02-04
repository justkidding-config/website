import uniqid from 'uniqid';
import { escape } from 'he';
import marked from 'marked';
import { jk } from '../params.json';

export function sluggify(text) {
  return text.toLowerCase().trim().replace(/(&amp;| & )/g, '-and-').replace(/&(.+?);/g, '')
    .replace(/[\s\W-]+/g, '-');
}

export function parse(markdown, cb) {
  const renderer = new marked.Renderer({ langPrefix: 'lang-' });
  const base = new marked.Renderer({ langPrefix: 'lang-' });
  const example = (code) => {
    const id = uniqid('code-');

    return `<div class="uk-position-relative uk-margin-medium">

                    <ul uk-tab>
                        <li><a href="#">Preview</a></li>
                        <li><a href="#">Markup</a></li>
                    </ul>

                    <ul class="uk-switcher uk-margin">
                        <li>${code}</li>
                        <li><pre><code id="${id}" class="lang-html">${escape(code)}</code></pre></li>
                    </ul>

                    <div class="uk-position-top-right uk-margin-small-top">
                        <ul class="uk-iconnav">
                            <li><a class="js-copy" uk-tooltip="Copy to Clipboard" rel="#${id}"><img class="uk-icon" src="../images/icon-clipboard.svg" uk-svg></a></li>
                            <li><a class="js-codepen" uk-tooltip="Edit on Codepen" rel="#${id}"><img class="uk-icon" src="../images/icon-flask.svg" uk-svg></a></li>
                        </ul>
                    </div>
                </div>`;
  };

  // hrefLink builds the href for headers.
  const hrefLink = (text) => {
    const path = location.hash.split('/').splice(0, 3); // [ "documentation", "$page" ]
    path[0] = '';
    path.push(sluggify(text));
    return path.join('/');
  };

  renderer.strong = text => (text === 'Note' ? `<span class="uk-label">${text}</span>` : `<strong>${text}</strong>`);
  renderer.list = text => `<ul class="uk-list uk-list-bullet">${text}</ul>`;
  renderer.link = (href, title, text) => (href.match(/\.md/) ? base.link(href.replace(/.md(.*)/, '$1'), title, text) : base.link(href, title, text));
  renderer.code = (code, lang, escaped) => (lang === 'example' ? example(code) : `<div class="uk-margin-medium">${base.code(code, lang, escaped)}</div>`);
  renderer.hr = () => '<hr class="uk-margin-large">';
  renderer.table = (header, body) => `<div class="uk-overflow-auto"><table class="uk-table uk-table-divider"><thead>${header}</thead><tbody>${body}</tbody></table></div>`;
  renderer.heading = (text, level) => `<h${level} id="${hrefLink(text)}" class="uk-h${level > 1 ? level + 1 : level} tm-heading-fragment"><a href="#${hrefLink(text)}">${text}</a></h${level}>`;

  return marked(markdown, { renderer }, (err, content) => {
    content = content.replace(/{%latestVersion%}/g, jk.latestVersion);

    if (cb) {
      cb.apply(this, [err, content]);
    }
  });
}

export function html(el, fragment) {
  el.innerHTML = '';
  const range = document.createRange();
  range.selectNode(el);
  el.appendChild(range.createContextualFragment(fragment));
}
