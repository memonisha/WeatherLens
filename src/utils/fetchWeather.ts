export const fetchWeather = async (city: string) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch weather data')
  }

  return res.json()
}
