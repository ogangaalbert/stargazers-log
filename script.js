const eventList = document.getElementById('events');

async function fetchEvents() {
  try {
    const response = await fetch('events.json');

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    renderEvents(data.events);
  } catch (error) {
    eventList.innerHTML = '<li class="event-error">Unable to load the starred repositories.</li>';
    console.error(error);
  }
}

function renderEvents(events) {
  eventList.innerHTML = '';

  events.forEach((event) => {
    const listItem = document.createElement('li');

    const title = document.createElement('div');
    title.className = 'event-title';

    const repoLink = document.createElement('a');
    repoLink.href = event.url;
    repoLink.textContent = event.name;
    repoLink.target = '_blank';
    repoLink.rel = 'noopener noreferrer';

    title.appendChild(repoLink);

    const description = document.createElement('p');
    description.className = 'event-description';
    description.textContent = event.description;

    const meta = document.createElement('div');
    meta.className = 'event-meta';

    const language = document.createElement('span');
    language.textContent = `Language: ${event.language}`;

    const stars = document.createElement('span');
    stars.textContent = `Stars: ${event.stargazers}`;

    meta.append(language, stars);

    listItem.append(title, description, meta);
    eventList.appendChild(listItem);
  });
}

fetchEvents();
