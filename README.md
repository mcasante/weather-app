## Frontend Weather App with Nuxt 3  ([Vue.js])

This weather application is a frontend challenge showcasing Vue.js development skills. Built with Nuxt 3, it provides a user-friendly experience for viewing weather forecasts.

### Features

* **Weather Data:** Retrieves weather information from WeatherAPI ([https://www.weatherapi.com/](https://www.weatherapi.com/)).
* **Persistent User Data:** Employs a store with cookie persistence to save usernames and locations across sessions.
* **Dynamic Routing:** Creates dedicated routes for each saved location.
* **Location Management:**
  * `/all` page allows users to:
      * Navigate to individual location pages.
      * Add new locations.
      * Delete locations.
* **Interactive Weather Display:** A carousel displays the weather forecast throughout the day for the current location.
* **User Experience Focus:** Designed to prioritize a smooth and engaging user experience.


### Technologies Used

* Nuxt 3 ([Vue.js])
* TypeScript
* Sass
* Modules:
  * [Nuxt Google Fonts](https://google-fonts.nuxtjs.org/)
  * [Nuxt Image](https://image.nuxt.com/)
  * [Pinia](https://pinia.vuejs.org/)
  * [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/)
  * [tailwindcss](https://tailwindcss.com/)
  * [vueuse](https://vueuse.org/)
* Data Source: WeatherAPI ([https://www.weatherapi.com/](https://www.weatherapi.com/))


### Getting Started

#### 1. Clone the repository:

```bash
# Clone using the web URL
git clone https://github.com/mcasante/weather-app.git

# Using SSH
git clone git@github.com:mcasante/weather-app.git
```

#### 2. Install dependencies:

```bash
# npm
npm install

# pnpm - my go to choice
pnpm install

# yarn
yarn install

# bun
bun install
```

#### 3. Set Up WeatherAPI Account

* Create an account on WeatherAPI ([https://www.weatherapi.com/](https://www.weatherapi.com/)).
* Obtain an API key.
* Create a `.env` file in the project root and add the following line, replacing `<your-api-key>` with your actual key:

```
API_KEY=<your-api-key>
API_BASE_URL=https://api.weatherapi.com/v1
```

> **_NOTE:_** The application by default requests forecast for the next 5 days which exceeds the maximum of 3 days allowed by WeatherAPI [free plan](https://www.weatherapi.com/pricing.aspx)

#### 4. Run the development server:

```bash
# npm
npm run dev

# pnpm - my go to choice
pnpm run dev

# yarn
yarn dev

# bun
bun run install
```

This will start the application at http://localhost:3000 by default.


### Additional Notes

This project demonstrates a frontend weather application. Feel free to explore the codebase and customize it further!
