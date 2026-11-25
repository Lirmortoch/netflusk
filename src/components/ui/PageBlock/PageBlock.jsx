export default function PageBlock({ children, title, name = undefined, actions = null}) {
  return (
    <section className={`page-block${name !== undefined ? ` ${name}` : ''}`}>
      <div className={`page-block__header`}>
        <h3 className={`page-block__title`}>
          <span>{title}</span>
        </h3>
        {actions}
      </div>
      {children}
    </section>
  )
}