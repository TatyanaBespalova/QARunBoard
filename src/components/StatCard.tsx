interface StatCardProps {
  label: string
  value: number
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <article
      className={`stat-card stat-card-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <p>{label}</p>
      <strong>{value}</strong>
    </article>
  )
}

export default StatCard
