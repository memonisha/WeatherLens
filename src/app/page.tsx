'use client'

import { useState } from 'react'
import Image from 'next/image'

type WeatherData = {
  name: string
  weather: { description: string; icon: string }[]
  main: { temp: number; humidity: number }
  wind: { speed: number }
  coord: { lon: number; lat: number }
}

export default function Home() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [error, setError] = useState('')

  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

  const fetchWeather = async (city: string) => {
    setError('')
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      )
      if (!res.ok) throw new Error('City not found')
      const data = await res.json()
      setWeather(data)
    } catch (err: unknown) {
      setWeather(null)
      if (err instanceof Error) setError(err.message)
      else setError('Unknown error occurred')
    }
  }

  const handleSearch = () => {
    if (!city.trim()) {
      setError('Please enter a city name')
      setWeather(null)
      return
    }
    fetchWeather(city.trim())
  }

  const handleReset = () => {
    setCity('')
    setWeather(null)
    setError('')
  }

  return (
    <main
      className="
        min-h-screen flex flex-col items-center justify-center text-blue-900 text-center
        font-bold select-none
        bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200
        bg-[length:200%_200%] animate-gradientBG
      "
      style={{ fontFamily: "'Baloo 2', cursive" }}
    >
      {/* Title */}
      <h1 className="text-6xl mb-6 drop-shadow-lg text-yellow-600 animate-pulse">
        WeatherLens 🌤️
      </h1>
      <p className="mb-10 text-yellow-700 font-semibold max-w-md px-4">
        Zoom into any city’s skies with real-time weather and a live map.
      </p>

      {/* Search bar */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Enter a city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="p-4 rounded-full text-blue-900 font-semibold w-72 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition-transform duration-300 hover:scale-105"
        />
        <button
          onClick={handleSearch}
          className="ml-5 bg-yellow-400 text-blue-900 px-8 py-3 rounded-full font-extrabold shadow-lg hover:bg-yellow-500 active:scale-95 transition-transform duration-150"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="ml-3 bg-red-400 text-white px-8 py-3 rounded-full font-extrabold shadow-lg hover:bg-red-500 active:scale-95 transition-transform duration-150"
        >
          Reset
        </button>
      </div>

      {/* Error message */}
      {error && <p className="text-red-600 font-semibold mb-6">{error}</p>}

      {/* Weather info card */}
      {weather && (
        <div className="bg-white bg-opacity-90 text-blue-900 rounded-3xl p-12 shadow-2xl w-full max-w-4xl mx-auto animate-fadeIn">
          <h2 className="text-5xl font-extrabold mb-5">{weather.name}</h2>
          <p className="capitalize mb-5 text-3xl flex items-center justify-center gap-4">
            {weather.weather[0].description}
            <Image
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              width={64}
              height={64}
              className="inline-block"
            />
          </p>
          <p className="text-3xl mb-3">🌡️ Temperature: {weather.main.temp} °C</p>
          <p className="mb-3 text-2xl">💧 Humidity: {weather.main.humidity}%</p>
          <p className="mb-6 text-2xl">🌬️ Wind Speed: {weather.wind.speed} m/s</p>

          {/* Embedded Google Map */}
          <iframe
            title="map"
            width="100%"
            height="400"
            className="rounded-xl"
            src={`https://maps.google.com/maps?q=${weather.coord.lat},${weather.coord.lon}&z=10&output=embed`}
            loading="lazy"
          ></iframe>
        </div>
      )}
    </main>
  )
}
