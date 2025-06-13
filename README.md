# Terminal Dashboard

A sleek, terminal-inspired system dashboard that displays real-time information including local time, weather data, quick links to popular websites, and simulated system statistics. Built with vanilla HTML, CSS, and JavaScript for easy deployment and customization.

## Features

- **Real-time Clock**: Displays current time and date for Kuala Lumpur timezone
- **Live Weather**: Fetches current weather data using wttr.in API
- **Quick Links**: Grid of popular websites with Font Awesome icons
- **System Monitor**: Simulated CPU, RAM, and storage usage with animated progress bars
- **Terminal Aesthetic**: Dark theme with monospace fonts and blinking cursor
- **Responsive Design**: Adapts to different screen sizes with mobile-friendly layout
- **No Dependencies**: Pure HTML/CSS/JavaScript - no frameworks required

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
// Change the city name in the weather API URL:
const weatherApiUrl = `https://wttr.in/Kuala%20Lumpur?format=j1`;
// Example: `https://wttr.in/New%20York?format=j1`
```

**Supported location formats:**
- City names: `London`, `New York`, `Tokyo`
- Airport codes: `LAX`, `JFK`, `LHR`
- Coordinates: `~40.7128,-74.0060`

### Quick Links Customization

The dashboard includes 9 popular websites by default. To customize:

```html
<a href="https://your-website.com" target="_blank" class="link-button">
    <i class="fa-brands fa-your-icon"></i>
    <span>Your Site</span>
</a>
```

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
```

### System Statistics

The system monitor shows a mix of real browser data and simulated statistics:

#### Real Browser Data Used:
- **CPU Cores**: `navigator.hardwareConcurrency`
- **RAM Total**: `navigator.deviceMemory` (Chrome/Edge only)

#### Simulated Data:
- CPU usage percentages
- RAM usage amounts
- Storage statistics

#### Customization:
```javascript
// Fallback values when browser APIs aren't available
const numCores = navigator.hardwareConcurrency || 4;     // Default 4 cores
const totalRam = navigator.deviceMemory || 8;            // Default 8GB RAM
const totalStorage = 256, usedStorage = 148.7;          // Storage simulation
```

#### Update Intervals:
```javascript
setInterval(updateTime, 1000);        // Clock updates every 1 second
setInterval(updateSystemStats, 2000); // Stats update every 2 seconds
```

### Visual Customization

#### Color Scheme
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

#### Font Configuration
```css
--font: "Fira Code", "Courier New", "monospace";
```

**Recommended monospace fonts:**
- `"JetBrains Mono"`
- `"Source Code Pro"`
- `"Roboto Mono"`
- `"Ubuntu Mono"`

#### Link Button Styling
```css
.link-button:hover {
    background-color: var(--accent-color);  /* Hover background */
    color: var(--background-color);         /* Hover text color */
}
```

## Dependencies

### External Resources
- **Font Awesome 6.5.1**: Icons for UI elements and quick links
- **wttr.in API**: Weather data service (no API key required)

### Browser APIs Used
- `navigator.hardwareConcurrency` - CPU core count
- `navigator.deviceMemory` - RAM amount (Chrome/Edge only)
- `fetch()` - Weather data requests
- `Intl.DateTimeFormat` - Timezone formatting

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

**What's Simulated:**
- CPU usage percentages
- RAM usage amounts
- Storage usage statistics

For real system monitoring, consider:
- Desktop applications (Electron-based)
- Browser extensions with additional permissions
- Server-side implementations with WebSocket connections

### Network Requests
- Weather data is fetched once on page load
- Font Awesome icons are loaded from CDN
- No continuous API polling to respect rate limits
- Failed requests fallback to error messages with warning icons

## Troubleshooting

### Weather Not Loading
- **Check internet connection**
- **Verify city name** in the API URL is correct
- **CORS errors**: Some browsers block API requests from `file://` URLs - try serving via HTTP
- **API service down**: wttr.in occasionally experiences outages

### Icons Not Displaying
- **Font Awesome CDN**: Check if https://cdnjs.cloudflare.com is accessible
- **Ad blockers**: Some may block CDN resources
- **Offline usage**: Icons require internet connection

### Time Display Issues
- **Wrong timezone**: Double-check the `timeZone` value
- **Format problems**: Ensure your browser supports `Intl.DateTimeFormat`
- **Date format**: Currently uses DD/MM/YYYY (British) format

### Styling Problems
- **Font not loading**: Fira Code requires internet connection or local installation
- **Layout issues**: Try clearing browser cache and refreshing
- **Mobile layout**: Grid automatically adjusts on screens under 600px width

### System Stats Not Updating
- **JavaScript errors**: Check browser console (F12) for errors
- **API limitations**: Some browsers don't support hardware detection APIs
- **Fallback values**: Default values are used when real data isn't available

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
// - Notes section
```

### Enhanced Features
- Keyboard shortcuts for quick link access
- Customizable refresh intervals
- Local storage for user preferences
- Dark/light theme toggle
- Weather forecast (multi-day)
- Real-time notifications
- Widget drag-and-drop positioning

### Link Categories
Consider organizing links into categories:
- **Work**: Gmail, Calendar, Slack, Teams
- **Entertainment**: YouTube, Netflix, Spotify, Twitch
- **Social**: Discord, Reddit, Twitter, Instagram
- **Development**: GitHub, Stack Overflow, MDN, CodePen

## Contributing

Feel free to submit improvements:
1. Fork the project
2. Create feature branch
3. Submit pull request with clear description

## License

This project is open source and free to use, modify, and distribute.

---

**Need help?** Check the browser console (F12) for error messages and debugging information.
