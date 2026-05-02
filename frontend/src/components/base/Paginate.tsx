interface PaginateProps {
  page: number
  totalPages: number
  onPageChange?: (page: number) => void
}
export default function Paginate({ page, totalPages, onPageChange }: PaginateProps) {
  if (totalPages <= 1) return null
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  return (
    <div className="center page buttons">
      <div className="ui borderless pagination menu">
        <a className={`item navigation${page === 1 ? ' disabled' : ''}`} onClick={() => page > 1 && onPageChange?.(1)}>«</a>
        <a className={`item navigation${page === 1 ? ' disabled' : ''}`} onClick={() => page > 1 && onPageChange?.(page - 1)}>‹</a>
        {pages.map(p => (
          <a key={p} className={`item${p === page ? ' active' : ''}`} onClick={() => onPageChange?.(p)}>{p}</a>
        ))}
        <a className={`item navigation${page === totalPages ? ' disabled' : ''}`} onClick={() => page < totalPages && onPageChange?.(page + 1)}>›</a>
        <a className={`item navigation${page === totalPages ? ' disabled' : ''}`} onClick={() => page < totalPages && onPageChange?.(totalPages)}>»</a>
      </div>
    </div>
  )
}
