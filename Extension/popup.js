// ── Settings storage keys ──────────────────────────────────────────────────
const STORAGE_API_KEY  = 'surfer_api_key';
const STORAGE_SERVICE  = 'surfer_service';
const STORAGE_MODEL    = 'surfer_model';
const STORAGE_THEME    = 'theme-preference';

// ── View toggling ──────────────────────────────────────────────────────────
const mainView      = document.getElementById('main-view');
const settingsView  = document.getElementById('settings-view');
const settingsToggle = document.getElementById('settings-toggle');
const noKeyWarning  = document.getElementById('no-key-warning');

settingsToggle.addEventListener('click', () => {
  const inSettings = settingsView.style.display !== 'none';
  mainView.style.display     = inSettings ? 'block' : 'none';
  settingsView.style.display = inSettings ? 'none'  : 'block';

  // Populate current values when opening settings
  if (!inSettings) {
    chrome.storage.local.get([STORAGE_API_KEY, STORAGE_SERVICE, STORAGE_MODEL], (data) => {
      document.getElementById('api-key-input').value  = data[STORAGE_API_KEY]  || '';
      document.getElementById('service-select').value = data[STORAGE_SERVICE]  || 'together';
      document.getElementById('model-input').value    = data[STORAGE_MODEL]    || '';
    });
  }
});

// ── Save settings ──────────────────────────────────────────────────────────
document.getElementById('save-settings').addEventListener('click', () => {
  const apiKey  = document.getElementById('api-key-input').value.trim();
  const service = document.getElementById('service-select').value;
  const modelId = document.getElementById('model-input').value.trim();
  const status  = document.getElementById('settings-status');

  if (!apiKey) {
    status.textContent = '⚠️ API key cannot be empty.';
    status.style.color = 'var(--error-color)';
    return;
  }

  chrome.storage.local.set(
    { [STORAGE_API_KEY]: apiKey, [STORAGE_SERVICE]: service, [STORAGE_MODEL]: modelId },
    () => {
      status.textContent = '✓ Saved!';
      status.style.color = 'var(--success-color)';
      setTimeout(() => {
        status.textContent = '';
        // Return to main view
        settingsView.style.display = 'none';
        mainView.style.display     = 'block';
        checkApiKey();
      }, 1000);
    }
  );
});

// ── Toggle key visibility ──────────────────────────────────────────────────
document.getElementById('toggle-key-visibility').addEventListener('click', () => {
  const input = document.getElementById('api-key-input');
  input.type = input.type === 'password' ? 'text' : 'password';
});

// ── Check if API key is set and show warning ───────────────────────────────
function checkApiKey() {
  chrome.storage.local.get([STORAGE_API_KEY], (data) => {
    noKeyWarning.style.display = data[STORAGE_API_KEY] ? 'none' : 'block';
  });
}
checkApiKey();

// ── Submit / summarize ─────────────────────────────────────────────────────
document.getElementById('submit').addEventListener('click', function () {
  chrome.storage.local.get([STORAGE_API_KEY, STORAGE_SERVICE, STORAGE_MODEL], (data) => {
    const apiKey  = data[STORAGE_API_KEY]  || '';
    const service = data[STORAGE_SERVICE]  || 'together';
    const modelId = data[STORAGE_MODEL]    || '';

    if (!apiKey) {
      document.getElementById('summaryContainer').innerText =
        'Please add your API key in the extension settings (⚙️).';
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const url    = tabs[0].url;
      const action = document.querySelector('input[name="action"]:checked').value;

      let endpoint = '';
      if (action === 'website_info') {
        endpoint = 'http://127.0.0.1:5000/website_info';
      } else if (action === 'webpage_summary') {
        endpoint = 'http://127.0.0.1:5000/summarize_webpage';
      }

      const summaryContainer = document.getElementById('summaryContainer');
      summaryContainer.innerText = 'Loading…';

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, api_key: apiKey, service, model_id: modelId }),
      })
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok: ' + response.statusText);
          return response.json();
        })
        .then(data => {
          summaryContainer.innerText = data.summary || data.error;
        })
        .catch(error => {
          console.error('Fetch error:', error);
          summaryContainer.innerText = 'Error: ' + error.message;
        });
    });
  });
});

// ── Copy summary on click ──────────────────────────────────────────────────
document.getElementById('summaryContainer').addEventListener('click', function () {
  const summaryText = this.innerText;
  if (!summaryText || summaryText === 'Loading…') return;

  navigator.clipboard.writeText(summaryText).then(() => {
    const copiedText = document.getElementById('copiedText');
    this.classList.add('blur');
    copiedText.style.display = 'block';
    setTimeout(() => {
      this.classList.remove('blur');
      copiedText.style.display = 'none';
    }, 1500);
  }).catch(err => console.error('Could not copy text:', err));
});

// ── Theme toggle ───────────────────────────────────────────────────────────
const themeToggle = document.getElementById('theme-toggle');

const getColorPreference = () => {
  return localStorage.getItem(STORAGE_THEME) ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
};

const theme = { value: getColorPreference() };

const reflectPreference = () => {
  document.firstElementChild.setAttribute('data-theme', theme.value);
  themeToggle.setAttribute('aria-label', theme.value);
  if (theme.value === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
};

const setPreference = () => {
  localStorage.setItem(STORAGE_THEME, theme.value);
  reflectPreference();
};

reflectPreference();

window.onload = () => {
  reflectPreference();
  themeToggle.addEventListener('click', () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    setPreference();
  });
};

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches: isDark }) => {
  theme.value = isDark ? 'dark' : 'light';
  setPreference();
});
