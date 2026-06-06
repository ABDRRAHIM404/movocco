interface Props {
  title: string
  description: string
}

export default function PageHeader({ title, description }: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">{title}</h1>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  )
}
