# Media Controller Extension for Terminal Dashboard

A Chrome/Edge browser extension that provides real-time media detection and control across all browser tabs, designed to work seamlessly with the Terminal Dashboard.

## Features

- **Real-time Media Detection**: Automatically detects audio and video playback across all browser tabs
- **Universal Control**: Control media from any tab through the dashboard or extension popup
- **Multi-Platform Support**: Works with YouTube, Spotify, SoundCloud, Bandcamp, Twitch, Netflix, and more
- **Cross-Tab Control**: Pause music in one tab and control it from another
- **Live Updates**: Real-time synchronization between the dashboard and playing media
- **System Integration**: Uses Media Session API for system-level media controls

## Supported Platforms

### Streaming Services
- **YouTube** / YouTube Music
- **Spotify** Web Player
- **SoundCloud**
- **Bandcamp**
- **Apple Music** (web)
- **Twitch**
- **Vimeo**

### Video Platforms
- **Netflix**
- **Hulu**
- **Amazon Prime Video**
- Any website with HTML5 audio/video elements

## Installation

### Method 1: Load as Unpacked Extension (Recommended)

1. **Open Chrome/Edge Extension Management**:
   - Chrome: Go to `chrome://extensions/`
   - Edge: Go to `edge://extensions/`

2. **Enable Developer Mode**:
   - Toggle the "Developer mode" switch in the top-right corner

3. **Load the Extension**:
   - Click "Load unpacked"
   - Navigate to the `WebDesign/media-controller-extension` folder
   - Select the folder and click "Open"

4. **Verify Installation**:
   - The extension should appear in your extensions list
   - Look for the music note icon in your browser toolbar

### Method 2: Create Extension Package

1. **Zip the Extension Folder**:
   ```bash
   cd WebDesign
   zip -r media-controller-extension.zip media-controller-extension/
   ```

2. **Load via Extensions Page**:
   - Follow steps 1-2 from Method 1
   - Drag and drop the ZIP file onto the extensions page

## Usage

### With Terminal Dashboard

1. **Open the Dashboard**:
   - Open `WebDesign/home.html` in your browser
   - The music player section will show "Detecting..." initially

2. **Play Media in Any Tab**:
   - Open YouTube, Spotify, or any supported platform
   - Start playing music or video
   - The dashboard will automatically detect and display the media

3. **Control Media from Dashboard**:
   - Use play/pause, previous/next buttons
   - Adjust volume with the slider
   - All controls work across tabs

### Extension Popup

1. **Click the Extension Icon**:
   - Located in the browser toolbar (music note icon)
   - Shows current playing media information

2. **Control from Popup**:
   - Play/pause current media
   - Skip to next/previous track
   - Adjust volume
   - View track information

## How It Works

### Technical Architecture

1. **Content Scripts**: Injected into web pages to detect media elements and player states
2. **Background Service Worker**: Manages cross-tab communication and media state
3. **Dashboard Integration**: Real-time updates via message passing
4. **Media Session API**: System-level media control integration

### Detection Methods

- **HTML5 Media Elements**: Direct control of `<audio>` and `<video>` elements
- **Web Player Detection**: Site-specific selectors for major streaming platforms
- **State Monitoring**: Real-time monitoring of play/pause states
- **Metadata Extraction**: Automatic extraction of track titles, artists, and sources

## Permissions Explained

The extension requests the following permissions:

- **`activeTab`**: Access current tab for media detection
- **`tabs`**: Query and manage tabs for cross-tab control
- **`scripting`**: Inject content scripts for media detection
- **`storage`**: Store extension settings and preferences
- **`host_permissions`**: Access streaming platforms for media control

## Troubleshooting

### Extension Not Detecting Media

1. **Refresh the Page**: Reload the tab with media content
2. **Check Permissions**: Ensure the extension has access to the site
3. **Verify Installation**: Check that the extension is enabled
4. **Clear Cache**: Clear browser cache and restart

### Controls Not Working

1. **Site Restrictions**: Some sites may block programmatic control
2. **Update Required**: Refresh both the media tab and dashboard
3. **Browser Compatibility**: Ensure you're using a supported browser version

### Dashboard Not Updating

1. **Extension Communication**: Check if the extension is running
2. **Message Blocking**: Disable content blockers temporarily
3. **Browser Console**: Check for error messages in developer tools

## Development

### File Structure
```
media-controller-extension/
├── manifest.json          # Extension configuration
├── background.js          # Service worker for cross-tab communication
├── content.js            # Content script for media detection
├── popup.html            # Extension popup interface
├── popup.js              # Popup functionality
└── README.md             # This file
```

### Adding New Platforms

To add support for a new streaming platform:

1. **Update `content.js`**:
   - Add detection selectors in `detectWebPlayerMedia()`
   - Add control selectors in control functions

2. **Update `background.js`**:
   - Add hostname to `checkTabForMedia()`

3. **Test Thoroughly**:
   - Ensure detection works correctly
   - Verify all controls function properly

### Debugging

1. **Background Script**: `chrome://extensions/` → Details → Inspect views: background page
2. **Content Script**: F12 → Console (on the media page)
3. **Popup**: Right-click extension icon → Inspect popup

## Privacy & Security

- **No Data Collection**: The extension doesn't collect or transmit personal data
- **Local Processing**: All media detection happens locally in your browser
- **Minimal Permissions**: Only requests necessary permissions for functionality
- **Open Source**: Full source code available for inspection

## Browser Compatibility

- **Chrome**: Version 88+
- **Microsoft Edge**: Version 88+
- **Other Chromium Browsers**: Should work with Manifest V3 support

## License

This extension is provided as-is for use with the Terminal Dashboard project.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Inspect browser console for error messages
3. Ensure all files are properly loaded and extension is enabled

---

**Note**: This extension enhances the Terminal Dashboard's music player functionality by providing real-time media detection and control across all browser tabs. It works best when used in conjunction with the dashboard's music player interface.