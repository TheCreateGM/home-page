// Popup script for Media Controller Extension
// Handles the popup interface and communication with background script

let popupState = {
  mediaData: null,
  updateInterval: null,
  initialized: false
};

// DOM elements
const elements = {
  loading: null,
  error: null,
  noMedia: null,
  mediaContent: null,
  status: null,
  trackTitle: null,
  trackArtist: null,
  trackSource: null,
  playBtn: null,
  prevBtn: null,
  nextBtn: null,
  volumeSlider: null,
  volumeFill: null,
  volumeText: null,
  currentTime: null,
  totalTime: null,
  progressFill: null,
  openDashboard: null
};

// Initialize popup
document.addEventListener('DOMContentLoaded', initializePopup);

function initializePopup() {
  // Get DOM elements
  elements.loading = document.getElementById('loading');
  elements.error = document.getElementById('error');
  elements.noMedia = document.getElementById('no-media');
  elements.mediaContent = document.getElementById('media-content');
  elements.status = document.getElementById('status');
  elements.trackTitle = document.getElementById('track-title');
  elements.trackArtist = document.getElementById('track-artist');
  elements.trackSource = document.getElementById('track-source');
  elements.playBtn = document.getElementById('play-btn');
  elements.prevBtn = document.getElementById('prev-btn');
  elements.nextBtn = document.getElementById('next-btn');
  elements.volumeSlider = document.getElementById('volume-slider');
  elements.volumeFill = document.getElementById('volume-fill');
  elements.volumeText = document.getElementById('volume-text');
  elements.currentTime = document.getElementById('current-time');
  elements.totalTime = document.getElementById('total-time');
  elements.progressFill = document.getElementById('progress-fill');
  elements.openDashboard = document.getElementById('open-dashboard');

  // Setup event listeners
  setupEventListeners();

  // Get initial media state
  getMediaState();

  // Start periodic updates
  startPeriodicUpdates();

  popupState.initialized = true;
}

// Setup event listeners
function setupEventListeners() {
  // Control buttons
  elements.playBtn.addEventListener('click', () => {
    sendControlCommand('toggle');
  });

  elements.prevBtn.addEventListener('click', () => {
    sendControlCommand('previous');
  });

  elements.nextBtn.addEventListener('click', () => {
    sendControlCommand('next');
  });

  // Volume control
  elements.volumeSlider.addEventListener('click', (e) => {
    const rect = elements.volumeSlider.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const volume = Math.round(percent * 100);
    setVolume(volume);
  });

  // Open dashboard link
  elements.openDashboard.addEventListener('click', (e) => {
    e.preventDefault();
    openDashboard();
  });
}

// Get current media state from background script
function getMediaState() {
  chrome.runtime.sendMessage({
    type: 'GET_MEDIA_STATE'
  }, (response) => {
    if (chrome.runtime.lastError) {
      showError('Extension communication failed');
      return;
    }

    if (response && response.success) {
      updateUI(response.data);
    } else {
      showError('Failed to get media state');
    }
  });
}

// Send control command to background script
function sendControlCommand(action, data = {}) {
  chrome.runtime.sendMessage({
    type: 'CONTROL_MEDIA',
    action: action,
    data: data
  }, (response) => {
    if (chrome.runtime.lastError) {
      console.error('Control command failed:', chrome.runtime.lastError);
      return;
    }

    if (response && response.success) {
      // Refresh state after control command
      setTimeout(getMediaState, 100);
    }
  });
}

// Set volume
function setVolume(volume) {
  sendControlCommand('volume', { volume: volume });

  // Update UI immediately for responsiveness
  elements.volumeFill.style.width = `${volume}%`;
  elements.volumeText.textContent = `${volume}%`;
}

// Update UI based on media state
function updateUI(mediaData) {
  popupState.mediaData = mediaData;

  // Hide loading
  elements.loading.style.display = 'none';
  elements.error.style.display = 'none';

  if (!mediaData || !mediaData.hasMedia) {
    // No media detected
    elements.noMedia.style.display = 'block';
    elements.mediaContent.style.display = 'none';
    elements.status.textContent = 'No Media';
    elements.status.className = 'status inactive';
    return;
  }

  // Show media content
  elements.noMedia.style.display = 'none';
  elements.mediaContent.style.display = 'block';

  // Update status
  if (mediaData.isPlaying) {
    elements.status.textContent = 'Playing';
    elements.status.className = 'status';
  } else {
    elements.status.textContent = 'Paused';
    elements.status.className = 'status inactive';
  }

  // Update track info
  elements.trackTitle.textContent = mediaData.currentTrack || 'Unknown Track';
  elements.trackArtist.textContent = mediaData.artist || 'Unknown Artist';
  elements.trackSource.textContent = mediaData.source || 'Unknown Source';

  // Update play button
  if (mediaData.isPlaying) {
    elements.playBtn.innerHTML = '⏸';
    elements.playBtn.title = 'Pause';
  } else {
    elements.playBtn.innerHTML = '▶';
    elements.playBtn.title = 'Play';
  }

  // Enable/disable controls
  const canControl = mediaData.canControl;
  elements.playBtn.disabled = !canControl;
  elements.prevBtn.disabled = !canControl;
  elements.nextBtn.disabled = !canControl;

  // Update volume
  if (mediaData.volume !== undefined) {
    elements.volumeFill.style.width = `${mediaData.volume}%`;
    elements.volumeText.textContent = `${mediaData.volume}%`;
  }

  // Update time and progress
  updateTimeDisplay(mediaData);
}

// Update time display and progress bar
function updateTimeDisplay(mediaData) {
  if (!mediaData) return;

  const currentTime = mediaData.currentTime || 0;
  const duration = mediaData.duration || 0;

  elements.currentTime.textContent = formatTime(currentTime);
  elements.totalTime.textContent = formatTime(duration);

  // Update progress bar
  if (duration > 0) {
    const progress = (currentTime / duration) * 100;
    elements.progressFill.style.width = `${progress}%`;
  } else {
    elements.progressFill.style.width = '0%';
  }
}

// Format time in MM:SS format
function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Show error state
function showError(message) {
  elements.loading.style.display = 'none';
  elements.noMedia.style.display = 'none';
  elements.mediaContent.style.display = 'none';
  elements.error.style.display = 'block';
  elements.error.textContent = message;
  elements.status.textContent = 'Error';
  elements.status.className = 'status inactive';
}

// Start periodic updates
function startPeriodicUpdates() {
  if (popupState.updateInterval) return;

  popupState.updateInterval = setInterval(() => {
    getMediaState();
  }, 1000); // Update every second
}

// Stop periodic updates
function stopPeriodicUpdates() {
  if (popupState.updateInterval) {
    clearInterval(popupState.updateInterval);
    popupState.updateInterval = null;
  }
}

// Open dashboard in new tab
function openDashboard() {
  chrome.tabs.create({
    url: chrome.runtime.getURL('../home.html') // Adjust path as needed
  });
  window.close();
}

// Handle popup close
window.addEventListener('beforeunload', () => {
  stopPeriodicUpdates();
});

// Handle messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'MEDIA_UPDATE') {
    updateUI(request.data);
    sendResponse({ success: true });
  }
  return true;
});

// Test background script connection
function testConnection() {
  chrome.runtime.sendMessage({
    type: 'PING'
  }, (response) => {
    if (chrome.runtime.lastError) {
      showError('Extension not responding');
    } else if (!response || !response.pong) {
      showError('Extension communication failed');
    }
  });
}

// Test connection on load
setTimeout(testConnection, 500);
