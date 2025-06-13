# Terminal Dashboard

A sleek, terminal-inspired system dashboard that displays real-time information including local time, weather data, quick links to popular websites, and simulated system statistics. Built with vanilla HTML, CSS, and JavaScript for easy deployment and customization.

## Features

- **Real-time Clock**: Displays current time and date for Kuala Lumpur timezone
- **Live Weather**: Fetches current weather data using Open-Meteo API with fallback data
- **Quick Links**: Grid of 9 popular websites with Font Awesome icons
- **System Monitor**: Simulated CPU, RAM, and storage usage with animated progress bars
- **Terminal Aesthetic**: Dark theme with Fira Code monospace font and blinking cursor
- **Responsive Design**: Adapts to different screen sizes with mobile-friendly layout
- **No Dependencies**: Pure HTML/CSS/JavaScript - no frameworks required
- **Bulletproof Weather**: Automatic fallback to simulated data if API fails

## Quick Start

1. **Download**: Save the `home.html` file to your local machine
2. **Open**: Double-click the file or open it in any modern web browser
3. **Done**: The dashboard will load automatically with live data

## Configuration

### Location Settings

The dashboard is currently configured for **Kuala Lumpur, Malaysia**. To change the location:

#### Time Zone
```javascript
// In the updateTime() function, change the timeZone value:
const options = {
    timeZone: "Asia/Kuala_Lumpur",  // Change this
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
};
```

**Common time zones:**
- `America/New_York` - Eastern Time
- `America/Los_Angeles` - Pacific Time
- `Europe/London` - GMT/BST
- `Asia/Tokyo` - Japan Standard Time
- `Australia/Sydney` - Australian Eastern Time

#### Weather Location
```javascript
// Change the coordinates in the Open-Meteo API URL:
const lat = 3.1412, lon = 101.6865;  // Kuala Lumpur coordinates
const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
```

**Popular city coordinates:**
- New York: `40.7128, -74.0060`
- London: `51.5074, -0.1278`
- Tokyo: `35.6762, 139.6503`
- Sydney: `-33.8688, 151.2093`
- Los Angeles: `34.0522, -118.2437`

### Quick Links Customization

The dashboard includes 9 popular websites by default. To customize:

```html
<a href="https://your-website.com" target="_blank" class="link-button">
    <i class="fa-brands fa-your-icon"></i>
    <span>Your Site</span>
</a>
```

**Current default links:**
- YouTube
- GitHub
- Discord
- Reddit
- Spotify
- WhatsApp
- Telegram
- Instagram
- Facebook

**Available Font Awesome icon categories:**
- `fa-brands` - Brand icons (YouTube, GitHub, etc.)
- `fa-solid` - Solid icons (general purpose)
- `fa-regular` - Regular/outline icons

**Popular alternatives:**
```html
<!-- Netflix -->
<i class="fa-brands fa-netflix"></i>

<!-- Gmail -->
<i class="fa-solid fa-envelope"></i>

<!-- Stack Overflow -->
<i class="fa-brands fa-stack-overflow"></i>

<!-- LinkedIn -->
<i class="fa-brands fa-linkedin"></i>

<!-- Twitter/X -->
<i class="fa-brands fa-x-twitter"></i>

<!-- Amazon -->
<i class="fa-brands fa-amazon"></i>

<!-- Twitch -->
<i class="fa-brands fa-twitch"></i>

<!-- Microsoft -->
<i class="fa-brands fa-microsoft"></i>
```

### System Statistics

The system monitor shows a mix of real browser data and simulated statistics:

#### Real Browser Data Used:
- **CPU Cores**: `navigator.hardwareConcurrency`
- **RAM Total**: `navigator.deviceMemory` (Chrome/Edge only)

#### Simulated Data:
- CPU usage percentages (15-60% range with sine wave variation)
- RAM usage amounts (40-50% of total with cosine wave variation)
- Storage statistics (fixed at 148.7/256 GB)

#### Customization:
```javascript
// Fallback values when browser APIs aren't available
const numCores = navigator.hardwareConcurrency || 4;     // Default 4 cores
const totalRam = navigator.deviceMemory || 8;            // Default 8GB RAM
const totalStorage = 256, usedStorage = 148.7;          // Storage simulation

// Modify the simulation ranges:
// CPU: 15-60% with sine wave fluctuation
let cpuUsage = Math.max(0, Math.min(100,
    Math.random() * 15 + Math.sin(Date.now() / 2000) * 20 + 25
));

// RAM: 40-50% with cosine wave fluctuation
let ramUsage = Math.max(0, Math.min(totalRam,
    Math.random() * (totalRam * 0.1) + totalRam * 0.4 +
    Math.cos(Date.now() / 3000) * (totalRam * 0.1)
));
```

#### Update Intervals:
```javascript
setInterval(updateTime, 1000);        // Clock updates every 1 second
setInterval(updateSystemStats, 2000); // Stats update every 2 seconds
// Weather is fetched once on page load
```

### Visual Customization

#### Color Scheme (Tokyo Night Theme)
The dashboard uses CSS custom properties for easy theming:

```css
:root {
    --background-color: #1a1b26;  /* Dark blue background */
    --foreground-color: #a9b1d6;  /* Light blue text */
    --accent-color: #7aa2f7;      /* Bright blue accents */
    --green: #9ece6a;             /* Success/CPU color */
    --yellow: #e0af68;            /* Warning/RAM color */
    --red: #f7768e;               /* Error/Storage color */
    --cyan: #7dcfff;              /* Icon highlight color */
    --gray: #414868;              /* Border/inactive color */
}
```

#### Alternative Color Schemes
```css
/* Dracula Theme */
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

/* Gruvbox Dark */
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

#### Font Configuration
```css
--font: "Fira Code", "Courier New", "monospace";
```

**Alternative monospace fonts (require Google Fonts or local installation):**
- `"JetBrains Mono"`
- `"Source Code Pro"`
- `"Roboto Mono"`
- `"Ubuntu Mono"`
- `"Cascadia Code"`
- `"SF Mono"`

## Dependencies

### External Resources
- **Font Awesome 6.5.1**: Icons for UI elements and quick links
- **Google Fonts**: Fira Code font family
- **Open-Meteo API**: Free weather data service (no API key required)

### Browser APIs Used
- `navigator.hardwareConcurrency` - CPU core count
- `navigator.deviceMemory` - RAM amount (Chrome/Edge only)
- `fetch()` - Weather data requests
- `Date` and `toLocaleTimeString()` - Time formatting

## Weather API Details

### Open-Meteo Integration
The dashboard uses the Open-Meteo API for weather data:

```javascript
const lat = 3.1412, lon = 101.6865;  // Kuala Lumpur
const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
```

### Weather Code Descriptions
The API returns weather codes that are translated to human-readable descriptions:

```javascript
const descriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    80: "Slight showers",
    81: "Moderate showers",
    82: "Violent showers",
    95: "Thunderstorm"
};
```

### Fallback System
If the weather API fails (network issues, CORS blocks, etc.), the dashboard automatically falls back to simulated data:

```javascript
const fallbackWeather = {
    temperature: 28.5,
    windSpeed: 10.2,
    description: "Partly cloudy (fallback)"
};
```

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

**Note**: Some system information APIs are Chrome/Edge exclusive. Fallback values are provided for other browsers.

## Deployment Options

### Local File
Simply open `home.html` in your browser - no server required.

### Web Server
For production deployment:

1. **Apache/Nginx**: Place file in web root directory
2. **GitHub Pages**: Upload to repository and enable Pages
3. **Netlify**: Drag and drop the file to deploy instantly
4. **Vercel**: Connect repository for automatic deployment

### Browser Homepage
To set as your browser's homepage:

1. **Chrome**: Settings → On startup → Open specific page → Add the file path
2. **Firefox**: Settings → Home → Homepage → Custom URL
3. **Safari**: Preferences → General → Homepage → Set file path

## Performance Notes

### System Statistics Limitation
**Important**: Browser JavaScript has limited access to real system hardware information due to security restrictions. The dashboard uses available browser APIs where possible and simulates the rest for demonstration purposes.

**What's Real:**
- CPU core count (when supported)
- Total RAM amount (Chrome/Edge only)
- Current time and date
- Weather data (when API is accessible)

**What's Simulated:**
- CPU usage percentages
- RAM usage amounts
- Storage usage statistics

For real system monitoring, consider:
- Desktop applications (Electron-based)
- Browser extensions with additional permissions
- Server-side implementations with WebSocket connections
- Native system monitoring tools

### Network Requests
- Weather data is fetched once on page load
- Font Awesome icons and Google Fonts are loaded from CDN
- No continuous API polling to respect rate limits
- Failed requests automatically fallback to simulated data

## Troubleshooting

### Weather Not Loading (Shows Fallback Data)
- **Check internet connection**
- **CORS restrictions**: Some browsers block API requests from `file://` URLs - try serving via HTTP
- **API service down**: Open-Meteo occasionally experiences outages
- **Ad blockers**: Some may block weather API requests
- **Corporate firewalls**: May block external API calls

### Icons Not Displaying
- **Font Awesome CDN**: Check if https://cdnjs.cloudflare.com is accessible
- **Ad blockers**: Some may block CDN resources
- **Offline usage**: Icons require internet connection
- **Corporate networks**: May block external font resources

### Fonts Not Loading
- **Google Fonts CDN**: Check if https://fonts.googleapis.com is accessible
- **Fallback fonts**: System will use "Courier New" if Fira Code fails to load
- **Local installation**: Install Fira Code locally for offline use

### Time Display Issues
- **Wrong timezone**: Double-check the `timeZone` value in `updateTime()`
- **Format problems**: Ensure your browser supports `toLocaleTimeString()`
- **Date format**: Currently uses DD/MM/YYYY (British) format

### System Stats Not Updating
- **JavaScript errors**: Check browser console (F12) for errors
- **API limitations**: Some browsers don't support hardware detection APIs
- **Animation stuttering**: Reduce update frequency in `setInterval()`

### Layout Issues
- **Mobile display**: Grid automatically adjusts on screens under 600px width
- **Text overflow**: Long weather descriptions may wrap unexpectedly
- **Progress bars**: May not display correctly in very old browsers

## Mobile Responsiveness

The dashboard includes responsive design breakpoints:

```css
@media (max-width: 700px) {
    /* Time and weather widgets stack vertically */
}

@media (max-width: 600px) {
    /* Reduced padding, smaller grid items */
    .link-grid {
        grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
    }
}
```

## Customization Ideas

### Additional Widgets
```javascript
// Potential additions:
// - Multiple timezone clocks
// - Cryptocurrency prices
// - Stock market data
// - RSS feed reader
// - Calendar events
// - System uptime counter
// - Network speed test
// - To-do list
// - Bookmarks manager
// - Search bar with multiple engines
```

### Enhanced Features
- Keyboard shortcuts for quick link access (Alt+1, Alt+2, etc.)
- Customizable refresh intervals via settings panel
- Local storage for user preferences and custom links
- Dark/light theme toggle with system preference detection
- Weather forecast (multi-day) with charts
- Real-time notifications for system alerts
- Widget drag-and-drop positioning
- Export/import configuration
- Multiple dashboard layouts

### Link Categories
Consider organizing links into categories:

```html
<!-- Work Section -->
<div class="category">
    <h3>Work</h3>
    <!-- Gmail, Calendar, Slack, Teams -->
</div>

<!-- Entertainment Section -->
<div class="category">
    <h3>Entertainment</h3>
    <!-- YouTube, Netflix, Spotify, Twitch -->
</div>

<!-- Development Section -->
<div class="category">
    <h3>Development</h3>
    <!-- GitHub, Stack Overflow, MDN, CodePen -->
</div>
```

## Security Notes

- **API Keys**: Open-Meteo requires no API key, making it safe for client-side use
- **External Links**: All quick links open in new tabs (`target="_blank"`)
- **HTTPS**: Use HTTPS when deploying to avoid mixed content warnings
- **CSP**: Consider adding Content Security Policy headers for production

## License

This project is open source and free to use, modify, and distribute.

## Contributing

Feel free to submit improvements:
1. Fork the project
2. Create feature branch
3. Commit changes
4. Push to branch
5. Submit pull request with clear description

---

**Need help?** Check the browser console (F12) for error messages and debugging information. The dashboard is designed to fail gracefully with fallback data when external services are unavailable.
