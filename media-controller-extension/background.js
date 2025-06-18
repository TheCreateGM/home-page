// Background script for Media Controller Extension
// Handles cross-tab media detection and control

let mediaState = {
  activeTabs: new Map(),
  currentMedia: null,
  isPlaying: false,
  volume: 70
};

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    checkTabForMedia(tabId, tab);
  }
});

// Listen for tab removal
chrome.tabs.onRemoved.addListener((tabId) => {
  if (mediaState.activeTabs.has(tabId)) {
    mediaState.activeTabs.delete(tabId);
    updateCurrentMedia();
  }
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const tabId = sender.tab?.id;

  switch (request.type) {
    case 'MEDIA_DETECTED':
      handleMediaDetected(tabId, request.data);
      sendResponse({ success: true });
      break;

    case 'MEDIA_STATE_CHANGED':
      handleMediaStateChanged(tabId, request.data);
      sendResponse({ success: true });
      break;

    case 'GET_MEDIA_STATE':
      sendResponse({
        success: true,
        data: getCurrentMediaState()
      });
      break;

    case 'CONTROL_MEDIA':
      handleMediaControl(request.action, request.data);
      sendResponse({ success: true });
      break;

    case 'PING':
      sendResponse({ success: true, pong: true });
      break;

    default:
      sendResponse({ success: false, error: 'Unknown message type' });
  }

  return true; // Keep message channel open for async response
});

// Handle media detection from content script
function handleMediaDetected(tabId, mediaData) {
  if (!tabId) return;

  mediaState.activeTabs.set(tabId, {
    ...mediaData,
    tabId: tabId,
    lastUpdate: Date.now()
  });

  updateCurrentMedia();
  broadcastMediaUpdate();
}

// Handle media state changes
function handleMediaStateChanged(tabId, stateData) {
  if (!tabId || !mediaState.activeTabs.has(tabId)) return;

  const existingData = mediaState.activeTabs.get(tabId);
  mediaState.activeTabs.set(tabId, {
    ...existingData,
    ...stateData,
    lastUpdate: Date.now()
  });

  updateCurrentMedia();
  broadcastMediaUpdate();
}

// Update current media based on most recent activity
function updateCurrentMedia() {
  const activeMediaTabs = Array.from(mediaState.activeTabs.values())
    .filter(tab => tab.isPlaying || tab.hasMedia)
    .sort((a, b) => b.lastUpdate - a.lastUpdate);

  if (activeMediaTabs.length > 0) {
    const mostRecent = activeMediaTabs[0];
    mediaState.currentMedia = mostRecent;
    mediaState.isPlaying = mostRecent.isPlaying || false;
  } else {
    mediaState.currentMedia = null;
    mediaState.isPlaying = false;
  }
}

// Get current media state for dashboard
function getCurrentMediaState() {
  return {
    hasMedia: !!mediaState.currentMedia,
    isPlaying: mediaState.isPlaying,
    currentTrack: mediaState.currentMedia?.title || null,
    artist: mediaState.currentMedia?.artist || null,
    source: mediaState.currentMedia?.source || null,
    duration: mediaState.currentMedia?.duration || 0,
    currentTime: mediaState.currentMedia?.currentTime || 0,
    volume: mediaState.volume,
    canControl: mediaState.currentMedia?.canControl || false,
    tabId: mediaState.currentMedia?.tabId || null
  };
}

// Handle media control commands
async function handleMediaControl(action, data) {
  if (!mediaState.currentMedia?.tabId) {
    console.log('No active media tab to control');
    return;
  }

  const tabId = mediaState.currentMedia.tabId;

  try {
    // Check if tab still exists
    const tab = await chrome.tabs.get(tabId);
    if (!tab) {
      mediaState.activeTabs.delete(tabId);
      updateCurrentMedia();
      return;
    }

    // Send control command to content script
    await chrome.tabs.sendMessage(tabId, {
      type: 'CONTROL_COMMAND',
      action: action,
      data: data
    });

  } catch (error) {
    console.error('Failed to send control command:', error);
    // Tab might be closed, remove from active tabs
    mediaState.activeTabs.delete(tabId);
    updateCurrentMedia();
  }
}

// Broadcast media updates to all dashboard tabs
function broadcastMediaUpdate() {
  const mediaData = getCurrentMediaState();

  // Find all dashboard tabs and send updates
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach(tab => {
      if (tab.url && tab.url.includes('home.html')) {
        chrome.tabs.sendMessage(tab.id, {
          type: 'MEDIA_UPDATE',
          data: mediaData
        }).catch(() => {
          // Ignore errors for tabs that might not have the listener
        });
      }
    });
  });
}

// Check if tab might contain media
function checkTabForMedia(tabId, tab) {
  const mediaHosts = [
    'youtube.com',
    'music.youtube.com',
    'open.spotify.com',
    'soundcloud.com',
    'bandcamp.com',
    'twitch.tv',
    'vimeo.com',
    'music.apple.com',
    'netflix.com',
    'hulu.com',
    'amazon.com',
    'music.amazon.com'
  ];

  const hasMediaHost = mediaHosts.some(host =>
    tab.url.includes(host)
  );

  if (hasMediaHost) {
    // Inject content script if not already present
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    }).catch(() => {
      // Script might already be injected, ignore error
    });
  }
}

// Periodic cleanup of stale tabs
setInterval(() => {
  const now = Date.now();
  const staleThreshold = 30000; // 30 seconds

  for (const [tabId, data] of mediaState.activeTabs.entries()) {
    if (now - data.lastUpdate > staleThreshold) {
      // Check if tab still exists
      chrome.tabs.get(tabId, (tab) => {
        if (chrome.runtime.lastError || !tab) {
          mediaState.activeTabs.delete(tabId);
          updateCurrentMedia();
        }
      });
    }
  }
}, 10000); // Check every 10 seconds

// Initialize extension
chrome.runtime.onStartup.addListener(() => {
  console.log('Media Controller extension started');
});

chrome.runtime.onInstalled.addListener(() => {
  console.log('Media Controller extension installed');
});

// Export for debugging
if (typeof module !== 'undefined') {
  module.exports = { mediaState, getCurrentMediaState };
}
