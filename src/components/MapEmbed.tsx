interface Props {
  lat: number
  lon: number
}

export default function MapEmbed({ lat, lon }: Props) {
  return (
    <div className="mt-6 w-full max-w-xl aspect-video rounded overflow-hidden shadow-lg border-4 border-white">
      <iframe
        className="w-full h-full"
        src={`https://maps.google.com/maps?q=${lat},${lon}&z=12&output=embed`}
        loading="lazy"
        allowFullScreen
      />
    </div>
  )
}
