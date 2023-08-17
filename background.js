const localFEServer = 'http://localhost:8080';
const localWPServer = 'http://localhost:3000';

const RULES = [
  {
    id: 1,
    action: {
      type: 'redirect',
      redirect: {
        url: `${localFEServer}/static/js/bundle.js`,
      },
    },
    condition: {
      urlFilter: '/static/js/main.*.js',
      resourceTypes: ['script'],
    },
  },
  {
    id: 2,
    action: {
      type: 'block',
    },
    condition: {
      urlFilter: '/static/js/main.*.css',
      resourceTypes: ['stylesheet'],
    },
  },
  {
    id: 3,
    action: {
      type: 'redirect',
      redirect: {
        transform: {
          host: `${localFEServer}/static/js`,
        },
      },
    },
    condition: {
      regexFilter: 'chunk',
      resourceTypes: ['script'],
    },
  },
  {
    id: 4,
    action: {
      type: 'redirect',
      redirect: {
        transform: {
          host: localWPServer,
        },
      },
    },
    condition: {
      regexFilter: '[a-zA-Z0-9]+\\.manifest\\.js',
      resourceTypes: ['script'],
    },
  },
  {
    id: 5,
    action: {
      type: 'redirect',
      redirect: {
        transform: {
          host: localWPServer,
        },
      },
    },
    condition: {
      regexFilter: '[a-zA-Z0-9]+\\.vendor\\.js',
      resourceTypes: ['script'],
    },
  },
  {
    id: 6,
    action: {
      type: 'redirect',
      redirect: {
        transform: {
          host: localWPServer,
        },
      },
    },
    condition: {
      regexFilter: '[a-zA-Z0-9]+\\.ReactComponents\\.js',
      resourceTypes: ['script'],
    },
  },
  {
    id: 7,
    action: {
      type: 'redirect',
      redirect: {
        transform: {
          host: localWPServer,
        },
      },
    },
    condition: {
      regexFilter: '[a-zA-Z0-9]+\\.ReactComponents\\.css',
      resourceTypes: ['stylesheet'],
    },
  },
];

chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: RULES.map((r) => r.id),
    addRules: RULES,
  });
});
