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
        regexSubstitution: `${localFEServer}/static/js/\\2.chunk.js`
      },
    },
    condition: {
      regexFilter: "^(.*).myDomain.com\\/static\\/js\\/(.*).chunk\\.js",
      resourceTypes: ['script'],
    },
  },
  {
    id: 4,
    action: {
      type: 'redirect',
      redirect: {
        regexSubstitution: `${localWPServer}/assets/react/js/chunk.\\2.js`
      },
    },
    condition: {
      regexFilter: "^(.*).myDomain.com\\/assets\\/react\\/js\\/chunk.(.*)\\.js",
      resourceTypes: ['script'],
    },
  },
  {
    id: 5,
    action: {
      type: 'redirect',
      redirect: {
        url: `${localWPServer}/assets/react/js/ReactComponents.js`,
      },
    },
    condition: {
      urlFilter: '*.ReactComponents.js',
      resourceTypes: ['script'],
    },
  },
  {
    id: 6,
    action: {
      type: 'redirect',
      redirect: {
        url: `${localWPServer}/assets/react/css/ReactComponents.css`,
      },
    },
    condition: {
      urlFilter: '*.ReactComponents.css',
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
