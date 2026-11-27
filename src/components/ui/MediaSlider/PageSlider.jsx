import Slider from '../Slider/Slider';

export default function PageSlider({ items, sliderClasses = undefined, Card }) {
  return (
    <Slider classes={sliderClasses}>
      {
        items.map(item => (
          <Card key={item.id} extraClasses={'card-1 slider__card'} {...item} />
        ))
      }
    </Slider>
  );
}