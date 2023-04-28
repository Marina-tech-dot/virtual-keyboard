class Dom {
  constructor(el) {
    this.$el = typeof el === 'string' ? document.querySelector(el) : el;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  insertText(text) {
    return this.$el.textContent = text
  }

  addClass(classes) {
    if (classes) {
      this.$el.classList.add(...classes);
    }
    return this;
  }

  removeClass(classes) {
    if (classes) {
      this.$el.classList.remove(...classes);
    }
    return this;
  }

  addClassSetTimeout(classes, delay) {
    if (classes) {
      for (let i = 0; i < classes.length; i++) {
        this.$el.classList.add(classes[i]);
      }
      setTimeout(() => {
        for (let i = 0; i < classes.length; i++) {
          this.$el.classList.remove(classes[i]);
        }
      }, delay);
    }
    return this;
  }

  toggleClass(classes) {
    if (classes) {
      this.$el.classList.toggle(...classes);
    }
    return this;
  }

  toggleClassSetTimeout(classes, delay) {
    if (classes) {
      setTimeout(() => {
        for (let i = 0; i < classes.length; i++) {
          this.$el.classList.toggle(classes[i]);
        }
      }, delay);
    }
    return this;
  }

  textContent(text) {
    if (text) {
      this.$el.textContent = text;
    }
    return this;
  }

  addDataAttribute(atrib) {
    if (atrib) {
      for (let i = 0; i < atrib.length; i++) {
        Object.keys(atrib[i]).map((key) => {
          this.$el.setAttribute(`data-${key}`, `${atrib[i][key]}`);
        });
      }
    }
  }

  innerText() {
    return this.$el.innerText;
  }

  css(styles = {}) {
    const cssStylesString = Object.entries(styles)
      .map(([key, value]) => `${key}:${value}`)
      .join(';');
    return (this.$el.style.cssText = `${cssStylesString}`);
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  find(selector) {
    return this.$el.querySelector(selector);
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  children(pos, parent) {
    return $(parent.$el.children[pos]);
  }

  removeChild(child) {
    this.$el.removeChild(child);
  }

  remove() {
    this.$el.remove();
  }

  hasClass(className) {
    return this.$el.classList.contains(...className);
  }
}

export function $(el) {
  return new Dom(el)
}

$.create = (tag, className) => {
  const newEl = document.createElement(tag)
  if (className) {
    newEl.classList.add(className)
  }

  return $(newEl)
}
