export default function HomePageBlock({ children, title, name = null, actions = null}) {
  return (
    <section className={`main-page__block main-page-block${name !== null ? ` ${name}` : ''}`}>
      <div className={`main-page-block__header${name ? ` ${name}__header ${name}-header` : '' }`}>
        <h3 className={`main-page-block__title${name ? ` ${name}__title` : '' }`}>
          <span>{title}</span>
        </h3>
        {actions}
      </div>
      {children}
    </section>
  )
}