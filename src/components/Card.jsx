function Card(props) {
  return (
    <article className="card">
      <span className="card-category">{props.category}</span>
      <h3 className="card-title">{props.title}</h3>
      <p className="card-desc">{props.desc}</p>
      <button
        type="button"
        className="card-delete"
        aria-label="아이디어 삭제"
        onClick={props.onDelete}
      >
        삭제
      </button>
    </article>
  )
}

export default Card
