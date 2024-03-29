export function renderPosts(post, isButton = true) {
  const type = post.type === 'news'
    ? `<li class="tag tag-blue tag-rounded">Новость</li>`
    : `<li class="tag tag-rounded">Заметка</li>`;


  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const candidate = favorites.find(p => p.id === post.id);

  const button = candidate
    ? `<button class="button-round button-small button-danger" data-id="${post.id}" data-title="${post.title}">Удалить</button>`
    : `<button class="button-round button-small button-primary" data-id="${post.id}" data-title="${post.title}">Сохранить</button>`;

  return `
    <div class="panel">
      <div class="panel-head">
        <p class="panel-title">${post.title}</p>
        <ul class="tags">
          ${type}
        </ul>
      </div>
      <div class="panel-body">
        <p class="multi-line">${post.fulltext}</p>
      </div>
      <div class="panel-footer w-panel-footer">
        <small>${post.date}</small>
        ${isButton ? button : ''}
      </div>
    </div>`
}