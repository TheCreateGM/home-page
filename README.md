# Terminal Dashboard

A sleek, terminal-inspired system dashboard that displays real-time information including local time, weather data, and simulated system statistics. Built with vanilla HTML, CSS, and JavaScript for easy deployment and customization.

## Features

- **Real-time Clock**: Displays current time for Kuala Lumpur timezone
- **Live Weather**: Fetches current weather data using Open-Meteo API
- **System Monitor**: Simulated CPU, RAM, and storage usage with animated progress bars
- **Terminal Aesthetic**: Dark theme with monospace fonts and blinking cursor
- **Responsive Design**: Adapts to different screen sizes
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
    // ... other options
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
// Change these coordinates for your city:
const kl_lat = 3.1412;   // Latitude
const kl_lon = 101.6865; // Longitude
```

**To find coordinates:**
1. Search "[Your City] coordinates" in Google
2. Or use [LatLong.net](https://www.latlong.net/)
3. Replace the `kl_lat` and `kl_lon` values

### System Statistics

The system monitor shows simulated data for demonstration purposes. To customize:

#### RAM Configuration
```javascript
const totalRam = 16.0; // Change to match your system (in GB)
```

#### Storage Configuration
```javascript
const totalStorage = 512;  // Total storage in GB
const usedStorage = 258.7; // Current usage in GB
```

#### Update Intervals
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

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

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

## API Usage

### Weather API
The dashboard uses the free [Open-Meteo API](https://open-meteo.com/):
- **No API key required**
- **Rate limit**: 10,000 requests/day
- **CORS enabled** for browser requests

If you need more features, consider upgrading to their commercial API or switching to:
- OpenWeatherMap (requires API key)
- WeatherAPI (requires API key)

## Performance Notes

### System Statistics Limitation
**Important**: Browser JavaScript cannot access real system hardware information due to security restrictions. The CPU, RAM, and storage data shown are simulated for demonstration purposes.

For real system monitoring, consider:
- Desktop applications (Electron-based)
- Browser extensions with additional permissions
- Server-side implementations with WebSocket connections

### Network Requests
- Weather data is fetched once on page load
- No continuous API polling to respect rate limits
- Failed requests fallback to error messages

## Troubleshooting

### Weather Not Loading
- **Check internet connection**
- **Verify coordinates** are correct decimal values
- **CORS errors**: Some browsers block API requests from `file://` URLs - try serving via HTTP

### Time Display Issues
- **Wrong timezone**: Double-check the `timeZone` value
- **Format problems**: Ensure your browser supports `Intl.DateTimeFormat`

### Styling Problems
- **Font not loading**: Fira Code requires internet connection or local installation
- **Layout issues**: Try clearing browser cache and refreshing

## Customization Ideas

### Additional Widgets
```javascript
// Add network speed monitor
// Add system uptime counter
// Add cryptocurrency prices
// Add stock market data
// Add calendar events
```

### Enhanced Features
- Multiple timezone clocks
- Weather forecast (not just current)
- Real system stats via backend API
- Keyboard shortcuts for interactions
- Auto-refresh intervals configuration

## Contributing

Feel free to submit improvements:
1. Fork the project
2. Create feature branch
3. Submit pull request with clear description

## License

This project is open source and free to use, modify, and distribute.

---

**Need help?** Check the browser console (F12) for error messages and debugging information.
