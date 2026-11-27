export default function MovieShowTemplate({ name }) {
  return (
    <section className={`page-block${name !== undefined ? ` ${name}` : ''}`}>
      <div className={`page-block__header`}></div>

      <div className={`slider horizontal-slider main-page-block__slider page-block__slider`}>
        <ul className="slider__wrap"></ul>
      </div>
    </section>
  );
}