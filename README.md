# Terminal Dashboard with Media Controller Extension

A modern, terminal-inspired system dashboard that displays real-time information including local time, weather data, quick links to popular websites, system statistics, network speed testing, and a fully-featured media controller. Built with vanilla HTML, CSS, and JavaScript for easy deployment and customization.

![Terminal Dashboard](https://img.shields.io/badge/Status-Active-brightgreen) ![License](https://img.shields.io/badge/License-Open_Source-blue) ![Responsive](https://img.shields.io/badge/Responsive-Yes-success)

## 📌 Project Components

This project consists of two main components:

1. **Terminal Dashboard**: A browser-based dashboard with real-time widgets and system monitoring
2. **Media Controller Extension**: A Chrome/Edge extension for controlling media playback across browser tabs

## ✨ Dashboard Features

- **🕐 Real-time Clock**: Displays current time and date for Kuala Lumpur timezone
- **🌤️ Live Weather**: Fetches current weather data using Open-Meteo API with intelligent fallback
- **🔗 Quick Links**: Customizable grid of 9 popular websites with Font Awesome icons
- **📊 System Monitor**: Real-time CPU, RAM, and storage usage with animated progress bars
- **🌐 Network Speed Test**: Built-in internet speed testing with ping, jitter, download/upload speeds
- **🎵 Media Player**: Integrated media controller with support for cross-tab playback controls
- **🎨 Terminal Aesthetic**: Dark theme with Fira Code monospace font and authentic blinking cursor
- **📱 Responsive Design**: Adapts seamlessly to different screen sizes and mobile devices
- **🛠️ No Dependencies**: Pure HTML/CSS/JavaScript - no frameworks or build tools required
- **🔄 Bulletproof Weather**: Automatic fallback to simulated data if API fails or is blocked
- **⚡ Performance Optimized**: Efficient updates and minimal resource usage

## 🎮 Media Controller Extension Features

- **🔍 Real-time Media Detection**: Automatically detects audio and video playback across all browser tabs
- **🌐 Universal Control**: Control media from any tab through the dashboard or extension popup
- **🎧 Multi-Platform Support**: Works with YouTube, Spotify, SoundCloud, Bandcamp, Twitch, Netflix, and more
- **🔄 Cross-Tab Control**: Pause music in one tab and control it from another
- **⚡ Live Updates**: Real-time synchronization between the dashboard and playing media
- **⌨️ System Integration**: Uses Media Session API for system-level media controls

## 🚀 Quick Start

### Dashboard Setup

1. **Download**: Save the `home.html` file to your local machine
2. **Open**: Double-click the file or open it in any modern web browser
3. **Enjoy**: The dashboard loads automatically with live data and interactive features

### Extension Installation

1. **Open Chrome/Edge Extension Management**:
   - Chrome: Go to `chrome://extensions/`
   - Edge: Go to `edge://extensions/`

2. **Enable Developer Mode**:
   - Toggle the "Developer mode" switch in the top-right corner

3. **Load the Extension**:
   - Click "Load unpacked"
   - Navigate to the `media-controller-extension` folder
   - Select the folder and click "Open"

4. **Verify Installation**:
   - The extension should appear in your extensions list
   - Look for the music note icon in your browser toolbar

## 📍 Location Configuration

The dashboard is pre-configured for **Kuala Lumpur, Malaysia**. Here's how to customize it for your location:

### Time Zone Settings
```javascript
// In the updateTime() function, change the timeZone value:
const options = {
    timeZone: "Asia/Kuala_Lumpur",  // 👈 Change this
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
};
```

**Popular Time Zones:**
| Location | Time Zone |
|----------|-----------|
| New York | `America/New_York` |
| Los Angeles | `America/Los_Angeles` |
| London | `Europe/London` |
| Paris | `Europe/Paris` |
| Tokyo | `Asia/Tokyo` |
| Sydney | `Australia/Sydney` |
| Dubai | `Asia/Dubai` |
| Mumbai | `Asia/Kolkata` |

### Weather Location
```javascript
// Change coordinates in the getWeather() function:
const lat = 3.1412, lon = 101.6865;  // Kuala Lumpur coordinates
```

**Major City Coordinates:**
| City | Latitude | Longitude |
|------|----------|-----------|
| New York | 40.7128 | -74.0060 |
| London | 51.5074 | -0.1278 |
| Tokyo | 35.6762 | 139.6503 |
| Sydney | -33.8688 | 151.2093 |
| Los Angeles | 34.0522 | -118.2437 |
| Paris | 48.8566 | 2.3522 |
| Dubai | 25.2048 | 55.2708 |
| Mumbai | 19.0760 | 72.8777 |

## 🎯 Customizing Quick Links

### Default Links
The dashboard includes 9 popular websites by default:
- YouTube, GitHub, Discord, Reddit, Spotify
- WhatsApp, Telegram, Instagram, Facebook

### Adding Custom Links
```html
<a href="https://your-website.com" target="_blank" class="link-button">
    <i class="fa-brands fa-your-icon"></i>
    <span>Your Site</span>
</a>
```

### Popular Icon Examples
```html
<!-- Professional -->
<i class="fa-brands fa-linkedin"></i>        <!-- LinkedIn -->
<i class="fa-brands fa-slack"></i>           <!-- Slack -->
<i class="fa-brands fa-microsoft"></i>       <!-- Microsoft -->
<i class="fa-solid fa-envelope"></i>         <!-- Email -->

<!-- Development -->
<i class="fa-brands fa-stack-overflow"></i>  <!-- Stack Overflow -->
<i class="fa-brands fa-docker"></i>          <!-- Docker -->
<i class="fa-brands fa-aws"></i>             <!-- AWS -->
<i class="fa-solid fa-code"></i>             <!-- Code -->

<!-- Entertainment -->
<i class="fa-brands fa-netflix"></i>         <!-- Netflix -->
<i class="fa-brands fa-twitch"></i>          <!-- Twitch -->
<i class="fa-brands fa-steam"></i>           <!-- Steam -->
<i class="fa-brands fa-tiktok"></i>          <!-- TikTok -->
```

## 🎵 Media Controller Integration

### Supported Media Platforms

#### Streaming Services
- **YouTube** / YouTube Music
- **Spotify** Web Player
- **SoundCloud**
- **Bandcamp**
- **Apple Music** (web)
- **Twitch**
- **Vimeo**

#### Video Platforms
- **Netflix**
- **Hulu**
- **Amazon Prime Video**
- Any website with HTML5 audio/video elements

### Using Media Controls

1. **Install Extension**: Follow the extension installation steps
2. **Play Media**: Start media playback in any browser tab
3. **Control from Dashboard**: Use the media player widget on the dashboard
4. **Alternative Control**: Click the extension icon for a popup controller

### How It Works

The media controller uses a combination of:

- **Content Scripts**: Detect media elements across all tabs
- **Background Service Worker**: Manage cross-tab communication
- **Media Session API**: Enable system-level media controls
- **Dashboard Integration**: Display and control currently playing media

## 🔧 System Statistics

### Real vs. Simulated Data

**Real Browser Data:**
- ✅ CPU Cores: `navigator.hardwareConcurrency`
- ✅ RAM Total: `navigator.deviceMemory` (Chrome/Edge only)
- ✅ Time/Date: Browser's system clock
- ✅ Weather: Live API data

**Simulated Data (for demonstration):**
- 🎭 CPU usage percentages (realistic fluctuation patterns)
- 🎭 RAM usage amounts (based on typical usage patterns)
- 🎭 Storage statistics (configurable values)

### Customizing System Stats
```javascript
// Modify simulation parameters:
const totalStorage = 512;           // Change total storage size
const usedStorage = 298.7;          // Change used storage

// Adjust CPU usage range (currently 15-60%)
let cpuUsage = Math.max(0, Math.min(100,
    Math.random() * 15 + Math.sin(Date.now() / 2000) * 20 + 25
));

// Adjust RAM usage range (currently 40-50% of total)
let ramUsage = Math.max(0, Math.min(totalRam,
    Math.random() * (totalRam * 0.1) + totalRam * 0.4 +
    Math.cos(Date.now() / 3000) * (totalRam * 0.1)
));
```

## 🌐 Network Speed Test

The dashboard includes a built-in network speed test that measures:
- **Ping**: Response time to test servers
- **Jitter**: Variation in ping times
- **Download Speed**: Data download rate
- **Upload Speed**: Estimated upload rate

### How It Works
1. **Ping Test**: Measures latency to Google's favicon
2. **Download Test**: Downloads test images of various sizes
3. **Upload Estimation**: Calculated based on typical download/upload ratios
4. **Fallback**: Provides simulated results if network tests fail

## 🎨 Visual Customization

### Color Themes

**Default (Tokyo Night):**
```css
:root {
    --background-color: #1a1b26;  /* Dark navy */
    --foreground-color: #a9b1d6;  /* Light blue */
    --accent-color: #7aa2f7;      /* Bright blue */
    --green: #9ece6a;             /* Success green */
    --yellow: #e0af68;            /* Warning yellow */
    --red: #f7768e;               /* Error red */
    --cyan: #7dcfff;              /* Highlight cyan */
    --gray: #414868;              /* Neutral gray */
}
```

**Alternative Themes:**

<details>
<summary>🧛 Dracula Theme</summary>

```css
:root {
    --background-color: #282a36;
    --foreground-color: #f8f8f2;
    --accent-color: #bd93f9;
    --green: #50fa7b;
    --yellow: #f1fa8c;
    --red: #ff5555;
    --cyan: #8be9fd;
    --gray: #44475a;
}
```
</details>

<details>
<summary>🏔️ Gruvbox Dark</summary>

```css
:root {
    --background-color: #282828;
    --foreground-color: #ebdbb2;
    --accent-color: #83a598;
    --green: #b8bb26;
    --yellow: #fabd2f;
    --red: #fb4934;
    --cyan: #8ec07c;
    --gray: #504945;
}
```
</details>

<details>
<summary>🌊 Ocean Theme</summary>

```css
:root {
    --background-color: #0f1419;
    --foreground-color: #e6e1cf;
    --accent-color: #39bae6;
    --green: #7fd962;
    --yellow: #ffb454;
    --red: #f07178;
    --cyan: #95e6cb;
    --gray: #2d3640;
}
```
</details>

### Font Options
```css
/* Current font */
--font: "Fira Code", "Courier New", "monospace";

/* Alternative options */
--font: "JetBrains Mono", monospace;
--font: "Source Code Pro", monospace;
--font: "Roboto Mono", monospace;
--font: "Ubuntu Mono", monospace;
--font: "Cascadia Code", monospace;
```

## 📡 Weather API Integration

### Open-Meteo API
The dashboard uses the free Open-Meteo API for weather data:

```javascript
const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
```

**Features:**
- ✅ No API key required
- ✅ Free unlimited requests
- ✅ Global coverage
- ✅ Real-time data
- ✅ CORS-enabled

### Weather Codes
| Code | Description |
|------|-------------|
| 0 | Clear sky |
| 1-3 | Mainly clear to overcast |
| 45-48 | Fog conditions |
| 51-55 | Drizzle (light to dense) |
| 61-65 | Rain (slight to heavy) |
| 80-82 | Showers (slight to violent) |
| 95+ | Thunderstorms |

### Fallback System
When weather API fails, the dashboard shows:
```javascript
const fallbackWeather = {
    temperature: 28.5,
    windSpeed: 10.2,
    description: "Partly cloudy (fallback)"
};
```

## 🔧 Browser Compatibility

| Browser | Minimum Version | Status |
|---------|----------------|--------|
| Chrome | 60+ | ✅ Full support |
| Firefox | 55+ | ✅ Full support (no Media Controller) |
| Safari | 12+ | ✅ Full support (no Media Controller) |
| Edge | 79+ | ✅ Full support |
| Opera | 47+ | ✅ Full support |

**Note:**
- Some hardware APIs (like `navigator.deviceMemory`) are Chrome/Edge exclusive. The dashboard provides fallback values for unsupported browsers.
- The Media Controller Extension only works with Chromium-based browsers (Chrome, Edge, Opera).

## 🚀 Deployment Options

### 📁 Local File
```bash
# Simply open the file in your browser
open home.html
# or
double-click home.html
```

### 🌐 Web Hosting
```bash
# GitHub Pages
1. Upload to GitHub repository
2. Enable Pages in Settings
3. Access via https://github.com/TheCreateGM/home-page

# Netlify
1. Drag and drop file to netlify.com
2. Get instant URL

# Vercel
1. Connect GitHub repository
2. Automatic deployment
```

### 🏠 Browser Homepage
**Chrome:**
1. Settings → On startup → Open specific page
2. Add your local file path or hosted URL

**Firefox:**
1. Settings → Home → Homepage
2. Set to Custom URL

**Safari:**
1. Preferences → General → Homepage
2. Enter file path or URL

## 🛠️ Advanced Configuration

### Update Intervals
```javascript
setInterval(updateTime, 1000);        // Clock: every 1 second
setInterval(updateSystemStats, 2000); // Stats: every 2 seconds
// Weather: fetched once on page load
```

### Performance Tuning
```javascript
// Reduce CPU usage by increasing intervals
setInterval(updateTime, 5000);        // Update every 5 seconds
setInterval(updateSystemStats, 10000); // Update every 10 seconds

// Disable animations for better performance
.progress-bar-inner {
    transition: none; /* Remove smooth transitions */
}
```

## 🔧 Extension Development

### File Structure
```
media-controller-extension/
├── manifest.json          # Extension configuration
├── background.js          # Service worker for cross-tab communication
├── content.js             # Content script for media detection
├── popup.html             # Extension popup interface
├── popup.js               # Popup functionality
└── README.md              # Extension documentation
```

### Permissions Explained

The extension requests the following permissions:

- **`activeTab`**: Access current tab for media detection
- **`tabs`**: Query and manage tabs for cross-tab control
- **`scripting`**: Inject content scripts for media detection
- **`storage`**: Store extension settings and preferences
- **`host_permissions`**: Access streaming platforms for media control

## 🐛 Troubleshooting

### Common Issues

**Weather shows fallback data:**
- Check internet connection
- Try accessing from `http://` instead of `file://`
- Disable ad blockers temporarily
- Corporate firewall may block API calls

**Icons not displaying:**
- Font Awesome CDN may be blocked
- Check browser console for errors
- Ensure internet connection is stable

**System stats not updating:**
- Check browser console (F12) for JavaScript errors
- Some browsers limit hardware API access
- Refresh the page to restart

**Speed test fails:**
- Network connectivity issues
- CORS restrictions in some browsers
- Try running from a web server instead of local file

**Media controls not working:**
- Ensure the extension is properly installed
- Some sites may block programmatic control
- Refresh both the media tab and dashboard
- Check browser console for error messages

## 💡 Customization Ideas

### Additional Features
- 🌍 Multiple timezone clocks
- 💰 Cryptocurrency price ticker
- 📈 Stock market dashboard
- 📰 RSS feed reader
- 📅 Calendar integration
- ⏱️ System uptime counter
- 📝 Quick notes widget
- 📊 Data usage tracker
- 🔍 Multi-search engine bar

### Extension Enhancements
- 🔌 Support for Firefox (requires WebExtensions API adaptation)
- 🖌️ Custom theme options for extension popup
- 🔔 Notification controls
- 🎲 Random playlist generation
- 🔊 Equalizer controls

## 📚 Technical Details

### Dependencies
- **Font Awesome 6.5.1**: UI icons
- **Google Fonts**: Fira Code font
- **Open-Meteo API**: Weather data
- **Browser APIs**: Hardware info, geolocation, fetch, Media Session API

### File Structure
```
project/
├── home.html                      # Main dashboard file
├── README.md                      # This documentation
└── media-controller-extension/    # Browser extension
    ├── manifest.json              # Extension configuration
    ├── background.js              # Background service worker
    ├── content.js                 # Content script
    ├── popup.html                 # Extension popup interface
    └── popup.js                   # Popup functionality
```

### Security Considerations
- ✅ No API keys exposed
- ✅ HTTPS recommended for production
- ✅ External links open in new tabs
- ✅ No data collection or tracking
- ✅ Client-side only processing
- ✅ Minimal extension permissions

## 📄 License

This project is open source and free to use, modify, and distribute.

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch
3. **Commit** your changes
4. **Push** to the branch
5. **Open** a Pull Request

### Development Guidelines
- Use vanilla JavaScript (no frameworks)
- Follow existing code style and formatting
- Test on multiple browsers
- Update documentation for new features
- Include fallback options for external dependencies

## 🆘 Getting Help

- **Issues**: Report bugs or request features via GitHub Issues
- **Discussions**: Join community discussions for general questions
- **Console**: Check browser console (F12) for error messages
- **Testing**: Use browser developer tools for debugging

## 🔗 Related Projects

- [Startpage](https://github.com/deepjyoti30/startpage) - Another customizable browser startpage
- [Homer](https://github.com/bastienwirtz/homer) - Static homepage for services
- [Heimdall](https://github.com/linuxserver/Heimdall) - Application dashboard

---

*Last updated: June 2025
