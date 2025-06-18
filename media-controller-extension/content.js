// Content script for Media Controller Extension
// Detects and controls media on web pages

let mediaDetector = {
  mediaElements: new Set(),
  observers: [],
  lastState: null,
  detectionInterval: null,
  initialized: false
};

// Initialize the media detector
function initializeMediaDetector() {
  if (mediaDetector.initialized) return;

  console.log('Initializing media detector for:', window.location.hostname);

  // Detect existing media elements
  detectMediaElements();

  // Set up mutation observer for dynamic content
  setupMutationObserver();

  // Start periodic detection for web players
  startPeriodicDetection();

  // Listen for messages from background script
  setupMessageListener();

  mediaDetector.initialized = true;
}

// Detect audio and video elements
function detectMediaElements() {
  const audioElements = document.querySelectorAll('audio');
  const videoElements = document.querySelectorAll('video');
  const allMediaElements = [...audioElements, ...videoElements];

  allMediaElements.forEach(element => {
    if (!mediaDetector.mediaElements.has(element)) {
      mediaDetector.mediaElements.add(element);
      setupMediaElementListeners(element);
    }
  });

  // Also detect web-based players
  detectWebPlayerMedia();
}

// Setup listeners for media elements
function setupMediaElementListeners(element) {
  const events = ['play', 'pause', 'ended', 'loadedmetadata', 'timeupdate', 'volumechange'];

  events.forEach(eventType => {
    element.addEventListener(eventType, () => {
      handleMediaEvent(element, eventType);
    });
  });
}

// Handle media element events
function handleMediaEvent(element, eventType) {
  const mediaData = extractMediaData(element);

  // Send update to background script
  chrome.runtime.sendMessage({
    type: 'MEDIA_STATE_CHANGED',
    data: {
      ...mediaData,
      event: eventType,
      timestamp: Date.now()
    }
  }).catch(console.error);
}

// Extract data from media element
function extractMediaData(element) {
  return {
    hasMedia: true,
    isPlaying: !element.paused,
    title: getMediaTitle(element),
    artist: getMediaArtist(element),
    source: getMediaSource(),
    duration: element.duration || 0,
    currentTime: element.currentTime || 0,
    volume: Math.round((element.volume || 1) * 100),
    canControl: true,
    url: element.src || element.currentSrc || window.location.href
  };
}

// Get media title from various sources
function getMediaTitle(element) {
  // Try element attributes first
  let title = element.title || element.getAttribute('data-title') || '';

  if (!title) {
    // Try page-specific selectors
    const hostname = window.location.hostname;

    if (hostname.includes('youtube.com')) {
      const titleEl = document.querySelector('h1.title yt-formatted-string, #title h1, .ytd-video-primary-info-renderer h1');
      title = titleEl ? titleEl.textContent.trim() : '';
    } else if (hostname.includes('spotify.com')) {
      const titleEl = document.querySelector('[data-testid="entityTitle"], .track-info__name, .now-playing-widget__text-info__title');
      title = titleEl ? titleEl.textContent.trim() : '';
    } else if (hostname.includes('soundcloud.com')) {
      const titleEl = document.querySelector('.playbackSoundBadge__titleLink, .soundTitle__title');
      title = titleEl ? titleEl.textContent.trim() : '';
    } else if (hostname.includes('bandcamp.com')) {
      const titleEl = document.querySelector('.track_info .title, .trackTitle');
      title = titleEl ? titleEl.textContent.trim() : '';
    }

    // Fallback to document title
    if (!title) {
      title = document.title;
      // Clean up common suffixes
      title = title.replace(/ - YouTube$/, '')
                  .replace(/ \| Spotify$/, '')
                  .replace(/ \| SoundCloud$/, '')
                  .trim();
    }
  }

  return title || 'Unknown Track';
}

// Get artist information
function getMediaArtist(element) {
  const hostname = window.location.hostname;
  let artist = '';

  if (hostname.includes('youtube.com')) {
    const channelEl = document.querySelector('#channel-name a, .ytd-channel-name a, .yt-formatted-string[href*="/channel/"], .yt-formatted-string[href*="/@"]');
    artist = channelEl ? channelEl.textContent.trim() : '';
  } else if (hostname.includes('spotify.com')) {
    const artistEl = document.querySelector('.track-info__artists, .now-playing-widget__text-info__artists');
    artist = artistEl ? artistEl.textContent.trim() : '';
  } else if (hostname.includes('soundcloud.com')) {
    const artistEl = document.querySelector('.playbackSoundBadge__lightLink, .soundTitle__usernameText');
    artist = artistEl ? artistEl.textContent.trim() : '';
  }

  return artist;
}

// Get media source name
function getMediaSource() {
  const hostname = window.location.hostname;

  if (hostname.includes('youtube.com')) return 'YouTube';
  if (hostname.includes('music.youtube.com')) return 'YouTube Music';
  if (hostname.includes('spotify.com')) return 'Spotify';
  if (hostname.includes('soundcloud.com')) return 'SoundCloud';
  if (hostname.includes('bandcamp.com')) return 'Bandcamp';
  if (hostname.includes('twitch.tv')) return 'Twitch';
  if (hostname.includes('vimeo.com')) return 'Vimeo';
  if (hostname.includes('netflix.com')) return 'Netflix';
  if (hostname.includes('hulu.com')) return 'Hulu';
  if (hostname.includes('music.apple.com')) return 'Apple Music';

  return 'Web Player';
}

// Detect web-based media players
function detectWebPlayerMedia() {
  const hostname = window.location.hostname;
  let hasMedia = false;
  let isPlaying = false;

  // YouTube detection
  if (hostname.includes('youtube.com')) {
    const video = document.querySelector('video');
    if (video) {
      hasMedia = true;
      isPlaying = !video.paused;

      if (hasMedia) {
        const mediaData = extractMediaData(video);
        sendMediaUpdate(mediaData);
        return;
      }
    }
  }

  // Spotify Web Player detection
  else if (hostname.includes('spotify.com')) {
    const playButton = document.querySelector('[data-testid="control-button-playpause"]');
    const pauseIcon = document.querySelector('[data-testid="control-button-playpause"] [aria-label*="Pause"]');

    if (playButton) {
      hasMedia = true;
      isPlaying = !!pauseIcon;

      const titleEl = document.querySelector('[data-testid="entityTitle"]');
      const artistEl = document.querySelector('[data-testid="entitySubTitle"] a');

      if (titleEl) {
        sendMediaUpdate({
          hasMedia: true,
          isPlaying: isPlaying,
          title: titleEl.textContent.trim(),
          artist: artistEl ? artistEl.textContent.trim() : '',
          source: 'Spotify',
          canControl: true,
          url: window.location.href
        });
        return;
      }
    }
  }

  // SoundCloud detection
  else if (hostname.includes('soundcloud.com')) {
    const playButton = document.querySelector('.playButton, .playControl');
    if (playButton) {
      hasMedia = true;
      isPlaying = playButton.classList.contains('playing');

      const titleEl = document.querySelector('.playbackSoundBadge__titleLink');
      const artistEl = document.querySelector('.playbackSoundBadge__lightLink');

      if (titleEl) {
        sendMediaUpdate({
          hasMedia: true,
          isPlaying: isPlaying,
          title: titleEl.textContent.trim(),
          artist: artistEl ? artistEl.textContent.trim() : '',
          source: 'SoundCloud',
          canControl: true,
          url: window.location.href
        });
        return;
      }
    }
  }

  // If no specific detection, check for generic media
  if (!hasMedia && mediaDetector.mediaElements.size === 0) {
    sendMediaUpdate({
      hasMedia: false,
      isPlaying: false,
      title: null,
      artist: null,
      source: null,
      canControl: false
    });
  }
}

// Send media update to background script
function sendMediaUpdate(mediaData) {
  // Avoid sending duplicate updates
  const stateKey = JSON.stringify(mediaData);
  if (mediaDetector.lastState === stateKey) return;

  mediaDetector.lastState = stateKey;

  chrome.runtime.sendMessage({
    type: 'MEDIA_DETECTED',
    data: {
      ...mediaData,
      timestamp: Date.now(),
      url: window.location.href
    }
  }).catch(console.error);
}

// Setup mutation observer for dynamic content
function setupMutationObserver() {
  const observer = new MutationObserver((mutations) => {
    let shouldRedetect = false;

    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) { // Element node
          if (node.tagName === 'AUDIO' || node.tagName === 'VIDEO' ||
              node.querySelector && (node.querySelector('audio') || node.querySelector('video'))) {
            shouldRedetect = true;
          }
        }
      });
    });

    if (shouldRedetect) {
      setTimeout(detectMediaElements, 100);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  mediaDetector.observers.push(observer);
}

// Start periodic detection for web players
function startPeriodicDetection() {
  if (mediaDetector.detectionInterval) return;

  mediaDetector.detectionInterval = setInterval(() => {
    detectWebPlayerMedia();
  }, 2000); // Check every 2 seconds
}

// Setup message listener for background script
function setupMessageListener() {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.type) {
      case 'CONTROL_COMMAND':
        handleControlCommand(request.action, request.data);
        sendResponse({ success: true });
        break;

      case 'GET_CURRENT_STATE':
        const currentState = getCurrentMediaState();
        sendResponse({ success: true, data: currentState });
        break;

      default:
        sendResponse({ success: false, error: 'Unknown command' });
    }

    return true;
  });
}

// Handle control commands from background script
function handleControlCommand(action, data) {
  const hostname = window.location.hostname;

  switch (action) {
    case 'play':
    case 'pause':
    case 'toggle':
      togglePlayPause();
      break;

    case 'next':
      nextTrack();
      break;

    case 'previous':
      previousTrack();
      break;

    case 'volume':
      setVolume(data.volume);
      break;

    case 'seek':
      seekTo(data.time);
      break;
  }
}

// Control functions
function togglePlayPause() {
  // Try media elements first
  const activeMedia = Array.from(mediaDetector.mediaElements).find(el => !el.paused);
  if (activeMedia) {
    if (activeMedia.paused) {
      activeMedia.play().catch(console.error);
    } else {
      activeMedia.pause();
    }
    return;
  }

  // Try site-specific controls
  const hostname = window.location.hostname;
  let button = null;

  if (hostname.includes('youtube.com')) {
    button = document.querySelector('.ytp-play-button');
  } else if (hostname.includes('spotify.com')) {
    button = document.querySelector('[data-testid="control-button-playpause"]');
  } else if (hostname.includes('soundcloud.com')) {
    button = document.querySelector('.playButton, .playControl');
  }

  if (button) {
    button.click();
    // Update state after click
    setTimeout(detectWebPlayerMedia, 100);
  }
}

function nextTrack() {
  const hostname = window.location.hostname;
  let button = null;

  if (hostname.includes('youtube.com')) {
    button = document.querySelector('.ytp-next-button');
  } else if (hostname.includes('spotify.com')) {
    button = document.querySelector('[data-testid="control-button-skip-forward"]');
  } else if (hostname.includes('soundcloud.com')) {
    button = document.querySelector('.skipControl.next, .nextButton');
  }

  if (button) button.click();
}

function previousTrack() {
  const hostname = window.location.hostname;
  let button = null;

  if (hostname.includes('youtube.com')) {
    button = document.querySelector('.ytp-prev-button');
  } else if (hostname.includes('spotify.com')) {
    button = document.querySelector('[data-testid="control-button-skip-back"]');
  } else if (hostname.includes('soundcloud.com')) {
    button = document.querySelector('.skipControl.prev, .prevButton');
  }

  if (button) {
    button.click();
  } else {
    // Fallback: seek to beginning
    const mediaElement = Array.from(mediaDetector.mediaElements)[0];
    if (mediaElement) {
      mediaElement.currentTime = 0;
    }
  }
}

function setVolume(volume) {
  const volumePercent = volume / 100;

  // Set volume on media elements
  mediaDetector.mediaElements.forEach(element => {
    element.volume = volumePercent;
  });

  // Try site-specific volume controls if available
  // Note: Most modern browsers restrict programmatic volume control
}

function seekTo(time) {
  const mediaElement = Array.from(mediaDetector.mediaElements)[0];
  if (mediaElement) {
    mediaElement.currentTime = time;
  }
}

// Get current media state
function getCurrentMediaState() {
  const mediaElement = Array.from(mediaDetector.mediaElements)[0];
  if (mediaElement) {
    return extractMediaData(mediaElement);
  }

  // Try to get state from web player
  detectWebPlayerMedia();
  return null;
}

// Cleanup function
function cleanup() {
  if (mediaDetector.detectionInterval) {
    clearInterval(mediaDetector.detectionInterval);
    mediaDetector.detectionInterval = null;
  }

  mediaDetector.observers.forEach(observer => observer.disconnect());
  mediaDetector.observers = [];

  mediaDetector.mediaElements.clear();
  mediaDetector.initialized = false;
}

// Handle page unload
window.addEventListener('beforeunload', cleanup);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMediaDetector);
} else {
  initializeMediaDetector();
}

// Also initialize after a short delay to catch dynamically loaded content
setTimeout(initializeMediaDetector, 1000);
