interface Props {
  data: any
}

export default function WeatherCard({ data }: Props) {
  return (
    <div className="mt-6 bg-white text-blue-900 rounded-lg p-6 shadow-lg text-center w-full max-w-sm">
      <h2 className="text-xl font-semibold mb-2">{data.name}, {data.sys.country}</h2>
      <p className="text-3xl font-bold">{Math.round(data.main.temp)}°C</p>
      <p className="capitalize">{data.weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="weather icon"
        className="mx-auto mt-2"
      />
    </div>
  )
}
